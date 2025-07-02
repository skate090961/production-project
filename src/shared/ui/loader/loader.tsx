import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames(styles.root, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
