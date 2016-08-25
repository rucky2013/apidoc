<template>
  <div>
    <api-nav></api-nav>
    <router-view class="main"></router-view>
  </div>
</template>
<script>
  export default {
    components:{
      apiNav: require('../component/nav.vue')
    }
  }
</script>
