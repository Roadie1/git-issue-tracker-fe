import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import './app.styles.scss';

export default function App(): JSX.Element {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}