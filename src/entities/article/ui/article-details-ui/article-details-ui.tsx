import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/class-names/class-names';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon/app-icon';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';
import { HStack, VStack } from '@/shared/ui/stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/text/text';

import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/article-details';
import { fetchArticleById } from '../../model/services/fetch-article-by-id/fetch-article-by-id';
import { articleDetailsReducer } from '../../model/slice/article-details-slice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockUI } from '../article-code-block-ui/article-code-block-ui';
import { ArticleImageBlockUI } from '../article-image-block-ui/article-image-block-ui';
import { ArticleTextBlockUI } from '../article-text-block-ui/article-text-block-ui';

import styles from './article-details-ui.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const initReducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetailsUI = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.TEXT: {
            return <ArticleTextBlockUI key={block.id} block={block} />;
        }
        case ArticleBlockType.CODE: {
            return <ArticleCodeBlockUI key={block.id} block={block} />;
        }
        case ArticleBlockType.IMAGE: {
            return <ArticleImageBlockUI key={block.id} block={block} />;
        }
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <VStack gap="16">
                <Skeleton width={200} height={200} radius="50%" className={styles.avatar} />
                <Skeleton width={300} height={32} />
                <Skeleton width={600} height={24} />
                <Skeleton width="100%" height={200} />
                <Skeleton width="100%" height={200} />
            </VStack>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = (
            <VStack gap="16">
                <Avatar
                    size={200}
                    src={article?.img}
                    className={styles.avatar}
                />
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="16">
                    <AppIcon Svg={EyeIcon} theme={IconTheme.SECONDARY} />
                    <Text text={String(article?.views)} />
                </HStack>
                <HStack gap="16">
                    <AppIcon Svg={CalendarIcon} theme={IconTheme.SECONDARY} />
                    <Text text={article?.createdAt} />
                </HStack>
                <VStack gap="16" maxWidth>
                    {article?.blocks.map(renderBlock)}
                </VStack>
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <div className={classNames(styles.root, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
