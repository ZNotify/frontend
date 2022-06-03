import {StrictMode} from 'react';
import './index.css';
import Send from './Send';
import Show from "./Show";
import {createRoot} from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {isDebug} from "./utils";

const root = document.getElementById('root')
if (root) {
    createRoot(root).render(
        <StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Send/>}/>
                    <Route path="show" element={<Show/>}/>
                    <Route path="*" element={<main>404</main>}/>
                </Routes>
            </HashRouter>
        </StrictMode>,
    );
}

serviceWorkerRegistration.register()

if (isDebug()) {
    reportWebVitals(console.log)
}
