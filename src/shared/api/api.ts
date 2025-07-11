import axios from 'axios';

import { USER_LS_KEY } from '@/shared/consts/local-storage';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LS_KEY),
    },
});
