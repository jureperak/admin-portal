const TOKEN = "TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export function useToken() {
    let token: string | null = null;
    let refreshToken: string | null = null;

    const localToken = localStorage.getItem(TOKEN);
    if (localToken !== null) {
        token = JSON.parse(localToken);
    }

    const localRefreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (localRefreshToken !== null) {
        refreshToken = JSON.parse(localRefreshToken);
    }

    function setTokens(newToken: string, newRefreshToken: string) {
        const rawTokenValue = JSON.stringify(newToken);
        localStorage.setItem(TOKEN, rawTokenValue);

        const rawRefreshTokenValue = JSON.stringify(newRefreshToken);
        localStorage.setItem(REFRESH_TOKEN, rawRefreshTokenValue);
    }

    function removeTokens() {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }

    return { token, refreshToken, setTokens, removeTokens };
}
