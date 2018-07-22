const getters = {
    // app
    sidebar: state => state.app.sidebar,
    // 用户
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    // 权限
    addRouters: state => state.permission.addRouters,
    routers: state => state.permission.routers,
    permissionRouters: state => state.permission.routers,
    // 文章
    currentArticle: state => state.article.currentArticle,
    selectedTag: state => state.article.selectedTag
};
export default getters;
