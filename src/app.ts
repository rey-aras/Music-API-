import { App as BaseApp, SQLContext, RedisContext } from 'rey-common';
import AuthController from './controllers/auth_controller';
import PostController from './controllers/post_controller';
import ProfileController from './controllers/profile_controller';
import PostRepositoryImpl from './repositories/impl/post_repository_impl';
import UserRepositoryImpl from './repositories/impl/user_repository_impl';
import StarwarsOutboundServiceImpl from './outbound/impl/starwars_outbound_service_impl';
import UserServiceImpl from './services/impl/user_service_impl';
import ReyDefaultGrpcHandler from './grpc/grpc_handler';

class App extends BaseApp {
    public constructor(port: number) {
        super(port, false, true);
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

        /** Register GrpcHandler */
        this.addGrpcHandler(new ReyDefaultGrpcHandler(new UserRepositoryImpl));
    }
}

export default App;
