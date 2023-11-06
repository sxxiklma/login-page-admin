export class Config {
    static baseUrl = process.env.REACT_APP_BACKEND_URL;
    static apiKey = process.env.REACT_APP_SECRET_KEY;
    static timeout = 5000;

    static getBaseUrl() {
        return Config.baseUrl;
    }

    static getApiKey() {
        return Config.apiKey;
    }

    static getTimeout() {
        return Config.timeout;
    }
}