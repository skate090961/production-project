import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/app/App';
import { ErrorBoundary } from '@/app/providers/error-boundary';
import { StoreProvider } from '@/app/providers/store-provider';
import { ThemeProvider } from '@/app/providers/theme';
import '@/shared/config/i18n/i18n';

import './app/styles/index.scss';

ReactDOM.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
