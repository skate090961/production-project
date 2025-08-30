import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Code } from '@/shared/ui/code/code';

import { ArticleCodeBlock } from '../../model/types/article';

import styles from './article-code-block-ui.module.scss';

interface ArticleCodeBlockUIProps {
    className?: string;
    block?: ArticleCodeBlock;
}

export const ArticleCodeBlockUI = memo(({ className, block }: ArticleCodeBlockUIProps) => (
    <article className={classNames(styles.root, [className])}>
        <Code code={block?.code} />
    </article>
));
