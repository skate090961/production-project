import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';
import { User, userActions } from '@/entities/user';
import { AppRoutes, RoutePath } from '@/shared/config/route/route-config';
import { USER_LS_KEY } from '@/shared/consts/local-storage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            const { data } = response;

            localStorage.setItem(USER_LS_KEY, JSON.stringify(data));
            dispatch(userActions.updateAuthData(data));
            extra.navigate(RoutePath[AppRoutes.ABOUT]);

            return data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
