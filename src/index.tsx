import {lazy, StrictMode} from 'react';
import './index.css';
import {createRoot} from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import {register} from './serviceWorkerRegistration';

const root = document.getElementById('root')

const Send = lazy(() => import('./component/Send'))
const Show = lazy(() => import('./component/Show'))

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

register();
