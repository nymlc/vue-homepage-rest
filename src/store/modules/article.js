const app = {
    state: {
        // 当前文章，用于文章列表跳转具体文章页
        currentArticle: {},
        // 用于存储具体文章页选中的标签
        selectedTag: {}
    },
    mutations: {
        SET_CURRENT_ARTICLE: (state, article) => {
            state.currentArticle = article;
        },
        SET_SELECTED_TAG: (state, tag) => {
            state.selectedTag = tag;
        }
    },
    actions: {
        SetCurrentArticle({ commit }, article) {
            commit('SET_CURRENT_ARTICLE', article);
        },
        SetSelectedTag({ commit }, tag) {
            commit('SET_SELECTED_TAG', tag);
        }
    }
};
export default app;
