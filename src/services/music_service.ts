import { Service } from 'rey-common';
import { MusicProperties } from '../entity/models/music';

interface MusicService extends Service {
  getMusicAll(): Promise<MusicProperties[]>
  getMusicById(id: string): Promise<MusicProperties>
  addMusic(data: MusicProperties): Promise<MusicProperties>
  updateMusic(id: string, data: MusicProperties): Promise<MusicProperties>
  deleteMusic(id: string): Promise<MusicProperties>
}

export default MusicService;