import { classNames } from '@/shared/lib/class-names/class-names';
import { Loader } from '@/shared/ui/loader/loader';

import styles from './page-loader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(styles.root, [className])}>
        <Loader />
    </div>
);
