import { SQLRepository } from 'rey-common';
import { MusicProperties } from '../../entity/models/music';
import MusicRepository from '../music_repository';

export class MusicRepositoryImpl extends SQLRepository<MusicProperties> implements MusicRepository {
    public constructor() {
        super('Music');
    }
}

export default MusicRepositoryImpl;