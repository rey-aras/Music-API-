import { Context, Service } from 'rey-common';
import PostRepository from '../../repositories/post_repository';
import { PostProperties } from '../../entity/models/post';
import PostService from '../post_service';

export class PostServiceImpl extends Service implements PostService {

    constructor(
        private postRepository: PostRepository
    ){
        super();
    }

    public async findPost(id: string, context: Context): Promise<PostProperties> {
        return await this.postRepository.findOneOrFail({
            author_id: String(context.user_id),
            id
        });
    }
}

export default PostServiceImpl;
