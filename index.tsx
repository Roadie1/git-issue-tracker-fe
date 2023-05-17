import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';
import { createRoot } from "react-dom/client";
import store from './src/store';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
);