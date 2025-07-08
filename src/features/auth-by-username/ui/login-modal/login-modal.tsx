import { Modal } from '@/shared/ui/modal/modal';

import { LoginForm } from '../login-form/login-form';

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
        <LoginForm />
    </Modal>
);
