export default function(router){
  router.map({
    '/':{				//首页
      name:'index',
      component: require('./container/index.vue'),
      subRoutes:{
        '/:moduleId':{
          name:'list',
          component:require('./container/list.vue')
        },
        '/:moduleId/detail/:apiId':{
          name:'detail',
          component:require('./container/detail.vue')
        },
        '/:moduleId/edit/:apiId':{
          name:'edit',
          component:require('./container/edit.vue')
        },
        '/:moduleId/add/':{
          name:'add',
          component:require('./container/add.vue')
        }
      }
    }
  })
}
