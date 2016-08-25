<template>
  <div class="api-list">
    <h3>{{moduleTitle}}</h3>
    <ul class="list">
        <li v-for="item in apiList">
            <div class="desc">
                <p>{{item.title}}</p>
            </div>
            <div class="url-wrap"><code>{{item.url}}</code></div>
            <div class="btn-wrap">
              <a href="javascript:;" class="btn btn-default" v-link="{ name: 'detail', params: { apiId: item.id } }">详情</a>
              <a href="javascript:;" class="btn btn-default" v-link="{ name: 'edit', params: { apiId: item.id, moduleId: item.module_id } }">编辑</a>
              <a href="javascript:;" class="btn btn-default" @click.stop="deleteApi(item.id, item.module_id)">删除</a>
            </div>
        </li>
    </ul>
    <div class="text-center"><a class="btn btn-default" style="padding: 5px 50px;" v-link="{ name: 'add', params: { moduleId: $route.params.moduleId } }">添加</a></div>
    </div>
</template>
<script>
  import {
    getApiList,
    deleteApiDetail
  } from  'vuex_path/action';

  export default {
    vuex:{
      getters:{
        apiList: ({list}) => list.apiList,
        navModuleMapObj: ({index}) => index.navModuleMapObj
      },
      actions:{
        getApiList,
        deleteApiDetail
      }
    },
    computed:{
      routeModuleId(){
        return this.$route.params.moduleId;
      },
      moduleTitle(){
        return this.navModuleMapObj[this.routeModuleId]
      }
    },
    watch:{
      routeModuleId(n, o){
        this.getApiList(n)
      }
    },
    ready(){
      this.getApiList(this.$route.params.moduleId);
    },
    methods:{
      deleteApi(apiId, moduleId){
        this.deleteApiDetail(apiId, moduleId);
      }
    }
  }
</script>
