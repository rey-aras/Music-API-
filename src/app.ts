import { App as BaseApp, SQLContext, RedisContext } from 'rey-common';
import AuthController from './controller/auth_controller';
import PostController from './controller/post_controller';
import ProfileController from './controller/profile_controller';
import PostRepositoryImpl from './repository/impl/post_repository_impl';
import UserRepositoryImpl from './repository/impl/user_repository_impl';
import StarwarsOutboundServiceImpl from './outbound/impl/starwars_outbound_service_impl';
import UserServiceImpl from './service/impl/user_service_impl';

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
