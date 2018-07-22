import { param2Obj } from 'utils';

const userMap = {
    pzpzpz: {
        role: ['admin'],
        token: 'pz',
        avatar: 'http://www.nymlc.com/assets/pz.jpg',
        name: 'pz'
    },
    ln: {
        role: ['guest'],
        token: 'ln',
        avatar: 'http://www.nymlc.com/assets/lc.jpg',
        name: 'ln'
    }
};

export default {
    loginByUsername(data) {
        const { username } = JSON.parse(data.body);
        let res = {};
        for (const key in userMap) {
            if (username.indexOf(key) !== -1) {
                res = userMap[key];
            }
        }
        return res;
    },
    getUserInfo: config => {
        const { token } = param2Obj(config.url);
        if (userMap[token]) {
            return userMap[token];
        } else {
            return userMap.pzpzpz;
        }
    }
};
