import { Context, Page, Service } from 'rey-common';
import { PostProperties } from '../../typings/models/post';

export interface PostService extends Service {
    findPost(id: string, context: Context): Promise<PostProperties>;
    // pagePost(context: Context): Promise<Page<Partial<PostProperties>>>;
    // createPost(data: PostProperties): Promise<PostModel>;
    // updatePost(id: string, data: PostProperties): Promise<PostModel>;
    // deletePost(id: string): Promise<void>;
}

export default PostService;
