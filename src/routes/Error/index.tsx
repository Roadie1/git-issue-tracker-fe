import React from 'react';
import "./error.styles.scss";
import { useAppSelector } from '../../store/hooks';
import { errorSelector } from '../../store';

export default function Error(): JSX.Element {
    const issuesError = useAppSelector(errorSelector); // TODO
    return (
        <main className="error">
            <h1>Error {issuesError.status || ''}</h1>
            <p>{issuesError.message || 'Something went wrong'}</p>
        </main>
    );
}