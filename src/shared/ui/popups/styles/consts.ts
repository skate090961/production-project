import { DropdownDirection } from '@/shared/types/ui';

import generalStyles from './popup.module.scss';

export const directionStyles: Record<DropdownDirection, string> = {
    bottomLeft: generalStyles.bottomLeft,
    bottomRight: generalStyles.bottomRight,
    topLeft: generalStyles.topLeft,
    topRight: generalStyles.topRight,
};
