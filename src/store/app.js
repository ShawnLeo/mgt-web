// import Cookies from 'js-cookie';
// import {getStore, setStore} from '../utils/storage';
import {utils} from 'adm-portal';
import iView from 'iview';

const app = {
  state: {
    sidebar: {
      opened: !+utils.getStore('sidebarStatus'),
      minOpen: false // 小屏时菜单状态
    },
    router: {
      currentPageName: 'index'
    },
    lang: {
      icon: '#icon-zhongguo',
      type: 'CN'
    },
    searchState: {
      show: false,
      params: ''
    },
    menuTabs: [{
      title: '首页',
      path: '/index'
    }],
    menuTabarWidth: null,
    menuFirsClick: true,
    system: '基础平台'
  },
  mutations: {
    /**
     * 菜单的缩展
     */
    TOGGLE_SIDEBAR: state => {
      let winWidth = document.documentElement.clientWidth;
      if (winWidth <= 600) {
        state.sidebar.minOpen = !state.sidebar.minOpen;
        state.sidebar.opened = false;
        utils.setStore('sidebarStatus', 0);
        return;
      } else {
        if (state.sidebar.opened) {
          utils.setStore('sidebarStatus', 1);
        } else {
          utils.setStore('sidebarStatus', 0);
        }
        state.sidebar.opened = !state.sidebar.opened;
      }
    },
    CLOSE_SLIDEBAR: state => {
      utils.setStore('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.minOpen = false;
    },
    OPEN_SLIDEBAR: state => {
      utils.setStore('sidebarStatus', 1);
      state.sidebar.opened = true;
    },
    /**
     * 面包屑
     */
    GET_CURRENT_PAGE_NAME: (state, payload) => {
      state.router.currentPageName = payload;
    },
    /**
     * 设置语言
     */
    SET_LANG: (state, payload) => {
      state.lang = payload;
      utils.setStore('lang', payload);
    },
    /**
     * 搜索过滤
     */
    SEARCH_FILTER: (state, payload) => {
      if (!payload.params.meta.search) { // 路由元信息设置是否有搜索模块
        iView.Message.error('该页不提供搜索!');
        return;
      } else {
        Object.assign(state.searchState, {show: !state.searchState.show}, payload);
      }
    },
    INIT_TAB: (state) => {
      state.menuTabs = utils.getStore('menuTabs') ? JSON.parse(utils.getStore('menuTabs')) : state.menuTabs;
    },
    ADD_TAB: (state, payload) => {
      if (!payload.meta.title) {
        return;
      }
      let router = {
        title: payload.meta.title,
        path: payload.path,
        query: payload.query
      };
      state.menuTabs.push(router);
      utils.setStore('menuTabs', JSON.stringify(state.menuTabs));
    },
    REMOVE_TAB: (state, index) => {
      state.menuTabs.splice(index, 1);
      utils.setStore('menuTabs', JSON.stringify(state.menuTabs));
    },
    SET_MENU_TAB_WIDTH: (state, w) => {
      state.menuTabarWidth = w;
    },
    CLOSE_ALL_OPENED_TAB: (state) => {
      state.menuTabs = state.menuTabs.filter((item) => {
        return item.path === '/index';
      });
      utils.setStore('menuTabs', JSON.stringify(state.menuTabs));
    },
    CLOSE_OTHER_TAB: (state, curpath) => {
      state.menuTabs = state.menuTabs.filter((item) => {
        return (item.path === '/index') || (item.path === curpath);
      });
      utils.setStore('menuTabs', JSON.stringify(state.menuTabs));
    }
  },
  actions: {
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR');
    },
    getCurrentPageName: ({commit}, payload) => {
      commit('GET_CURRENT_PAGE_NAME', payload);
    },
    setLang: ({commit}, payload) => {
      commit('SET_LANG', payload);
    },
    searchFilter: ({commit}, payload) => {
      commit('SEARCH_FILTER', payload);
    },
    // tabMenu相关操作
    initTab: ({commit, state}) => {
      commit('INIT_TAB');
    },
    addTab: ({commit, state}, router) => {
      commit('INIT_TAB');
      document.title = router.meta.title;
      let pathIndex = state.menuTabs.findIndex((n, index) => {
        if (!n) {
          return false;
        }
        if (n.path === router.path && JSON.stringify(n.query) !== JSON.stringify(router.query)) { // 动态带参数路由
          commit('REMOVE_TAB', index);
          return false;
        }
        return n.path === router.path;
      });
      if (pathIndex === -1) {
        commit('ADD_TAB', router);
      }
    },
    removeTab: ({commit, state}, index) => {
      if (state.menuTabs.length > 1) {
        commit('REMOVE_TAB', index);
        // bus.$emit('delete-slide');
      }
    },
    removeOtherTab: ({commit}, curpath) => {
      commit('CLOSE_OTHER_TAB', curpath);
    },
    removeAllTab: ({commit}) => {
      commit('CLOSE_ALL_OPENED_TAB');
    },
    setMenuTabWidth: ({commit}, w) => {
      commit('SET_MENU_TAB_WIDTH', w);
    }
  }
};

export default app;
