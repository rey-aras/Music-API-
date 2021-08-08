import { BaseProps } from 'rey-common';

interface PostProperties extends BaseProps {
    author_id: string;
    title: string;
    content: string;
}