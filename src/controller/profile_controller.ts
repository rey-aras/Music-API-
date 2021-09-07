import { Context, Controller as BaseController, JWTMiddleware, RequestData } from 'rey-common';
import API_ROUTE from '../entity/constant/api';
import StarwarsOutboundService from '../outbound/starwars_outbound_service';
import UserService from '../service/user_service';

export default class ProfileController extends BaseController {
    public constructor(
        private userService: UserService,
        private starWarsOutboundService: StarwarsOutboundService
    ) {
        super({ path: API_ROUTE.PROFILE, middleware: JWTMiddleware });
    }

    public async getProfile(data: RequestData, context: Context): Promise<any> {
        const user = await this.userService.getUser(context.user_id);
        return user;
    }

    public async getStarwarsProfile(data: RequestData, context: Context): Promise<any> {
        const person = await this.starWarsOutboundService.getPersonById(data.params.id);
        return {
            name: person.name,
            height: person.height,
            mass: person.mass,
        };
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getProfile.bind(this), { cache: true });
        this.addRoute('get', '/starwars/:id', this.getStarwarsProfile.bind(this));

        /** nested controllers */
        // this.addChildController(Controller);
    }
}
