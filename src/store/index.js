import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import permission from './modules/permission';
import user from './modules/user';
import app from './modules/app';
import article from './modules/article';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
    modules: {
        permission,
        user,
        app,
        article
    },
    getters,
    strict: debug
});
export default store;
