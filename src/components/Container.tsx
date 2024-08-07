import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="w-full max-w-screen-2xl mx-auto px-3 md:px-5 lg:px-8">{children}</div>;
}
