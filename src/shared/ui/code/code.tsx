import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/class-names/class-names';

import { AppIcon } from '../app-icon/app-icon';
import { Button, ButtonTheme } from '../button/button';

import styles from './code.module.scss';

interface CodeProps {
    className?: string;
    code?: string;
}

export const Code = memo(({ className, code }: CodeProps) => {
    const onCopy = useCallback(async () => {
        if (code) {
            try {
                await navigator.clipboard.writeText(code);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    }, [code]);

    return (
        <pre className={classNames(styles.root, [className])}>
            <Button
                className={styles.copy}
                theme={ButtonTheme.CLEAR}
                onClick={onCopy}
            >
                <AppIcon Svg={CopyIcon} />
            </Button>
            <code>{code}</code>
        </pre>
    );
});
