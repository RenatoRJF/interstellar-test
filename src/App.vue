<template>
  <div id="app">
    <AppMap />
  </div>
</template>

<script>
import AppMap from '@/components/AppMap.vue';

export default {
  name: 'app',
  components: {
    AppMap,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
