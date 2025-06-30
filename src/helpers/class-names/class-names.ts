export function classNames(
    mainClass: string,
    additionalClasses: string[] = [],
    modifiers: Record<string, boolean> = {}
): string {
    const activeModifiers = Object.entries(modifiers)
        .filter(([_, isActive]) => Boolean(isActive))
        .map(([className]) => className);

    return [
        mainClass,
        ...additionalClasses.filter(Boolean),
        ...activeModifiers
    ]
        .filter(Boolean)
        .join(' ')
        .trim();
}