import { Config } from "../../config/Config";
import axios from "axios";
import { decrypt, encodeB64, encrypt } from "../util/Encrypter";
import { enc } from 'crypto-js';
import { jwtDecode } from "jwt-decode";

class Auth {
    static baseUrl = Config.baseUrl;
    static path = '/auth';


    static async login(username, password) {
        // Simulating login request

        var data = encodeB64(`${username}:${password}`);
        var iv = '';
        var response = [];


        console.log(encrypt(data, iv));
        var payload = { credentials: encrypt(data, iv) };
        await axios.post(this.baseUrl + this.path, payload, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {

                    localStorage.setItem('accessToken', res.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.accessToken);
                    // response.push(res.status);
                    // response.push(res.data);


                    response = [res.status, res.data];
                }

                else
                    throw new Error('Invalid username or password')

            }).catch((error) => {
                // console.log(error);
                // throw new Error('error');

                if (error.response) {
                    // The server responded with a status code
                    throw new Error(error.response.status)
                    // console.log('Response status:', error.response.status);
                    // console.log('Response data:', error.response.data);
                } else if (error.request) {
                    throw new Error(error.request)
                    // No response was received
                    // console.log('No response received:', error.request);
                } else {
                    // Other errors
                    throw new Error(error)
                    // console.log('Error:', error.message);
                }


            });

        return response;

    }

    static logout() {
        // Clear user from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

    }

    static getUser() {
        // Retrieve user from local storage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    static isLoggedIn() {
        // Check if user is logged in
        return !!localStorage.getItem('user');
    }

    static getAccessToken() {
        // Retrieve user from local storage
        const accessToken = localStorage.getItem('accessToken');
        return accessToken;
        // return accessToken ? JSON.parse(accessToken) : null;
    }

    static getRefreshToken() {
        // Retrieve user from local storage
        const refreshToken = localStorage.getItem('refreshToken');
        return refreshToken;
        // return refreshToken ? JSON.parse(refreshToken) : null;
    }

    static getSession() {
        var token = this.getAccessToken();
        return token ? jwtDecode(token) : null;
    }
}

export default Auth;
