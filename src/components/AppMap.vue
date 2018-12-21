<template>
  <div id="map"></div>
</template>

<script>
/* global google */

import { mapActions } from 'vuex';

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
  data() {
    return {
      mapInstance: null,
      averageColors: [
        { max: 40, color: '#00cb09' },
        { max: 42, color: '#a4cb00' },
        { max: 43, color: '#cb8a00' },
        { max: 45, color: '#cb4f00' },
        { max: 50, color: '#cb0026' },
      ],
    };
  },
  methods: {
    ...mapActions(['getDistrictsCoords']),
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
    // apply different colors to the polygons based on the average age of the district
    colorByAverageAge(averageAge) {
      const averageColor = this.averageColors.find(avColor => averageAge <= avColor.max);
      return averageColor ? averageColor.color : null;
    },
    // Set paths for each polygon
    createCoords(polygon) {
      return polygon.geometry.coordinates
        .reduce((coordsAcc, coordsCur) => coordsCur.map(coords => coords
          .reduce((pointsAcc, point) => [
            ...pointsAcc, new google.maps.LatLng(point[1], point[0]),
          ],
          []),
        []),
        []);
    },
    // Construct the polygon.
    createPolygon(paths, strokeColor, fillColor, strokeOpacity, fillOpacity, strokeWeight) {
      return new google.maps.Polygon({
        paths,
        strokeColor,
        fillColor,
        strokeOpacity,
        fillOpacity,
        strokeWeight,
      });
    },
  },
  beforeMount() {
    window.initMap = window.initMap || this.initMap;

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`;

    document.body.appendChild(script);
  },
  mounted() {
    this.checkMapInstance(() => {
      this.getDistrictsCoords().then(data => data.features.reduce((list, polygon) => {
        const paths = this.createCoords(polygon);
        const polygonColor = this.colorByAverageAge(polygon.properties.averageAge);
        const districtPolygon = this.createPolygon(paths, polygonColor, polygonColor, 0.8, 0.6, 1);

        districtPolygon.addListener('click', () => {
          const computeArea = google.maps.geometry.spherical
            .computeArea(districtPolygon.getPath());

          const computeLength = google.maps.geometry.spherical
            .computeLength(districtPolygon.getPath());

          districtPolygon.setOptions({ strokeColor: '#149dd2' });

          this.$emit('polygon-click', {
            properties: Object.assign({}, polygon.properties, {
              area: (computeArea / 1000).toFixed(2),
              perimeter: (computeLength / 1000).toFixed(2),
              superficieColor: polygonColor,
            }),
          });
        });

        google.maps.event.addListener(districtPolygon, 'mouseover', () => districtPolygon.setOptions({ fillOpacity: 0.8 }));

        google.maps.event.addListener(districtPolygon, 'mouseout', () => districtPolygon.setOptions({ fillOpacity: 0.6 }));

        districtPolygon.setMap(this.mapInstance);

        return list;
      }));
    });
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
