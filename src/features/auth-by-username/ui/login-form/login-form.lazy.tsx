import { FC, lazy } from 'react';

import { LoginFormProps } from './login-form';

export const LoginFormLazy = lazy<FC<LoginFormProps>>(() => import('./login-form'));
