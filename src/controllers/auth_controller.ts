import { LoginReponse, LoginRequest } from 'src/entity/dto/endpoints';
import { Context, Controller as BaseController, RequestData } from 'rey-common';
import { SCHEME } from '../entity/validation/common';
import UserService from '../services/user_service';
import { API_ROUTE } from '../entity/constant/api';
import ReyDefaultOutboundService from '../outbound/rey_default_outbound_service';

export default class AuthController extends BaseController {

    public constructor(
        private userService: UserService,
        private reyDefaultOutboundService: ReyDefaultOutboundService
    ) {
        super({ path: API_ROUTE.AUTH });
    }

    public async login(data: LoginRequest, context: Context): Promise<LoginReponse> {
        const {
            body: { username, password }
        } = data;

        const { lifetime, refresh_token, token } = await this.userService.signUser(username, password);

        return {
            token,
            refresh_token,
            expires_in: lifetime,
        };
    }

    public async checkUsername(data: RequestData, context: Context): Promise<any> {
        const isExist = await this.reyDefaultOutboundService.checkUsername(data.params.username);
        return {
            username: data.params.username,
            is_exist: isExist
        };
    }

    public setRoutes(): void {
        this.addRoute<LoginReponse>('post', '/login', this.login.bind(this), { validate: SCHEME.LOGIN });
        this.addRoute('get', '/check-username/:username', this.checkUsername.bind(this));
    }
}
