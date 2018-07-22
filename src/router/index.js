import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from 'views/back/layout/layout';
const _import = require('./_import_' + process.env.NODE_ENV);
// const error404 = _import('error-page');
// 后台
const Login = _import('back/login/index');
const dashboard = _import('back/dashboard/index');
// 前台
const article = _import('front/article/index');
const articleDetail = _import('front/article/detail');

Vue.use(VueRouter);

const constantRouterMap = [{
    path: '/',
    redirect: '/articles',
    hidden: true
}, {
    path: '/login',
    component: Login,
    hidden: true
}, {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard.dashboardTitle',
    hidden: true,
    children: [{
        path: 'dashboard',
        component: dashboard
    }]
}, {
    path: '/articles',
    component: article,
    hidden: true
}, {
    path: '/articles/:id',
    component: articleDetail,
    hidden: true
}
    // , {
    //     path: '/error404',
    //     component: error404,
    //     hidden: true
    // }
];

const asyncRouterMap = [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // name: 'dashboard.dashboardTitle',
    icon: 'yonghu',
    children: [
        { path: 'index', component: dashboard, name: 'yonghu', icon: 'mima' }
    ]
}];
const router = new VueRouter({
    routes: constantRouterMap,
    scrollBehavior() {
        return { y: 0 };
    }
});

export {
    constantRouterMap,
    asyncRouterMap
};
export default router;

