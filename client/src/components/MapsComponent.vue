<script setup>
import { Location } from "@/models/CreatorEvent";


const props = defineProps({
  location: { type: Location, required: true }
})

const coords = [43.611083923930316, -116.26711168151908]
const position = {
  lat: coords[0],
  lng: coords[1]
}


</script>


<template>
  <div>
    <div>
      <gmp-map :center="location.position" :zoom="13" map-id="DEMO_MAP_ID">
        <gmp-advanced-marker :position="location.position" title="My location"></gmp-advanced-marker>
      </gmp-map>

    </div>
  </div>
</template>


<style lang="scss" scoped>
gmp-map {
  height: 40dvh;

}
</style>
