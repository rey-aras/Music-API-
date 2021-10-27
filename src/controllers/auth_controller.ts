import { Context, Controller as BaseController, RequestData } from 'rey-common';
import { API_ROUTE } from '../entity/constant/api';
import ReyDefaultOutboundService from '../outbound/rey_default_outbound_service';

export class AuthController extends BaseController {

    public constructor(
        private reyDefaultOutboundService: ReyDefaultOutboundService
    ) {
        super({ path: API_ROUTE.AUTH });
    }

    public async checkUsername(data: RequestData, context: Context): Promise<any> {
        const isExist = await this.reyDefaultOutboundService.checkUsername(data.params.username);
        return {
            username: data.params.username,
            is_exist: isExist
        };
    }

    public setRoutes(): void {
        this.addRoute('get', '/check-username/:username', this.checkUsername.bind(this));
    }
}

export default AuthController;
