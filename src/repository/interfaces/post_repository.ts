import { SQLRepository } from 'rey-common';
import { PostProperties } from '../../typings/models/post';

export type PostRepository = SQLRepository<PostProperties>

export default PostRepository;