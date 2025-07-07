import { fireEvent, screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/component-render/component-render';

import { Counter } from './counter';

describe('counter', () => {
    test('renders with default props', () => {
        componentRender(<Counter />, {
            initState: { counter: { value: 10 } },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('counter incremented', () => {
        componentRender(<Counter />, {
            initState: { counter: { value: 10 } },
        });
        const incrementBtn = screen.getByTestId('increment-btn');
        fireEvent.click(incrementBtn);
        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('counter decremented', () => {
        componentRender(<Counter />, {
            initState: { counter: { value: 10 } },
        });
        const incrementBtn = screen.getByTestId('decrement-btn');
        fireEvent.click(incrementBtn);
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
