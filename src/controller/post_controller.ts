import { Context } from 'src/typings/common';
import { UpdatePostRequest, UpdatePostResponse } from 'src/typings/endpoints';
import { Controller as BaseController, SQLContext, RequestData, JWTMiddleware } from 'rey-common';
import API_ROUTE from '../entity/constant/api_route';
import PostTransformer from '../entity/mapper/post_mapper';
import { SCHEME } from '../utility/validator';
import PostRepository from '../repository/interfaces/post_repository';

export default class PostController extends BaseController {
    public constructor(
        private postRepository: PostRepository
    ) {
        super({ path: API_ROUTE.POST, middleware: JWTMiddleware });
    }

    public async createPost(data: RequestData, context: Context): Promise<{ id: string }> {
        const post = await this.postRepository.create({
            ...data.body,
            author_id: context.user_id
        });
        return PostTransformer.PostDetail(post);
    }

    public async getPostList(data: RequestData, context: Context): Promise<any> {
        const posts = await this.postRepository.paginate(
            { author_id: context.user_id },
            { page: 1, per_page: 10, sort: '-created_at' }
        );

        return PostTransformer.PostList(posts.data, posts.meta);
    }

    public async getPostDetail(data: RequestData, context: Context): Promise<any> {
        const post = await this.postRepository.findOne({ id: data.params.id, author_id: context.user_id });
        return post;
    }

    public async updatePost(data: UpdatePostRequest, context: Context): Promise<UpdatePostResponse> {
        const { body } = data;

        const post = await this.postRepository.findOneOrFail({ id: data.params.id, author_id: context.user_id });


        await this.postRepository.update({ id: post.id }, body);

        return {
            id: post.id
        };
    }

    public setRoutes(): void {
        this.addRoute('post', '/', this.createPost.bind(this), { validate: SCHEME.CREATE_POST });
        this.addRoute('get', '/', this.getPostList.bind(this));
        this.addRoute('get', '/:id', this.getPostDetail.bind(this), { cache: true });
        this.addRoute('put', '/:id', this.updatePost.bind(this), { validate: SCHEME.UPDATE_POST });
    }
}
