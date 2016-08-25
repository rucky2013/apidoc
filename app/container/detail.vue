<template>
  <div class="api-detail">
    <h3>{{listItem.title}}  ({{moduleTitle}})</h3>
    <h4>简要描述：</h4>
    <div class="pd">
        <p class="desc">{{listItem.description}}</p>
    </div>
    <h4>请求URL：</h4>
    <div class="pd">
        <code class="url">{{listItem.url}}</code>
    </div>
    <h4>请求方式：</h4>
    <div class="pd">
        <p class="req" v-if="listItem.method == 1">GET</p>
        <p class="req" v-if="listItem.method == 2">POST</p>
    </div>
    <h4>参数：</h4>
    <div class="pd">
        <div class="params-json">
        </div>
    </div>
    <h4>返回示例：</h4>
    <div class="pd">
        <div class="res-json">
        </div>
    </div>
    <h4>备注：</h4>
    <div class="pd">
        <p class="remark">{{listItem.remark}}</p>
    </div>
    <div>
        <!-- <p class="edit text-right"><a href="javascript:;" @click="toEdit" class="btn btn-primary">编辑</a></p> -->
    </div>
  </div>
</template>
<script>
  import {
    getApiDetail
  } from  'vuex_path/action';

  export default {
    vuex:{
      getters:{
        listItem: ({detail}) => detail.apiDetail,
        navModuleMapObj: ({index}) => index.navModuleMapObj
      },
      actions:{
        getApiDetail
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
      listItem: function(n, o){
        this.syntaxHighlight()
      }
    },
    ready(){
      this.getApiDetail(this.$route.params.apiId);
    },
    methods:{
      syntaxHighlight(){
        var brush = new SyntaxHighlighter.brushes.JScript(),
        result, params, res_html, params_html;
        brush.init({ toolbar: false });
        res_html = brush.getHtml(this.listItem.result);
        params_html = brush.getHtml(this.listItem.params);
        result = document.createElement('pre');
        params = document.createElement('pre');
        result.innerHTML = res_html;
        params.innerHTML = params_html;
        document.getElementsByClassName('res-json')[0].appendChild(result)
        document.getElementsByClassName('params-json')[0].appendChild(params)
    }
    }
  }
</script>
