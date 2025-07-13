export type Mods = Record<string, boolean | undefined>

export function classNames(
    mainClass: string,
    additionalClasses: Array<string | undefined> = [],
    modifiers: Mods = {},
): string {
    const activeModifiers = Object.entries(modifiers)
        .filter(([_, isActive]) => Boolean(isActive))
        .map(([className]) => className);

    return [
        mainClass,
        ...additionalClasses.filter(Boolean),
        ...activeModifiers,
    ]
        .filter(Boolean)
        .join(' ')
        .trim();
}
