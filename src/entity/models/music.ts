import { BaseProps } from 'rey-common';

export interface MusicProperties extends BaseProps {
  music_id: number;
  title: string;
  performer: string;
  year: number;
  genre: string;
}