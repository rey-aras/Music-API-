import { SQLRepository } from 'rey-common';
import { PostProperties } from '../entity/models/post';

export type PostRepository = SQLRepository<PostProperties>

export default PostRepository;