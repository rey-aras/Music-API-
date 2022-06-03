import { Context, Controller as BaseController, JWTMiddleware, RequestData } from 'rey-common';
import { MusicProperties } from 'src/entity/models/music';
import { API_ROUTE } from '../entity/constant/api';
import MusicService from '../services/music_service';

export class MusicController extends BaseController {
    public constructor(
        private musicService: MusicService
    ) {
        super({ path: API_ROUTE.MUSIC });
    }

    public async getMusic(): Promise<any> {
        return await this.musicService.getMusicAll();
    }

    public async getMusicById(data: RequestData): Promise<any> {
        return await this.musicService.getMusicById(data.params.id);
    }

    public async addMusic(data: RequestData): Promise<any> {
        return await this.musicService.addMusic(data.body);
    }

    public async updateMusic(data: RequestData): Promise<any> {
        const musicId = data.params.id;
        const musicData = data.body;

        return await this.musicService.updateMusic(musicId, musicData);
    }

    public async deleteMusic(data: RequestData): Promise<any> {
        return await this.musicService.deleteMusic(data.params.id);
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getMusic.bind(this));
        this.addRoute('get', '/:id', this.getMusicById.bind(this));
        this.addRoute('post', '/', this.addMusic.bind(this));
        this.addRoute('put', '/:id', this.updateMusic.bind(this));
        this.addRoute('delete', '/:id', this.deleteMusic.bind(this));
    }
}

export default MusicController;