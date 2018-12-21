<template>
  <div class="district-details" v-if="showPopup" :style="style">
    <img class="globe" :src="globeIcon" alt="globe" />

    <div class="content">
      <h1 class="title">{{details.name}}</h1>

      <ul class="properties">
        <li><strong>Area:</strong> {{ details.area }} km²</li>
        <li><strong>Perimeter:</strong> {{ details.perimeter }} km</li>
        <li><strong>Population:</strong> {{ details.population }} hab.</li>
        <li><strong>Average age:</strong> {{ details.averageAge }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import globeIcon from '@/assets/globe.png';
import { mapState } from 'vuex';

export default {
  name: 'DistrictDetails',
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['showPopup']),
    style() {
      return { borderTopColor: this.details.superficieColor };
    },
    globeIcon() {
      return globeIcon;
    },
  },
};
</script>

<style scoped lang="scss">
.district-details {
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  width: 360px;
  top: 80px;
  left: calc(50% - 180px);
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  border-top: 5px solid;
  padding: 10px;

  .title {
    font-weight: 400;
    font-size: 1em;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: rgb(251, 251, 51);
    letter-spacing: 1.11px;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    padding-bottom: 5px;
  }

  .content {
    background-color: rgba(0,0,0,0.3);
    padding: 10px 15px;

    .properties li {
      font-weight: normal;
      font-size: 12px;
      display: block;
      line-height: 18px;
      letter-spacing: 1.11px;
      color: #f1f1f1;

      span strong {
        color: #fff;
        text-transform: capitalize
      }
    }
  }

  .globe {
    position: absolute;
    bottom: 20px;
    background: #f1f1f1;
    border-radius: 50%;
    padding: 3px;
    right: 25px;
    opacity: .4;
  }
}

@media screen and (max-width: 480px) {

  .district-details {
    width: 310px;
    left: calc(50% - 155px);
  }

}
</style>
