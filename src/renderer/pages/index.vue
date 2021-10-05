<template>
  <section class="px-auto bg-natural-lightest dark:bg-natural-darkest text-natural-darkest dark:text-natural-light">
    <!-- <NuxtLogo class="mx-auto py-4" /> -->
    <div class="sticky top-0 h-20 p-4 z-20 bg-natural-lightest dark:bg-natural-darkest">
      <h1 class="text-3xl font-serif text-center font-semibold">King's Cross St. Pancras</h1>
    </div>
    <!-- <div class="flex flex-col items-center my-4">
      <a class="px-4 py-2 border rounded-full bg-white hover:bg-gray-50" href="#kingscross">King's Cross St. Pancras</a>
      <a class="px-4 py-2 border rounded-full bg-white hover:bg-gray-50" href="#victoria">Victoria</a>
    </div> -->
    <div v-for="(train, i) in data" :key="i" class="max-w-6xl mx-auto font-mono">
      <div class="py-3 grid grid-cols-4">
        <div>
          {{ new Date(train.expectedArrival).toLocaleTimeString() }}
        </div>
        <div>
          <span :class="`px-2 py-1 rounded ${getColour(train.lineName)}`">{{ train.lineName }}</span>
        </div>
        <div class="font-semibold create-ticker">
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
        { lineName: 'Circle', lineColour: 'bg-yellow-200 text-black' },
        { lineName: 'Victoria', lineColour: 'bg-blue-200 text-black' },
        { lineName: 'Northern', lineColour: 'bg-gray-800 text-white' },
        { lineName: 'Piccadilly', lineColour: 'bg-blue-800 text-white' },
        { lineName: 'Hammersmith & City', lineColour: 'bg-pink-200 text-black' },
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