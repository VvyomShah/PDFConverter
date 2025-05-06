import { FC, ReactNode, HTMLProps } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>; // Allow additional HTML div props like getRootProps

export const Card: FC<CardProps> = ({ children, className = '', ...rest }) => {
  return (
    <div
      {...rest} // Spread the remaining props here (like getRootProps())
      className={`bg-white border border-gray-200 rounded-xl p-6 ${className}`}
      style={{
        borderRadius: '1rem',
      }}
    >
      {children}
    </div>
  );
};
