import React from 'react';

import { ArticleView } from '@/entities/article';
import BurgerIcon from '@/shared/assets/icons/burger.svg';
import GridIcon from '@/shared/assets/icons/grid.svg';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppIcon } from '@/shared/ui/app-icon/app-icon';
import { Button, ButtonTheme } from '@/shared/ui/button/button';

import styles from './articles-view-selector.module.scss';

interface ArticlesViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.GRID,
        icon: GridIcon,
    },
    {
        view: ArticleView.LIST,
        icon: BurgerIcon,
    },
];

export const ArticlesViewSelector = (props: ArticlesViewSelectorProps) => {
    const {
        className,
        onViewClick,
        view,
    } = props;

    const onClick = (newView: ArticleView) => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(styles.root, [className])}>
            {viewTypes.map((v) => (
                <Button
                    onClick={() => onClick(v.view)}
                    theme={ButtonTheme.CLEAR}
                >
                    <AppIcon
                        Svg={v.icon}
                        className={classNames('', [], { [styles.selected]: v.view === view })}
                    />
                </Button>
            ))}
        </div>
    );
};
