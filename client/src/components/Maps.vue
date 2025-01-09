<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const map = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwCLDIAKLwX6ND-ePFOscwUzhJjUL9X54&callback=console.debug&libraries=maps,marker&v=beta"
const route = useRoute()
const editableMapData = ref({

})
</script>


<template>
  <div>
    <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="40.12150192260742,-100.45039367675781" title="My location"></gmp-advanced-marker>
    </gmp-map>
  </div>
  <div>
    <form>
      <div class="mb-3">
        <input type="text" name="" id="" class="form-control">
      </div class="mb-3">
      <div>
        <input type="text" name="" id="" class="form-control">
      </div>
      <div>
        <button class="btn btn-success text end">Find</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>
gmp-map {
  height: 100%;
}
</style>

<!DOCTYPE html>
<html>
  <head>
    <title>Simple Marker</title>
    <!-- The callback parameter is required, so we use console.debug as a noop -->
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwCLDIAKLwX6ND-ePFOscwUzhJjUL9X54&callback=console.debug&libraries=maps,marker&v=beta">
    </script>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      gmp-map {
        height: 100%;
      }

      /* Optional: Makes the sample page fill the window. */
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="40.12150192260742,-100.45039367675781" title="My location"></gmp-advanced-marker>
    </gmp-map>
  </body>
</html>
