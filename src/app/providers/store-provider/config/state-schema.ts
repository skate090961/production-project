import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from '@/entities/article';
import { ProfileSchema } from '@/entities/profile';
import { UserSchema } from '@/entities/user';
import { AddNewCommentSchema } from '@/features/add-new-comment';
import { LoginSchema } from '@/features/auth-by-username';
import { ScrollSaveSchema } from '@/features/scroll-save';
import { ArticleDetailsCommentsSchema, ArticleDetailsRecommendationsSchema } from '@/pages/article-details';
import { ArticlesSchema } from '@/pages/articles';

export interface StateSchema {
    user: UserSchema;
    scrollSave: ScrollSaveSchema;

    // async reducers
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addNewComment?: AddNewCommentSchema;
    articles?: ArticlesSchema;
    articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
}

export type StateSchemaKeys = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKeys, reducer: Reducer) => void;
    remove: (key: StateSchemaKeys) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg
    state: StateSchema
}
