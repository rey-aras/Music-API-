export interface RefreshToken {
    token: string;
    valid_until: string;
}

export interface Tokenable {
    user_id: number;
    username: string;
    clearance: number;
}
