import Vue from 'vue';
import Vuex from 'vuex';

import index from './module/index';
import list from './module/list';
import detail from './module/detail';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    index,
    list,
    detail
  }
});
