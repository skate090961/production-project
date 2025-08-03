import { memo } from 'react';

import { Code } from '@/shared/ui/code/code';

import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockUIProps {
    className?: string;
    block?: ArticleCodeBlock;
}

export const ArticleCodeBlockUI = memo(({ className, block }: ArticleCodeBlockUIProps) => (
    <article className={className}>
        <Code code={block?.code} />
    </article>
));
