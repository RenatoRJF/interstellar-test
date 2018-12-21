<template>
  <div id="app">
    <AppMap
      :api-key="mapProps.apiKey"
      :center="mapProps.center"
      @polygon-click="polygonClick"
      @map-click="mapClick">
    </AppMap>

    <DistrictDetails :details="districtDetails"></DistrictDetails>
  </div>
</template>

<script>
import AppMap from '@/components/AppMap.vue';
import DistrictDetails from '@/components/DistrictDetails.vue';

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
    AppMap,
    DistrictDetails,
  },
  methods: {
    ...mapActions(['setDistrictDetails']),
    ...mapMutations(['HIDE_POPUP']),
    polygonClick(e) {
      this.setDistrictDetails({ data: e.properties });
    },
    mapClick() {
      this.HIDE_POPUP({ show: false });
    },
  },
  computed: {
    ...mapState([
      'mapProps',
      'districtDetails',
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
