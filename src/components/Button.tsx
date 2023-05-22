import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import './button.styles.scss';

interface ButtonProps {
    type: 'underline' | 'primary',
    disabled: boolean,
    onClick: () => void
}

export default function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
    const { type = 'primary', disabled, onClick } = props;
    return (
        <button
            className={clsx('button', `button-${type}`)}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    )
}