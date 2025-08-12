import { getQueryParams } from './add-query-params';

describe('shared/url/addQueryParams', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toEqual('?test=value');
    });
    test('test with multiple params', () => {
        const params = getQueryParams({
            first: 'first',
            second: 'second',
        });
        expect(params).toEqual('?first=first&second=second');
    });
    test('test with undefined', () => {
        const params = getQueryParams({
            first: 'first',
            second: undefined,
        });
        expect(params).toEqual('?first=first');
    });
});
