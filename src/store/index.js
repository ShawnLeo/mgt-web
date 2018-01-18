import Vue from 'vue';
import Vuex from 'vuex';
import myapp from './app';
import {app} from 'adm-portal';
import {baseUrl, loginUrl} from '../util/env';

Vue.use(Vuex);
// adm-portal 请求服务与本系统保持一致，或可以自行指定访问地址
app.state.baseUrl = baseUrl;
app.state.loginUrl = loginUrl;
app.state.system = '基础平台';
const store = new Vuex.Store({
  modules: {
    app: app,
    myapp: myapp
  }
});

export default store;
