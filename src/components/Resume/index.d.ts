import { ReactNode } from 'react';

export interface ICardProps {
  title: string;
  location: string;
  time: string;
  jurusan?: string;
  children: ReactNode;
}
