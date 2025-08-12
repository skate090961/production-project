import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListItemSkeleton } from '@/entities/article/ui/article-list-item/article-list-item-skeleton';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Text, TextAlign, TextSize } from '@/shared/ui/text/text';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../article-list-item/article-list-item';

import styles from './article-list.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.GRID ? 9 : 3)
    .fill(0)
    .map((_, index) => (
        <ArticleListItemSkeleton
            key={index}
            view={view}
        />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        articles,
        view = ArticleView.GRID,
        isLoading,
        className,
    } = props;

    const { t } = useTranslation('article');

    const renderArticle = useCallback((article: Article) => (
        <ArticleListItem
            key={article.id}
            article={article}
            view={view}
        />
    ), [view]);

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(styles.root, [className, styles.notFound])}>
                <Text
                    title={t('Статьи не найдены')}
                    size={TextSize.L}
                />
            </div>
        );
    }

    return (
        <div className={classNames(styles.root, [className, styles[view]])}>
            {articles.length ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
