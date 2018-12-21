<template>
  <div id="app">
    <AppMap
      :api-key="mapProps.apiKey"
      :center="mapProps.center"
      @polygon-click="polygonClick">
    </AppMap>
  </div>
</template>

<script>
import AppMap from '@/components/AppMap.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    AppMap,
  },
  methods: {
    polygonClick(e) {
      console.log(e.properties);
    },
  },
  computed: {
    ...mapState([
      'mapProps',
    ]),
  },
};
</script>

<style lang="scss">
body, html {
  font-size: 1em;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
