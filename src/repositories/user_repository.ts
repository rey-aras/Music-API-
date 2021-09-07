import { SQLRepository } from 'rey-common';
import { UserProperties } from '../entity/models/user';

export interface UserRepository extends SQLRepository<UserProperties> {
    getTotalUser(): Promise<number>
}

export default UserRepository;