import { Context as IContext } from 'rey-common';

export type Context = IContext<{
    username: string;
    user_id: string;
    clearance: number;
}>
