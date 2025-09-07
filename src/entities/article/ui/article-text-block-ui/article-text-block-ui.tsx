import { memo } from 'react';

import { VStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text';

import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockUIProps {
    className?: string;
    block?: ArticleTextBlock;
}

export const ArticleTextBlockUI = memo(({ className, block }: ArticleTextBlockUIProps) => (
    <article className={className}>
        <VStack gap="16">
            {block?.title && (
                <Text title={block.title} />
            )}
            <VStack gap="8">
                {block?.paragraphs.map((p, i) => <Text key={i} text={p} />)}
            </VStack>
        </VStack>
    </article>
));
