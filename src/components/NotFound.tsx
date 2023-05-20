import React from 'react';
import "./not-found.styles.scss";

export default function NotFound(): JSX.Element {
    return (
        <main className='NotFound'>
            <h1>Not found</h1>
            <p>Page you are looking for does not exist</p>
        </main>
    );
}