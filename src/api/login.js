import axios from 'utils/axios';

export async function loginByUsername(username, password) {
    const data = {
        username, password
    };
    return await axios({
        url: '/login/loginbyun',
        method: 'post',
        data
    });
}

export async function getUserInfo() {
    return await axios({
        url: '/user/info'
    });
}

export async function refreshToken() {
    return await axios({
        url: 'v1/auth/token'
    });
}
