import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './app.styles.scss';
import Modal from './components/Modal';

export default function App(): JSX.Element {
    return (
        <>
            <Header />
            <Outlet />
            <Modal />
        </>
    )
}