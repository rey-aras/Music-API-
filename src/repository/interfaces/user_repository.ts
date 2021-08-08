import { SQLRepository } from 'rey-common';
import { UserProperties } from '../../typings/models/user';

export interface UserRepository extends SQLRepository<UserProperties> {
    getTotalUser(): Promise<number>
}

export default UserRepository;