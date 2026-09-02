import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Large, high-contrast call-to-action button used across the app. */
export function Button({ children, className, ...rest }: ButtonProps) {
  const classes = ['button', className].filter(Boolean).join(' ');
  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}
