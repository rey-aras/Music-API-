import { Service } from 'rey-common';
import { UserProperties } from '../entity/models/user';

interface UserService extends Service {
    signUser(username: string, password: string): Promise<{ token: string; refresh_token: string; lifetime: number; }>
    getUser(id: number): Promise<UserProperties>
}

export default UserService;
