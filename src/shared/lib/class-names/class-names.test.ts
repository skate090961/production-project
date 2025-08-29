import { classNames } from './class-names';

describe('classNames', () => {
    test('with only main class', () => {
        expect(classNames('main')).toBe('main');
    });

    test('with main and additional classes', () => {
        expect(classNames('main', ['class1', 'class2']))
            .toBe('main class1 class2');
    });

    test('with main class and modifiers', () => {
        expect(classNames('main', [], { hovered: true, active: false }))
            .toBe('main hovered');
    });

    test('with all parameters', () => {
        expect(classNames(
            'main',
            ['class1', 'class2'],
            { hovered: true, active: false },
        )).toBe('main class1 class2 hovered');
    });

    test('with falsy values in additional classes', () => {
        expect(classNames('main', ['class1', '', undefined, 'class2']))
            .toBe('main class1 class2');
    });

    test('with mixed modifiers', () => {
        expect(classNames(
            'main',
            [],
            { hovered: true, active: false, disabled: true },
        )).toBe('main hovered disabled');
    });

    test('with empty inputs', () => {
        expect(classNames('', [], {})).toBe('');
    });
});
