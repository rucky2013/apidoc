const state = {
  apiList:[]
};

const mutations = {
  SET_API_LIST(state, list){
    state.apiList = list;
  }
};

export default {
  state,
  mutations
}
