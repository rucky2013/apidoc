<style lang="sass" scoped>
.api-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 2017;
  visibility: hidden;
  background-color: transparent;
  overflow-y: auto;
  transition: visibility .5s ease,
              background-color .5s ease;

  > .center {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    opacity: 0;
    transition: top .5s ease, opacity .5s ease;
    padding: 20px;

    > header {
      border-bottom: 1px solid #ccc;
    }
    > footer {
      border-top: 1px solid #ccc;
    }
  }

  &.open {
    visibility: visible;
    background-color: rgba(0,0,0,.3);
    > .center {
      top: 10%;
      opacity: 1;
    }
  }
}
</style>
<template>
  <div class="api-modal" :class="{open: openModal}">
    <div class="center">
      <header><slot name="head"></slot></header>
      <main><slot name="body"></slot></main>
      <footer><slot name="tail"></slot></footer>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      openModal:{
        type:Boolean,
        default: false
      }
    }
  }
</script>
