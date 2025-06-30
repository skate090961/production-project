import ReactDOM from 'react-dom';
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "./theme/theme-provider";

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);