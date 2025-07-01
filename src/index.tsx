import ReactDOM from 'react-dom';
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@/app/providers/theme";

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);