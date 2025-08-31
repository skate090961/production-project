import { StateSchema } from '@/app/providers/store-provider';

export const getProfilerReadonly = (state: StateSchema) => state.profile?.readonly;
