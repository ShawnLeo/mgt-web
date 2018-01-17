import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Cookies from 'js-cookie';
import * as portal from 'adm-portal';

// import {LoadingBar} from 'iview';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    meta: {
      title: '首页 '
    },
    component: portal.layout,
    redirect: '/iframe?name=%E9%A6%96%E9%A1%B5&path=http%3A%2F%2Flocalhost%3A8080%2F#/index',
    children: [{
        path: '/iframe',
        meta: {
          title: 'iframe'
        },
        component: portal.iframe
    }]
  }, {
    path: '/index',
    meta: {
      title: '首页'
    },
    // component: index
    component: (resolve) => require(['../views/test.vue'], resolve)
  }, {
    path: '/login',
    name: 'login',
    // component: (resolve) => require(['../views/login.vue'], resolve)
    component: portal.login
  }, {
    path: '/404',
    name: '404',
    // component: (resolve) => require(['../views/404.vue'], resolve)
      component: portal._404
  }]
});
router.beforeEach((to, from, next) => {
  if (to.query.sessionId) { // 存入sessionId
    Cookies.set('sessionId', to.query.sessionId);
  }
  let sessionId = Cookies.get('sessionId');
  if (sessionId) { // 如果是登陆状态
    store.dispatch('addTab', to);
    to.path === '/login' ? next({path: '/index'}) : next();
  } else { // 不是登陆状态
    to.path !== '/login' ? next({path: '/login'}) : next();
  }
});

router.afterEach(() => {
  // LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
