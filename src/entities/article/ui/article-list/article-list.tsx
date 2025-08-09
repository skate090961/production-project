import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListItemSkeleton } from '@/entities/article/ui/article-list-item/article-list-item-skeleton';
import { classNames } from '@/shared/lib/class-names/class-names';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../article-list-item/article-list-item';

import styles from './article-list.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.TILE ? 9 : 3)
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
        view = ArticleView.TILE,
        isLoading,
        className,
    } = props;
    const { t } = useTranslation();

    const renderArticle = useCallback((article: Article) => (
        <ArticleListItem
            key={article.id}
            article={article}
            view={view}
        />
    ), [view]);

    if (true) {
        return (
            <div className={classNames(styles.root, [className, styles[view]])}>
                {getSkeletons(view)}
            </div>
        );
    }

    return (
        <div className={classNames(styles.root, [className, styles[view]])}>
            {articles.length ? articles.map(renderArticle) : null}
        </div>
    );
});
