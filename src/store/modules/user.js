import { getToken, removeToken, setToken } from 'utils/auth';

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 登录
        Login({ commit }, data) {
            const { token } = data;
            setToken(token);
            commit('SET_TOKEN', token);
        },

        // 获取用户信息
        GetInfo({ commit }, data) {
            const { role, name, avatar } = data;
            commit('SET_ROLES', role);
            commit('SET_NAME', name);
            commit('SET_AVATAR', avatar);
        },

        // 登出
        LogOut({ commit }) {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
        },

        // 前端 登出
        FedLogOut({ commit }) {
            commit('SET_TOKEN', '');
            removeToken();
        }
    }
};

export default user;
