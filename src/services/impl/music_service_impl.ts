import { HttpError, Service } from 'rey-common';
import MusicRepository from '../../repositories/music_repository';
import MusicService from '../music_service';
import { MusicProperties } from '../../entity/models/music';

export class MusicServiceImpl extends Service implements MusicService {

    constructor(
        private musicRepository: MusicRepository
    ){
        super();
    }

    public async getMusicAll(): Promise<MusicProperties[]> {
        return this.musicRepository.findAll({}, {});
    }

    public async getMusicById(id: string): Promise<MusicProperties> {
        const music = await this.musicRepository.findOne({ id });
        if (!music) {
            throw new HttpError.NotFoundError('music not found', 'MUSIC_NOT_FOUND');
        }
        return music;
    }

    public async addMusic(data: MusicProperties): Promise<MusicProperties> {
        return this.musicRepository.create(data);
    }

    public async updateMusic(id: string, data: MusicProperties): Promise<MusicProperties> {
        const music = await this.musicRepository.findOne({ id });
        if (!music) {
            throw new HttpError.NotFoundError('Music not found', 'MUSIC_NOT_FOUND');
        }

        await this.musicRepository.update({ id }, data);
        return music;
    }

    public async deleteMusic(id: string): Promise<any> {
        const music = await this.musicRepository.findOne({ id });
        if (!music) {
            throw new HttpError.NotFoundError('Music not found', 'MUSIC_NOT_FOUND');
        }

        await this.musicRepository.delete({ id });
        return { id };
    }
}

export default MusicServiceImpl;