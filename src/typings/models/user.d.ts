import { BaseProps } from 'rey-common';
import { PostProperties } from './post';

interface UserProperties extends BaseProps {
    name: string;
    username: string;
    password: string;
    refresh_token: string;
    token_validity: string;
    clearance: number;

    posts?: PostProperties[];
}
