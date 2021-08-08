import { SQLRepository } from 'rey-common';
import { PostProperties } from '../typings/models/post';
import PostRepository from './interfaces/post_repository';

export class PostRepositoryImpl extends SQLRepository<PostProperties> implements PostRepository {
    public constructor() {
        super('Post');
    }
}

export default PostRepositoryImpl;
