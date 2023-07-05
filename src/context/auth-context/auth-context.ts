import { createContext } from "react";

type UserModel = {
    userId: number;
    username: string;
    displayName: string;
};

export type AuthenticationContextModel = {
    isAuthenticated: boolean;
    user?: UserModel;
};

const auth: AuthenticationContextModel = {
    isAuthenticated: false,
};

const defaultValue = {
    authentication: auth,
    setAuthentication: (_: AuthenticationContextModel) => {},
};

export const AuthContext = createContext(defaultValue);
