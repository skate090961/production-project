import { render, screen } from '@testing-library/react';

import { Button, ThemeButton } from './button';

describe('button', () => {
    test('renders with default props', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('renders with clear theme', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
