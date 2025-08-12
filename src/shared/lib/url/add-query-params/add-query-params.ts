export const getQueryParams = (params: Partial<Record<string, string>>) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.set(key, value);
        }
    });

    return `?${searchParams.toString()}`;
};

/**
 * Функция добавления параметров запроса в URL
 * @param params
 */
export const addQueryParams = (params: Partial<Record<string, string>>) => {
    window.history.pushState(null, '', getQueryParams(params));
};
