import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { RoutePath } from '@/shared/config/route/route-config';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon/app-icon';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Card } from '@/shared/ui/card/card';
import { HStack, VStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text/text';

import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockUI } from '../article-text-block-ui/article-text-block-ui';

import styles from './article-list-item.module.scss';

interface ArticleItemProps {
    className?: string;
    article: Article;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleItemProps) => {
    const {
        article,
        view = ArticleView.GRID,
        className,
        target,
    } = props;

    const { t } = useTranslation('article');

    const types = (
        <Text
            text={article.type.join(', ')}
            className={styles.types}
        />
    );

    const views = (
        <HStack gap="8">
            <Text text={String(article.views)} />
            <AppIcon Svg={EyeIcon} theme={IconTheme.SECONDARY} />
        </HStack>
    );

    const articlePath = `${RoutePath.article_details}${article.id}`;

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (b) => b.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(styles.root, [className, styles[view]])}>
                <Card>
                    <VStack gap="8">
                        <HStack justify="between">
                            <HStack gap="8">
                                <Avatar src={article.user.avatar} size={30} />
                                <Text text={article.user.username} />
                            </HStack>
                            <Text text={article.createdAt} />
                        </HStack>
                        <div>
                            <Text title={article.title} />
                            {types}
                        </div>
                        <img src={article.img} alt={article.title} className={styles.img} />
                        {textBlock && (
                            <div className={styles.textBlock}>
                                <ArticleTextBlockUI block={textBlock} />
                            </div>
                        )}
                        <HStack justify="between">
                            <AppLink to={articlePath} target={target}>
                                <Button
                                    theme={ButtonTheme.OUTLINE}
                                >
                                    {t('Читать далее...')}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                </Card>
            </div>
        );
    }

    if (view === ArticleView.GRID) {
        return (
            <AppLink
                className={classNames(styles.root, [className, styles[view]])}
                to={articlePath}
                target={target}
            >
                <Card>
                    <div className={styles.imgWrapper}>
                        <img src={article.img} alt={article.title} />
                        <Text text={article.createdAt} className={styles.date} />
                    </div>
                    <HStack className={styles.info} justify="between">
                        {types}
                        {views}
                    </HStack>
                    <Text text={article.title} className={styles.title} />
                </Card>
            </AppLink>
        );
    }

    return null;
});
