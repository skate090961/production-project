import { FC, lazy } from 'react';

import { LoginFormProps } from './login-form';

export const LoginFormLazy = lazy<FC<LoginFormProps>>(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./login-form')), 1500);
}));
