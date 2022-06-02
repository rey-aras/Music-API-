import { App as BaseApp, SQLContext, RedisContext } from 'rey-common';
import MusicController from './controllers/music_controller';
import MusicServiceImpl from './services/impl/music_service_impl';
import MusicRepositoryImpl from './repositories/impl/music_repository_impl';

class App extends BaseApp {
    public async initProviders(): Promise<void> {
        SQLContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: './database/models'
        });
        RedisContext.initialize({
            connection_string: String(process.env.REDIS_CONNECTION_STRING)
        });
    }

    public async initControllers(): Promise<void> {
        /** initiate services */
        const musicRepo = new MusicRepositoryImpl();
        const musicService = new MusicServiceImpl(
            musicRepo
        );

        /** Register Controller */
        this.addController(new MusicController(musicService));

        /** a sublte changes... */
    }
}

export default App;
