import React from 'react';
import './index.css';
import {createRoot} from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";

const LazySend = React.lazy(() => import('./component/Send'));
const LazyShow = React.lazy(() => import('./component/Show'));

const root = document.getElementById('root')
if (root) {
    createRoot(root).render(
        <React.StrictMode>
            <ChakraProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<LazySend/>}/>
                        <Route path="show" element={<LazyShow/>}/>
                        <Route path="*" element={<main>404</main>}/>
                    </Routes>
                </HashRouter>
            </ChakraProvider>
        </React.StrictMode>,
    );
}
