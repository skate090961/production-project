import { StateSchema } from '@/app/providers/store-provider';

export const getAddNewCommentIsLoading = (state: StateSchema) => state.addNewComment?.isLoading;
export const getAddNewCommentText = (state: StateSchema) => state.addNewComment?.text ?? '';
export const getAddNewCommentError = (state: StateSchema) => state.addNewComment?.error;
