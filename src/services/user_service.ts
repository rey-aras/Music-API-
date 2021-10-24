import { Service } from 'rey-common';
import { UserProperties } from '../entity/models/user';

interface UserService extends Service {
    getUser(id: number): Promise<UserProperties>
}

export default UserService;
