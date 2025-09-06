import { memo, useState } from 'react';

import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/class-names/class-names';

import { AppIcon } from '../app-icon/app-icon';
import { HStack } from '../stack';

import styles from './star-rating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    selectedStars?: number;
    size?: number;
}

const STARS = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        selectedStars = 0,
        onSelect,
        size,
    } = props;

    const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => {
        if (!isSelected) {
            setCurrentStarCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarCount(0);
        }
    };

    const onClick = (starsCount: number) => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(styles.root, [className])}>
            <HStack
                gap="8"
                onMouseLeave={onLeave}
            >
                {STARS.map((s) => {
                    const isHovered = currentStarCount >= s;

                    const mods = {
                        [styles.hovered]: isHovered,
                        [styles.selected]: isSelected,
                    };

                    return (
                        <AppIcon
                            key={s}
                            className={classNames(styles.icon, [], { ...mods })}
                            Svg={StarIcon}
                            width={size}
                            height={size}
                            onMouseEnter={() => onHover(s)}
                            onClick={() => onClick(s)}
                        />
                    );
                })}
            </HStack>
        </div>
    );
});
