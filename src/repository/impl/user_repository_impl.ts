import { SQLRepository } from 'rey-common';
import { UserProperties } from '../../entity/models/user';
import { UserRepository } from '../user_repository';

export class UserRepositoryImpl extends SQLRepository<UserProperties> implements UserRepository {
    public constructor() {
        super('User');
    }

    public async getTotalUser(): Promise<number> {
        return 999;
    }
}

export default UserRepositoryImpl;
