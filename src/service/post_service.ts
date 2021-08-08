import { Service } from 'rey-common';
import PostRepository from '../repository/interfaces/post_repository';
import { Context } from '../typings/common';
import { PostProperties } from '../typings/models/post';
import PostService from './interfaces/post_service';

export class PostServiceImpl extends Service implements PostService {

    constructor(
        private postRepository: PostRepository
    ){
        super();
    }

    public async findPost(id: string, context: Context): Promise<PostProperties> {
        return await this.postRepository.findOneOrFail({
            author_id: context.user_id,
            id
        });
    }
}

export default PostServiceImpl;
