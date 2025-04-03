import { ChangeEvent, FC } from 'react';

export interface IContactSection {
  icon: FC;
  title: string;
  content: string;
}

export interface IInputForm {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<T>) => void;
}
