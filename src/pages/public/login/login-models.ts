export type LoginFormModel = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    refreshToken: string;
};
