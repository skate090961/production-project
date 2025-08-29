import axios from 'axios';

import { USER_LS_KEY } from '@/shared/consts/local-storage';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LS_KEY) || '';
    }

    return config;
});
