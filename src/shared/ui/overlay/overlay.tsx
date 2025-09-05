import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => (
    <div className={classNames(styles.root, [className])} onClick={onClick} />
));
