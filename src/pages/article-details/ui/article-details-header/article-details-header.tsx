import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { RoutePath } from '@/shared/config/route/route-config';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { HStack } from '@/shared/ui/stack';

interface ArticleDetailsHeaderProps {
    className?: string;
    isEdit: boolean;
    id: string;
}

export const ArticleDetailsHeader = memo(({ className, isEdit, id }: ArticleDetailsHeaderProps) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${id}/edit`);
    }, [id, navigate]);

    return (
        <HStack className={className} justify="between">
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}
            >
                {t('Назад к списку')}
            </Button>
            {isEdit && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
