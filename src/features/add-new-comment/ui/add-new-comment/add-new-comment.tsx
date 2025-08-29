import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/class-names/class-names';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';

import {
    getAddNewCommentIsLoading,
    getAddNewCommentText,
} from '../../model/selectors/add-new-comment-selectors';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/add-new-comment-slice';

import styles from './add-new-comment.module.scss';

export interface AddNewCommentProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const initReducers: ReducerList = {
    addNewComment: addNewCommentReducer,
};

const AddNewComment = memo(({ className, onSendComment }: AddNewCommentProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const text = useSelector(getAddNewCommentText);
    const isLoading = useSelector(getAddNewCommentIsLoading);

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addNewCommentActions.updateText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={initReducers}>
            <div className={classNames(styles.root, [className])}>
                <Input
                    className={styles.input}
                    placeholder={t('Введите текст комментария')}
                    onChange={onCommentTextChange}
                    value={text}
                    disabled={isLoading}
                />
                <Button
                    onClick={onSendHandler}
                    disabled={isLoading}
                >
                    {t('Отправить')}
                </Button>
            </div>
        </DynamicModuleLoader>

    );
});

export default AddNewComment;
