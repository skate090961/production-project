import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { RoutePath } from '@/shared/config/route/route-config';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon/app-icon';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Card } from '@/shared/ui/card/card';
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
}

export const ArticleListItem = memo((props: ArticleItemProps) => {
    const {
        article,
        view = ArticleView.TILE,
        className,
    } = props;

    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article.id}`);
    }, [article.id, navigate]);

    const types = (
        <Text
            text={article.type.join(', ')}
            className={styles.types}
        />
    );

    const views = (
        <div className={styles.viewsWrapper}>
            <Text text={String(article.views)} />
            <AppIcon Svg={EyeIcon} theme={IconTheme.SECONDARY} />
        </div>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (b) => b.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(styles.root, [className, styles[view]])}>
                <Card className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.user}>
                            <Avatar src={article.user.avatar} size={30} />
                            <Text text={article.user.username} />
                        </div>
                        <Text text={article.createdAt} />
                    </div>
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
                    <div className={styles.footer}>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onOpenArticle}
                        >
                            {t('Читать далее...')}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    if (view === ArticleView.TILE) {
        return (
            <div className={classNames(styles.root, [className, styles[view]])}>
                <Card onClick={onOpenArticle}>
                    <div className={styles.imgWrapper}>
                        <img src={article.img} alt={article.title} />
                        <Text text={article.createdAt} className={styles.date} />
                    </div>
                    <div className={styles.info}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={styles.title} />
                </Card>
            </div>
        );
    }

    return null;
});
