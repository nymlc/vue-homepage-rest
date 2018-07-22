import { constantRouterMap, asyncRouterMap } from 'router';
import { deepClone } from 'utils';

function hasPermission(router, roles) {
    if (router.meta && router.meta.roles) {
        return roles.some(role => router.meta.roles.indexOf(role) >= 0);
    } else {
        return true;
    }
}

function filterAsyncRouters(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(router => {
        if (hasPermission(router, roles)) {
            if (router.children && router.children.length) {
                router.children = filterAsyncRouters(router.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessedRouters;
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS(state, routers) {
            state.routers = deepClone(constantRouterMap.concat(routers));
            state.addRouters = deepClone(routers);
        }
    },
    actions: {
        async GenerateRoutes({ commit }, data) {
            const { role } = data;
            let accessedRouters;
            // 若是admin用户，则匹配所有路由
            if (role.indexOf('admin')) {
                accessedRouters = asyncRouterMap;
            } else {
                accessedRouters = await filterAsyncRouters(asyncRouterMap, role);
            }
            commit('SET_ROUTERS', accessedRouters);
        }
    }
};
export default permission;
