import Cookies from 'js-cookie';

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        }
    },
    mutations: {
        TOOGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1);
            } else {
                Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        }
    },
    actions: {
        ToggleSideBar({ commit }) {
            commit('TOOGLE_SIDEBAR');
        }
    }
};
export default app;
