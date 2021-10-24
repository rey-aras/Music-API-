import { HttpError, Service } from 'rey-common';
import UserRepository from '../../repositories/user_repository';
import UserService from '../user_service';
import { UserProperties } from '../../entity/models/user';

export class UserServiceImpl extends Service implements UserService {

    constructor(
        private userRepository: UserRepository
    ){
        super();
    }

    public async getUser(id: number): Promise<UserProperties> {
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new HttpError.NotFoundError('user not found', 'USER_NOT_FOUND');
        }
        return user;
    }
}

export default UserServiceImpl;
