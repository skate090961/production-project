import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Text, TextAlign, TextSize } from '@/shared/ui/text/text';

import { ArticleImageBlock } from '../../model/types/article';

import styles from './article-image-block-ui.module.scss';

interface ArticleImageBlockUIProps {
    className?: string;
    block?: ArticleImageBlock;
}

export const ArticleImageBlockUI = memo(({ className, block }: ArticleImageBlockUIProps) => {
    const { t } = useTranslation();

    return (
        <article className={classNames(styles.root, [className])}>
            <img src={block?.src} alt={block?.title} className={styles.img} />
            {block?.title && <Text text={block.title} align={TextAlign.CENTER} size={TextSize.S} /> }
        </article>
    );
});
