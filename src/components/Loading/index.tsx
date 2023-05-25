import React from "react";
import './loading.styles.scss';

interface LoadingProps {
    size: number;
}

export default function Loading({ size }: LoadingProps): JSX.Element {
    return (
        <div className="loading__container" style={{ minHeight: size + 'px' }}>
            <div className="loading" style={{ width: size + 'px', height: size + 'px' }}>
                <div className="loading__center" style={{ width: size * 0.8 + 'px', height: size * 0.8 + 'px' }} />
            </div>
        </div>
    )
}