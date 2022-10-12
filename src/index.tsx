import React from 'react';
import './index.css';
import {createRoot} from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import {register} from './serviceWorkerRegistration';

const LazySend = React.lazy(() => import('./component/Send'));
const LazyShow = React.lazy(() => import('./component/Show'));

const root = document.getElementById('root')
if (root) {
    createRoot(root).render(
        <React.StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<LazySend/>}/>
                    <Route path="show" element={<LazyShow/>}/>
                    <Route path="*" element={<main>404</main>}/>
                </Routes>
            </HashRouter>
        </React.StrictMode>,
    );
}

register()
