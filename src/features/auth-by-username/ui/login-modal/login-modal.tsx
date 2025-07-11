import { Suspense } from 'react';

import { Loader } from '@/shared/ui/loader/loader';
import { Modal } from '@/shared/ui/modal/modal';

import { LoginFormLazy } from '../login-form/login-form.lazy';

interface LoginModalProps {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={className}
        isOpen={isOpen}
        onClose={onClose}
        isLazy
    >
        <Suspense fallback={<Loader />}>
            <LoginFormLazy />
        </Suspense>
    </Modal>
);
