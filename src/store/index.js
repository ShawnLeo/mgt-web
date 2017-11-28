import Vue from 'vue';
import Vuex from 'vuex';
import myapp from './app';
import {app} from 'adm-portal';

Vue.use(Vuex);
app.state.system = '报表平台';

const store = new Vuex.Store({
  modules: {
    app: app,
    myapp: myapp
  }
});

export default store;
