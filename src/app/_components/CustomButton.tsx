import { ButtonHTMLAttributes } from 'react';

import styles from './CustomButton.module.css';

interface CustomButtonProps {
  children: string;
  onClick?: () => void;
  isError?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function CustomButton({
  children,
  onClick,
  isError = false,
  type = 'button',
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isError}
      className={`${styles.button} ${isError && styles.disabled}`}
    >
      {children}
    </button>
  );
}
