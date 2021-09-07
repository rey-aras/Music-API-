import { Page, PaginationMeta } from 'rey-common';
import { PostProperties } from '../models/post';

export const PostList = (posts: PostProperties[], pagination: PaginationMeta): Page<Partial<PostProperties>> => {
    return {
        data: posts.map((post): any => ({
            id: post.id,
            title: post.title,
            created_at: post.created_at
        })),
        meta: pagination
    };
};

export const PostDetail = (post: PostProperties): any => {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author_id: post.author_id
    };
};