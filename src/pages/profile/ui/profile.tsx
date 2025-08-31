import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editable-profile-card';
import { Text } from '@/shared/ui/text/text';
import { Page } from '@/widgets/page/page';

const Profile = () => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation('profile');

    if (!id) {
        return <Text title={t('Профиль не найден')} />;
    }

    return (
        <Page>
            <EditableProfileCard id={id} />
        </Page>
    );
};

export default memo(Profile);
