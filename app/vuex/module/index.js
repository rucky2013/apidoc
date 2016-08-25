const state = {
  navs:[],
  activeNavIndex: 0,
  navModuleMapObj:{}
};

const mutations = {
  SET_NAV_LIST(state, navs){
    state.navs = navs;
  },
  SET_NAV_ACTIVE(state, index){
    state.activeNavIndex = index;
  },
  SET_NAV_MODULE_MAP(state, obj){
    state.navModuleMapObj = obj;
  }
};

export default {
  state,
  mutations
}
