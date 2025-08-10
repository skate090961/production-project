import { Loader } from '@/shared/ui/loader/loader';
import { Page } from '@/widgets/page/page';

import styles from './page-loader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <Page className={className}>
        <div className={styles.loaderWrapper}>
            <Loader />
        </div>
    </Page>
);
