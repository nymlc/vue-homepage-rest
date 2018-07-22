import router from 'router';
// 引入Vuex
import store from 'store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { getToken } from 'utils/auth';
import { getUserInfo } from 'api/login';

// 未登录下不重定向的白名单
const whiteList = ['/login', '/article', '/article_detail'];
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    if (getToken()) {
        // 若是进入login界面，则直接跳转主页
        if (to.path === '/login') {
            next({
                path: '/'
            });
        } else {
            // 未拉取用户信息
            if (!store.getters.roles.length) {
                const userInfo = await getUserInfo(store.getters.token);
                store.dispatch('GetInfo', userInfo.data);

                const { role } = userInfo.data;
                store.dispatch('GenerateRoutes', { role }).then(() => { // 生成可访问的路由表
                    router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                    next({ ...to }); // hack方法 确保addRoutes已完成
                });
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next();
            // next({
            //     path: '/login'
            // });
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});
