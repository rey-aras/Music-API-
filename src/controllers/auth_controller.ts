import { Context, Controller as BaseController, RequestData } from 'rey-common';
import { API_ROUTE } from '../entity/constant/api';

export class AuthController extends BaseController {

    public constructor() {
        super({ path: API_ROUTE.AUTH });
    }

    public async checkUsername(data: RequestData, context: Context): Promise<any> {
        // call service
        return {
            username: data.params.username,
            is_exist: true
        };
    }

    public setRoutes(): void {
        this.addRoute('get', '/check-username/:username', this.checkUsername.bind(this));
    }
}

export default AuthController;
