import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/page';

const AdminPanel = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('AdminPanel')}
        </Page>
    );
};

export default AdminPanel;
