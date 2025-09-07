import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Page } from '@/widgets/page';

import styles from './article-edit.module.scss';

interface ArticleEditProps {
    className?: string;
}

const ArticleEdit = ({ className }: ArticleEditProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const isEdit = Boolean(id);

    return (
        <Page className={classNames(styles.root, [className])}>
            {isEdit ? t(`edit article id =${id}`) : t('create article')}
        </Page>
    );
};

export default ArticleEdit;
