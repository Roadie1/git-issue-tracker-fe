import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';
import IssueDetails from './routes/IssueDetails';
import Staistics from './routes/Statistics';
import NotFound from './routes/NotFound';
import App from './App';
import IssueList from './routes/IssueList';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: (<IssueList />)
            },
            {
                path: 'issue/:user/:repository/:issueNumber',
                element: (
                    <IssueDetails />
                )
            },
            {
                path: 'statistics',
                element: (
                    <Staistics />
                )
            },
        ]
    },
    {
        path: '*',
        element: (<NotFound />)
    }
]);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
            <RouterProvider router={router} />
    </Provider>
);