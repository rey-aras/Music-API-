import { SQLRepository } from 'rey-common';
import { MusicProperties } from '../entity/models/music';

export type MusicRepository = SQLRepository<MusicProperties>

export default MusicRepository;