const state = {
  apiDetail:{}
};

const mutations = {
  SET_API_DETAIL(state, api){
    state.apiDetail = api;
  }
};

export default {
  state,
  mutations
}
