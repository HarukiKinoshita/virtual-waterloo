<template>
  <section class="px-auto p-10">
    <NuxtLogo class="mx-auto py-4" />
    <h1 class="text-2xl text-center font-light">Virtual Waterloo</h1>
    <!-- <div class="flex flex-col items-center my-4">
      <a class="px-4 py-2 border rounded-full bg-white hover:bg-gray-50" href="#kingscross">King's Cross St. Pancras</a>
      <a class="px-4 py-2 border rounded-full bg-white hover:bg-gray-50" href="#victoria">Victoria</a>
    </div> -->
    <p class="text-xl font-semibold text-center mt-12 mb-4">King's Cross St. Pancras</p>
    <div v-for="(train, i) in data" :key="i" class="max-w-6xl mx-auto">
      <div class="py-3 grid grid-cols-4">
        <div>
          {{ new Date(train.expectedArrival).toLocaleTimeString() }}
        </div>
        <div>
          <span :class="`px-2 py-1 rounded ${getColour(train.lineName)}`">{{ train.lineName }}</span>
        </div>
        <div class="font-semibold">
          {{ train.towards }}
        </div>
        <!-- <div>
          {{ train.direction }}
        </div> -->
        <div>
          {{ train.platformName }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import NuxtLogo from '../components/NuxtLogo.vue'
// import Darwin from 'national-rail-darwin'
var Rail = require('national-rail-darwin-promises')

export default {
  components: {
    NuxtLogo
  },
  data() {
    return {
      lineColours: [
        { lineName: 'Circle', lineColour: 'bg-yellow-200' },
        { lineName: 'Victoria', lineColour: 'bg-blue-200' },
        { lineName: 'Northern', lineColour: 'bg-gray-800 text-white' },
        { lineName: 'Piccadilly', lineColour: 'bg-blue-800 text-white' },
        { lineName: 'Hammersmith & City', lineColour: 'bg-pink-200' },
        { lineName: 'Metropolitan', lineColour: 'bg-purple-800 text-white' },
      ]
    }
  },
  mounted() {
    // var rail = new Rail()
    // rail.getDepartureBoardWithDetails('WAT', {})
    // .then((result: any) => {
    //   console.log(result);
    //     // Do stuff 
    // })
    // .catch((error: any) => {
    //     // Handle errors
    // });
  },
  methods: {
    getColour(lineName) {
      const findIt = this.lineColours.find(el => el.lineName == lineName)
      return findIt ? findIt.lineColour : 'bg-gray-200'
    }
  },
  async asyncData({ $axios }) {
    const url = "https://api.tfl.gov.uk/StopPoint/940GZZLUKSX/Arrivals?api_key=" + process.env.LONDON_TUBE_API_KEY;
    const response = await $axios.$get(url)
    .catch( error => {
      console.log("response error", error)
      return false
    })
    return { data: response.sort((a,b) => {
      return a.expectedArrival < b.expectedArrival ? -1 : 1;
    }) }
  }
}
</script>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>