import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.styles.scss';
import { GithubIcon } from '../icons/Github';


export default function Header(): JSX.Element {
    const navigate = useNavigate();
    return (
        <header className='Header'>
            <h1 onClick={() => navigate('/')}>
                <GithubIcon />
                Github Issue Tracker
            </h1>
            <NavLink to="/statistics">Statistics</NavLink>
        </header>
    );
}