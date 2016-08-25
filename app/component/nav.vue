<template>
  <div>
    <modal :open-modal="moduleModal.open" v-show="showModals">
      <h4 slot="head">模块</h4>
      <div class="form-inline" slot="body" class="edit-project">
        <div class="form-group" style="margin: 20px;">
          <label>模块名称：</label>
          <input type="text" class="form-control project-name" v-model="moduleModal.value" />
        </div>
        <div class="form-inline text-right" style="margin: 0 20px 10px;">
          <button type="button" class="btn btn-default" @click.stop="saveModule">确定</button>
          <button type="button" class="btn btn-default" @click.stop="moduleModal.open = false">取消</button>
        </div>
      </div>
    </modal>
    <modal :open-modal="projectModal.open" v-show="showModals">
      <h4 slot="head">项目</h4>
      <div class="form-inline" slot="body" class="edit-project">
        <div class="form-group" style="margin: 20px;">
          <label>项目名称：</label>
          <input type="text" class="form-control project-name" v-model="projectModal.value" />
        </div>
        <div class="form-inline text-right" style="margin: 0 20px 10px;">
          <button type="button" class="btn btn-default" @click.stop="saveProject">确定</button>
          <button type="button" class="btn btn-default" @click.stop="projectModal.open = false">取消</button>
        </div>
      </div>
    </modal>
    <div class="api-side-nav">
      <ul class="nav nav-list bs-docs-sidenav">
        <li v-for="nav in navs" :class="{active:activeNavIndex === $index}">
          <a href="javascript:;" :project_id="nav.project_id" @click="selectNav($index)">{{nav.name}}</a>
          <ul v-if="nav.children" class="child-ul nav-list" :class="{open:activeNavIndex === $index}">
            <li v-for="c in nav.children">
              <a :module_id="c.module_id" v-link="{ name: 'list', params: { moduleId: c.module_id }}">{{c.name}}<i class="edit" @click.stop="openEditModuleModal(c.name, c.module_id)">&equiv;</i><i class="del" @click.stop="deleteModule(c.module_id)">&times;</i></a>
            </li>
            <li><a href="javascript:;" class="module-add" @click.stop="openAddModuleModal(nav.project_id)">添加模块</a></li>
          </ul>
        </li>
        <li><a href="javascript:;" class="project-add" @click.stop="openAddProjectModal">新建项目</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {
    setNavActive,
    setNavList,
    deleteModule,
    addModule,
    editModule,
    addProject
  } from  'vuex_path/action';

  export default {
    data(){
      return {
        showModals:false,
        moduleModal: {
          open: false,
          value:'',
          id:null,
          type:''
        },
        projectModal: {
          open: false,
          value:'',
          id:null,
          type:''
        }
      }
    },
    vuex:{
      getters:{
        navs: ({index}) => index.navs,
        activeNavIndex: ({index}) => index.activeNavIndex
      },
      actions:{
        setNavActive,
        setNavList,
        deleteModule,
        addModule,
        editModule,
        addProject
      }
    },
    methods:{
      selectNav(index){
        this.setNavActive(index);
      },
      openAddProjectModal(){
        this.projectModal = {
          open: true,
          value:'',
          id:null,
          type:'add'
        }
      },
      saveProject(){
        if(this.projectModal.type === 'add'){
          this.addProject(this.projectModal.value);
        }else if(this.projectModal.type === 'edit'){

        }
        this.projectModal = {
          open: false,
          value:'',
          id:null,
          type:''
        }
      },
      openEditModuleModal(name, moduleId){
        this.moduleModal = {
          open: true,
          id: moduleId,
          value: name,
          type:'edit'
        }
      },
      openAddModuleModal(projectId){
        this.moduleModal = {
          open: true,
          id: projectId,
          value:'',
          type:'add'
        }
      },
      saveModule(){
        if(this.moduleModal.type === 'add'){
          this.addModule(this.moduleModal.value, this.moduleModal.id);
        }else if(this.moduleModal.type === 'edit'){
          this.editModule(this.moduleModal.value, this.moduleModal.id);
        }
        this.moduleModal = {
          open: false,
          value:'',
          id:null,
          type:''
        }
      },
      deleteModule(moduleId){
        this.deleteModule(moduleId);
      }
    },
    created(){
      this.setNavList()
    },
    ready(){
      setTimeout(() => {
        this.showModals = true;
      },1000)
    },
    components:{
      modal: require('./modal.vue')
    }
  }
</script>
