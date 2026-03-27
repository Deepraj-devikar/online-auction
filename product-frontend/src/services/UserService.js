import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3000/api/v1/users/`,
    timeout: 1000
});

export const LoginApi = async (data) => {
    return await instance.post(`login`, data);
};

export const SignUpApi = async (data) => {
    return await instance.post(`register`, data);
}