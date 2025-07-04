import { render, screen } from '@testing-library/react';

import { Button, ButtonTheme } from './button';

describe('button', () => {
    test('renders with default props', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('renders with clear theme', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
