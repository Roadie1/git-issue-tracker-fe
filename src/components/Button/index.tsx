import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import './button.styles.scss';

interface ButtonProps {
  type: 'underline' | 'primary',
  active?: boolean,
  disabled?: boolean,
  onClick: () => void
}

export default function Button({
  type = 'primary',
  disabled = false,
  active = false,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>): JSX.Element {
  return (
    <button
      type="button"
      className={clsx('button', `button__${type}`, { button__active: active })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
