import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
    <div
        className={classNames(styles.root, [className])}
    >
        /
    </div>
);
