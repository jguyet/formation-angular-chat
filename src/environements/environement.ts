
export const environement = {
    production: false,
    formationApi: "http://localhost:8080",
    oauth2: {
        scope: 'profile email',
        requireHttps: false,
        tokenEndpoint: `http://localhost:8080/token`
    }
};