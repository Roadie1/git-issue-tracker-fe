import React from 'react';
import "./error.styles.scss";

export default function Error(): JSX.Element {
    return (
        <main className="error">
            <h1>Error</h1>
            <p>Something went wrong</p>
        </main>
    );
}