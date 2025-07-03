import { fireEvent, screen } from '@testing-library/react';

import {
    renderWithTranslation,
} from '@/shared/lib/tests/render-with-translation/render-with-translation';

import { Sidebar } from './sidebar';

describe('sidebar', () => {
    test('renders with default props', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('sidebar collapsed', () => {
        renderWithTranslation(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
        screen.debug();
    });
});
