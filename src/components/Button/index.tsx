import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import './button.styles.scss';

interface ButtonProps {
    type: 'underline' | 'primary',
    active?: boolean,
    disabled?: boolean,
    onClick: () => void
}

export default function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
    const { type = 'primary', disabled, onClick, active } = props;
    return (
        <button
            className={clsx("button", `button__${type}`, { "button__active": active })}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    )
}