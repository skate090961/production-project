import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Text } from '@/shared/ui/text/text';

import { ArticleTextBlock } from '../../model/types/article';

import styles from './article-text-block-ui.module.scss';

interface ArticleTextBlockUIProps {
    className?: string;
    block?: ArticleTextBlock;
}

export const ArticleTextBlockUI = memo(({ className, block }: ArticleTextBlockUIProps) => (
    <article className={classNames(styles.root, [className])}>
        {block?.title && (
            <Text title={block.title} />
        )}
        <div className={styles.paragraphs}>
            {block?.paragraphs.map((p, i) => <Text key={i} text={p} />)}
        </div>
    </article>
));
