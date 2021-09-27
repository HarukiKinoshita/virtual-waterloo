<template>
  <section class="bg-gray-100 px-auto p-10">
    <NuxtLogo class="mx-auto py-4" />
    <h1 class="text-2xl text-center font-light">Virtual Waterloo</h1>
    <div class="flex flex-col items-center my-4">
      <a class="px-4 py-2 border rounded-full bg-white hover:bg-gray-50" href="https://nuxtjs.org/ja/">Nuxt.js</a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import NuxtLogo from '../components/NuxtLogo.vue'

export default Vue.extend({
  components: {
    NuxtLogo
  }
})
</script>
