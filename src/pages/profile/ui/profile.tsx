import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editable-profile-card';
import { ProfileRating } from '@/features/profile-rating';
import { VStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text';
import { Page } from '@/widgets/page';

const Profile = () => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation('profile');

    if (!id) {
        return <Text title={t('Профиль не найден')} />;
    }

    return (
        <Page>
            <VStack gap="16">
                <EditableProfileCard id={id} />
                <ProfileRating profileId={id} />
            </VStack>
        </Page>
    );
};

export default memo(Profile);
