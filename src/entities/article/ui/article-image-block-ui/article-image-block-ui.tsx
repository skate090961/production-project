import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { VStack } from '@/shared/ui/stack';
import { Text, TextAlign, TextSize } from '@/shared/ui/text';

import { ArticleImageBlock } from '../../model/types/article';

import styles from './article-image-block-ui.module.scss';

interface ArticleImageBlockUIProps {
    className?: string;
    block?: ArticleImageBlock;
}

export const ArticleImageBlockUI = memo(({ className, block }: ArticleImageBlockUIProps) => (
    <article className={classNames(styles.root, [className])}>
        <VStack align="center">
            <img src={block?.src} alt={block?.title} className={styles.img} />
            {block?.title && <Text text={block.title} align={TextAlign.CENTER} size={TextSize.S} /> }
        </VStack>
    </article>
));
