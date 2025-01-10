<script setup>
import { AppState } from "@/AppState";
import MapsComponent from "@/components/MapsComponent.vue";
import { creatorEventsService } from "@/services/CreatorEventsService";
import { groupsService } from "@/services/GroupsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const events = computed(() => AppState.creatorEvents)

const creatorEventData = ref({
  title: '',
  description: '',
  groupId: '',
  startDate: '',
  location: {
    coordinates: ['', '']
  }
})

watch(route, () => {
  getGroupById()
  getEventsByGroupId()
}, { immediate: true })

async function createEvent() {
  try {
    // @ts-ignore
    creatorEventData.value.groupId = route.params.groupId
    // @ts-ignore
    creatorEventData.value.location.coordinates = creatorEventData.value.location.coordinates.map(str => parseFloat(str))
    const newEvent = await creatorEventsService.createEvent(creatorEventData.value)



    creatorEventData.value.title = '',
      creatorEventData.value.description = '',
      creatorEventData.value.groupId = '',
      creatorEventData.value.startDate = '',
      creatorEventData.value.location = {
        coordinates: ['', '']
      }

  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

async function getEventsByGroupId() {
  try {
    const groupId = route.params.groupId
    console.log(groupId)
    await creatorEventsService.getEventsByGroupId(groupId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

async function getGroupById() {
  try {
    const groupId = route.params.groupId;
    await groupsService.getGroupById(groupId);
  } catch (error) {
    Pop.meow(error);
    logger.error("[GETTING GROUP BY ID]", error);
  }
}



</script>


<template>
  <div class="text-light bg-warning big-box">
    <section class="row bg-box p-3">
      <div class="col-md-3">
        <div class=" left px-3 py-2">
          <form @submit.prevent="createEvent()" class="text-center">
            <h4>Create an Event</h4>
            <div class="mb-2">
              <input v-model="creatorEventData.title" type="text" placeholder="Event Title..." id="title" name="title"
                class="form-control" maxlength="20">
            </div>
            <div class="input-group mb-2 d-flex align-items-center">
              <label for="startDate">Start Date</label>
              <input v-model="creatorEventData.startDate" type="date" class="form-control ms-2" name="startDate"
                id="startDate" required>
            </div>
            <div class="mb-2">
              <textarea v-model="creatorEventData.description" id="description" name="description" class="form-control"
                rows="5" maxlength="2000" placeholder="Event Description..."></textarea>
            </div>
            <div class="d-flex">
              <input v-model="creatorEventData.location.coordinates[0]" type="text" class="form-control me-1"
                placeholder="Lat..." step="0.0000000000001" name="latitude">
              <input v-model="creatorEventData.location.coordinates[1]" type="text" class="form-control"
                placeholder="Long..." name="longitude">
            </div>
            <div>
              <button class="btn btn-success mt-2" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-8">
        <section class="row text-center justify-content-center mx-0">
          <h3>Group Events</h3>
          <div class="col-md-10">
            <section class="row justify-content-center">
              <div v-for="event in events" :key="event.id" class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <div>
                      <MapsComponent :location="event.location" />
                    </div>
                    <div>
                      <h5>{{ event.title }}</h5>
                      <p>Event starts at {{ event.startDate.toLocaleDateString() }}</p>
                      <p>{{ event.description }}</p>
                      <a href="#">
                        <p>Get Directions</p>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
              <!-- <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <div>
                  <MapsComponent />
                </div>
                <div>
                  <h5>Event Title</h5>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum quidem odio assumenda placeat, ab
                    sunt excepturi magni nobis voluptatum perferendis.</p>
                  <a href="#">
                    <p>Get Directions</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <div>
                  <MapsComponent />
                  <h5>Event Title</h5>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum quidem odio assumenda placeat, ab
                    sunt excepturi magni nobis voluptatum perferendis.</p>
                  <a href="#">
                    <p>Get Directions</p>
                  </a>
                </div>
              </div>
            </div>
          </div> -->
            </section>
          </div>
        </section>
      </div>
    </section>

    <!-- <MapsComponent /> -->
  </div>
</template>


<style lang="scss" scoped>
.big-box {
  width: 100%;
  min-height: 94dvh;
}

.left {
  min-height: 41dvh;
}
</style>