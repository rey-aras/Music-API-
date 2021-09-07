import { BaseProps } from 'rey-common';

export interface PostProperties extends BaseProps {
    author_id: string;
    title: string;
    content: string;
}