import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router';
import { Button, ButtonTheme } from '@/shared/ui/button';
import { HStack } from '@/shared/ui/stack';

import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsHeaderProps {
    className?: string;
    id: string;
}

export const ArticleDetailsHeader = memo(({ className, id }: ArticleDetailsHeaderProps) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(getRouteArticleEdit(id));
    }, [id, navigate]);

    return (
        <HStack className={className} justify="between">
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}
            >
                {t('Назад к списку')}
            </Button>
            {canEdit && (
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
