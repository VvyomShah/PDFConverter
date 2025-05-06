// components/Button.tsx
import { FC, ReactNode } from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button: FC<ButtonProps> = ({ variant, onClick, children, disabled, className}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-lg px-4 py-2.5 text-sm 
        ${
        variant === 'primary' 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-700'},
        ${disabled === true ? 'opacity-25' : ''},
        ${className}`}
    >
      {children}
    </button>
  );
};
