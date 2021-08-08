import { App as BaseApp, SQLContext, RedisContext } from 'rey-common';
import AuthController from './controller/auth_controller';
import PostController from './controller/post_controller';
import ProfileController from './controller/profile_controller';
import PostRepositoryImpl from './repository/post_repository';
import UserRepositoryImpl from './repository/user_repository';
import StarwarsOutboundServiceImpl from './service/starwars_outbound_service';
import UserServiceImpl from './service/user_service';

class App extends BaseApp {
    public constructor(port: number) {
        super(port);
    }

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
        const userService = new UserServiceImpl(
            new UserRepositoryImpl()
        );
        const starwarsService = new StarwarsOutboundServiceImpl;

        /** Register Controller */
        this.addController(new AuthController(userService));
        this.addController(new ProfileController(userService, starwarsService));
        this.addController(new PostController(new PostRepositoryImpl()));
    }
}

export default App;
