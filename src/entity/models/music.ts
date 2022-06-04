import { BaseProps } from 'rey-common';

export interface MusicProperties extends BaseProps {
  id: string;
  title: string;
  performer: string;
  year: number;
  genre: string;
}