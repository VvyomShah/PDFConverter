import { FC, ReactNode } from 'react';

type InnerCardProps = {
  children: ReactNode;
  title: string;
  className?: string;
};

export const InnerCard: FC<InnerCardProps> = ({ children, title, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border-t-8 border-blue-600 p-6 ${className}`}
      style={{
        width: '100%',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
};