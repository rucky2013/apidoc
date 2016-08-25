import Vue from 'vue';
import VueResource from 'vue-resource';
import * as types from './mutation-types';
import api from './api';

Vue.use(VueResource);

export const setNavList = function({dispatch, state}){
  //获取nav
  Vue.http.post(api.navList, {}, (json) => {
    var obj = {};
    dispatch(types.SET_NAV_LIST, json)
    json.forEach((nav) => {
      if(nav.children){
        nav.children.forEach((item) => {
          obj[item.module_id] = item.name;
        })
      }
    });
    dispatch(types.SET_NAV_MODULE_MAP, obj);
  })
}

export const setNavActive = function({dispatch, state}, index){
  dispatch(types.SET_NAV_ACTIVE, index);
}

export const addProject = function({dispatch, state}, name){
  Vue.http.post(api.editProject, {
    name: name
  }, (json) => {
    if(json.success){
      //重新获取nav
      Vue.http.post(api.navList, {}, (json) => {
        var obj = {};
        dispatch(types.SET_NAV_LIST, json)
        json.forEach((nav) => {
          if(nav.children){
            nav.children.forEach((item) => {
              obj[item.module_id] = item.name;
            })
          }
        });
        dispatch(types.SET_NAV_MODULE_MAP, obj);
      })
    }
  })
}

export const deleteModule = function({dispatch, state}, id){
  Vue.http.post(api.deleteModule, {
    module_id: id
  }, (json) => {
    var obj = {};
    if(json.success){
      //重新获取nav
      Vue.http.post(api.navList, {}, (json) => {
        dispatch(types.SET_NAV_LIST, json);
        json.forEach((nav) => {
          if(nav.children){
            nav.children.forEach((item) => {
              obj[item.module_id] = item.name;
            })
          }
        });
        dispatch(types.SET_NAV_MODULE_MAP, obj);
      })
    }
  })
}

export const addModule = function({dispatch, state}, name, projectId){
  Vue.http.post(api.editModule, {
    name: name,
    project_id: projectId
  }, (json) => {
    var obj = {};
    if(json.success){
      //重新获取nav
      Vue.http.post(api.navList, {}, (json) => {
        dispatch(types.SET_NAV_LIST, json)
        json.forEach((nav) => {
          if(nav.children){
            nav.children.forEach((item) => {
              obj[item.module_id] = item.name;
            })
          }
        });
        dispatch(types.SET_NAV_MODULE_MAP, obj);
      })
    }
  })
}
export const editModule = function({dispatch, state}, name, moduleId){
  Vue.http.post(api.editModule, {
    name: name,
    module_id: moduleId
  }, (json) => {
    var obj = {};
    if(json.success){
      //重新获取nav
      Vue.http.post(api.navList, {}, (json) => {
        dispatch(types.SET_NAV_LIST, json);
        json.forEach((nav) => {
          if(nav.children){
            nav.children.forEach((item) => {
              obj[item.module_id] = item.name;
            })
          }
        });
        dispatch(types.SET_NAV_MODULE_MAP, obj);
      })
    }
  })
}


export const getApiList = function({dispatch, state}, moduleId){
  Vue.http.post(api.getApiList, {
    module_id: moduleId
  }, (json) => {
    dispatch(types.SET_API_LIST, json);
  })
}

export const getApiDetail = function({dispatch, state}, apiId){
  Vue.http.post(api.getApiDetail, {
    id: apiId
  }, (json) => {
    dispatch(types.SET_API_DETAIL, json[0])
  })
}

export const deleteApiDetail = function({dispatch, state}, apiId, moduleId){
  Vue.http.post(api.deleteApiDetail, {
    id: apiId
  }, (json) => {
    Vue.http.post(api.getApiList, {
      module_id: moduleId
    }, (json) => {
      dispatch(types.SET_API_LIST, json);
    })
  })
}

export const saveApiDetail = function({dispatch, state}, apiDetail, router, moduleId){
  Vue.http.post(api.saveApiDetail, apiDetail, (json) => {
    router.go({ name: 'list', params: { moduleId: apiDetail.module_id } });
  })
}
