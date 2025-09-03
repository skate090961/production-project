export const getRedirectLink = (to: string) => {
    const currentLocation = window.location.origin;
    const cleanPath = to.replace(/^\//, '');

    return `${currentLocation}/${cleanPath}`;
};
