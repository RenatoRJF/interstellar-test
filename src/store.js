/* commit */

import Vue from 'vue';
import Vuex from 'vuex';
import GeoJSON from '@/mocks/frontend-geo.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapProps: {
      apiKey: 'AIzaSyCRDatgOJix9Oy2evqtU1UEMTvxAZz7ycI',
      center: { lat: 52.520008, lng: 13.404954 },
    },
    districtDetails: {},
    districtsCoords: [],
  },
  mutations: {
    GET_DISTRICT_COORDS: (state, payload) => {
      Object.assign(state, {
        ...state,
        districtsCoords: payload.data,
      });
    },
  },
  actions: {
    getDistrictsCoords: ({ commit }) => new Promise((resolve) => {
      setTimeout(() => {
        commit('GET_DISTRICT_COORDS', { data: GeoJSON });
        resolve(GeoJSON);
      }, 1000);
    }),
  },
});
