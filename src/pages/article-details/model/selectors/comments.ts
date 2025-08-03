import { StateSchema } from '@/app/providers/store-provider';

export const getArticleDetailsCommentsError = (state: StateSchema) => state.articleDetailsComments?.error;
export const getArticleDetailsCommentsIsLoading = (state: StateSchema) => state.articleDetailsComments?.isLoading;
