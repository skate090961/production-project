import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserRoles, UserRole } from '@/entities/user';
import { RoutePath } from '@/shared/consts/router';

interface RequireRolesProps {
    children: ReactElement;
    roles?: UserRole[];
}

export const RequireRoles = ({ children, roles }: RequireRolesProps): ReactElement => {
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((r) => Boolean(userRoles?.includes(r)));
    }, [roles, userRoles]);

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={RoutePath.forbidden}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};
