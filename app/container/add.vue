<template>
  <div class="api-detail-edit">
    <h3>
      <div class="form-inline">
        <input type="text" class="form-control" placeholder="请输入接口名称" v-model="listItem.title" />({{moduleTitle}})
      </div>
    </h3>
    <h4>简要描述：</h4>
    <div class="pd">
      <div class="input-box">
        <textarea class="form-control" rows="3" placeholder="接口简介" v-model="listItem.description"></textarea>
      </div>
    </div>
    <h4>请求URL：</h4>
    <div class="pd">
      <div class="input-box" :class="{'has-warning': validation.url}">
        <input class="form-control" placeholder="请输入url" v-model="listItem.url" />
      </div>
    </div>
    <h4>请求方式：</h4>
    <div class="pd">
      <div class="input-box" :class="{'has-warning': validation.method}">
        <label class="radio-inline">
          <input type="radio" name="method" :value="1" v-model="listItem.method" /> GET
        </label>
        <label class="radio-inline">
          <input type="radio" name="method" :value="2" v-model="listItem.method" /> POST
        </label>
      </div>
    </div>
    <h4>参数：</h4>
    <div class="pd">
      <div class="input-box" :class="{'has-warning': validation.params}">
        <textarea class="form-control" rows="2" v-model="listItem.params" placeholder="JSON格式(建议在IDE中编辑好格式复制到文本框)"></textarea>
      </div>
    </div>
    <h4>返回示例：</h4>
    <div class="pd">
      <div class="input-box" :class="{'has-warning': validation.result}">
        <textarea class="form-control" rows="6" v-model="listItem.result" placeholder="JSON格式(建议在IDE中编辑好格式复制到文本框)"></textarea>
      </div>
    </div>
    <h4>备注：</h4>
    <div class="pd">
      <div class="input-box">
        <textarea v-model="listItem.remark" class="form-control" rows="2"></textarea>
      </div>
    </div>
    <div class="input-box text-right" style="margin: 20px 0 100px;">
      <a href="javascript:;" @click="saveApi" class="btn btn-success" style="padding: 10px 100px;">保存</a>
    </div>
  </div>
</template>
<script>
  import {
    getApiDetail,
    saveApiDetail
  } from  'vuex_path/action';

  export default {
    data(){
      return {
        validation:{
          title:false,
          url:false,
          method: false,
          params:false,
          result:false
        },
        validateLabel:{
          title:'接口名称',
          url:'请求URL',
          method: '请求方法',
          params:'请求参数',
          result:'返回示例'
        },
        validateRes:{
          msg:''
        },
        listItem:{
          title:'',
          description:'',
          url:'',
          method: null,
          params: '',
          result: '',
          remark: '',
          module_id: null
        }
      }
    },
    vuex:{
      getters: {
        navModuleMapObj: ({index}) => index.navModuleMapObj
      },
      actions:{
        getApiDetail,
        saveApiDetail
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
    ready(){
      this.getApiDetail(this.$route.params.apiId)
      this.listItem.module_id = this.routeModuleId;
    },
    methods:{
      validate(){
        this.validateRes.msg = '';
        for(var key in this.validation){
          this.validation[key] = !this.listItem[key];
          if(this.validation[key]){
            if(!this.validateRes.msg) this.validateRes.msg = this.validateLabel[key];
            return false;
          }
        }
        return true;
      },
      saveApi(){
        if(!this.validate()){
          return false;
        }
        this.saveApiDetail(this.listItem, this.$router);
      }
    }
  }
</script>
