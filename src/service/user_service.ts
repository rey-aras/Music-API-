import { HttpError, Service } from 'rey-common';
import Auth from '../utility/auth';
import UserRepository from '../repository/interfaces/user_repository';
import UserService from './interfaces/user_service';
import { UserProperties } from '../typings/models/user';

export class UserServiceImpl extends Service implements UserService {

    constructor(
        private userRepository: UserRepository
    ){
        super();
    }

    public async signUser(username: string, password: string): Promise<{ token: string; refresh_token: string; lifetime: number }> {
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new HttpError.UnauthorizedError('credential not match', 'CREDENTIAL_NOT_MATCH');
        }

        if (!Auth.validatePassword(password, user.password)) {
            throw new HttpError.UnauthorizedError('credential not match', 'CREDENTIAL_NOT_MATCH');
        }

        const { token: refreshToken, valid_until } = Auth.generateRefreshToken();
        user.refresh_token = refreshToken;
        user.token_validity = valid_until;

        await this.userRepository.create(user);

        const { lifetime, token } = Auth.generateToken({ user_id: user.id as number, username: user.username, clearance: user.clearance });

        return {
            token,
            refresh_token: refreshToken,
            lifetime
        };
    }

    public async getUser(id: string): Promise<UserProperties> {
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new HttpError.NotFoundError('user not found', 'USER_NOT_FOUND');
        }
        return user;
    }
}

export default UserServiceImpl;
