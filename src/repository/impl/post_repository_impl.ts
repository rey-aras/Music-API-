import { SQLRepository } from 'rey-common';
import { PostProperties } from '../../entity/models/post';
import PostRepository from '../post_repository';

export class PostRepositoryImpl extends SQLRepository<PostProperties> implements PostRepository {
    public constructor() {
        super('Post');
    }
}

export default PostRepositoryImpl;
