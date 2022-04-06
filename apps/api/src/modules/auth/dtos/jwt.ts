export interface IJwt {
    userId: number;
    roles: string[];
}

export interface IRefreshToken {
    userId: number;
}
