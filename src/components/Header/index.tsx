import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './header.styles.scss';
import { BackArrow, GithubIcon } from '../../icons';


export default function Header(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <header className='header'>
            {location.pathname !== '/' && (
                <nav className='header__back' onClick={() => navigate(-1)}>
                    <BackArrow />
                </nav>
            )}
            <h1 onClick={() => navigate('/')}>
                <GithubIcon />
                Github Issue Tracker
            </h1>
            <NavLink to="/statistics">Statistics</NavLink>
        </header>
    );
}