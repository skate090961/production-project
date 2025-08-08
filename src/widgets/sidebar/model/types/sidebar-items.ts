import { SVGProps, VFC } from 'react';

export interface SidebarItemType {
    path: string;
    translationKey: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    authOnly: boolean;
}
