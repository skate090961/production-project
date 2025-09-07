import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TabItem, Tabs } from '@/shared/ui/tabs';

import { ArticleType } from '../../../model/types/article';

interface ArticleTypeTabsProps {
    className?: string;
    onChange: (value: TabItem<ArticleType>) => void;
    value: ArticleType;
}

export const ArticleTypeTabs = memo(({ className, value, onChange }: ArticleTypeTabsProps) => {
    const { t } = useTranslation('article');

    const typeTabs = useMemo<TabItem<ArticleType>[]>(() => [
        {
            value: ArticleType.ALL,
            content: t(ArticleType.ALL),
        },
        {
            value: ArticleType.IT,
            content: t(ArticleType.IT),
        },
        {
            value: ArticleType.AI,
            content: t(ArticleType.AI),
        },
        {
            value: ArticleType.WEB,
            content: t(ArticleType.WEB),
        },
        {
            value: ArticleType.DEVOPS,
            content: t(ArticleType.DEVOPS),
        },
        {
            value: ArticleType.SCIENCE,
            content: t(ArticleType.SCIENCE),
        },
    ], [t]);

    return (
        <div className={className}>
            <Tabs
                tabs={typeTabs}
                onTabClick={onChange}
                value={value}
            />
        </div>
    );
});
