<template>
  <div id="app">
    <header-nav></header-nav>
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import headerNav from '@/components/header-nav'

export default {
  name: 'app',
  components:{
    headerNav
  }
}
</script>

<style>
.v-enter{
    opacity: 0;
    -webkit-transform: translateX(100px);
}
.v-enter-to{
    opacity: 1;
    -webkit-transform: translateX(0px);
}
.v-enter-active{
    -webkit-transition: 0.3s ease-out;
}
.v-leave{
    opacity: 1;
    -webkit-transform: translateX(0px);
}
.v-leave-to{
    opacity: 0;
    -webkit-transform: translateX(-100px);
}
.v-leave-active{
    transition: 0.3s ease-out;
}
</style>
