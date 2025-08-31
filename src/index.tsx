import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/app/App';
import { ErrorBoundary } from '@/app/providers/error-boundary';
import { StoreProvider } from '@/app/providers/store-provider';
import { ThemeProvider } from '@/app/providers/theme';
import '@/shared/config/i18n/i18n';

import './app/styles/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
