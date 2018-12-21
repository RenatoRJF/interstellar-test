<template>
  <div id="map"></div>
</template>

<script>
/* global google */

export default {
  name: 'AppMap',
  props: {
    center: {
      type: Object,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    zoom: {
      type: Number,
      default: 10.5,
    },
    mapTypeId: {
      type: String,
      default: 'terrain',
    },
  },
  methods: {
    initMap() {
      this.mapInstance = new google.maps.Map(this.$el, {
        zoom: this.zoom,
        center: this.center,
        mapTypeId: this.mapTypeId,
      });
    },
    checkMapInstance(cb) {
      if (this.mapInstance) {
        cb();
      } else {
        setTimeout(() => this.checkMapInstance(cb), 100);
      }
    },
  },
  beforeMount() {
    window.initMap = this.initMap;

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`;

    document.body.appendChild(script);
  },
  mounted() {
    this.checkMapInstance(() => console.log('call data for map here'));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
