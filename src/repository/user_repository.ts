import { SQLRepository } from 'rey-common';
import { UserProperties } from '../typings/models/user';
import { UserRepository } from './interfaces/user_repository';

export class UserRepositoryImpl extends SQLRepository<UserProperties> implements UserRepository {
    public constructor() {
        super('User');
    }

    public async getTotalUser(): Promise<number> {
        return 999;
    }
}

export default UserRepositoryImpl;
