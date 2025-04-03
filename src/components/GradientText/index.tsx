import { ReactNode } from 'react';

const GradientText = ({
  children,
  style,
  from,
  to,
}: {
  children: ReactNode;
  style?: string;
  from: string;
  to: string;
}) => {
  return (
    <span
      className={`bg-gradient-to-br ${from} ${to} bg-clip-text text-transparent ${style}`}
    >
      {children}
    </span>
  );
};

export default GradientText;
