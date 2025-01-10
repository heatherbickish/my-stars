<script setup>
import { AppState } from "@/AppState";
import MapsComponent from "@/components/MapsComponent.vue";
import { creatorEventsService } from "@/services/CreatorEventsService";
import { groupsService } from "@/services/GroupsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const creatorEvents = computed(() => AppState.creatorEvents)
const account = computed(() => AppState.account)
const group = computed(() => AppState.activeGroup)

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
  creatorEventsService.clearEvents()
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

async function cancelEvent(eventId) {
  try {
    const yes = await Pop.confirm('Are you sure you want to cancel this event?', 'Yes I am sure!')
    if (!yes) return
    logger.log('canceling event', eventId)
    await creatorEventsService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}



</script>


<template>
  <div v-if="creatorEvents">
    <div class="text-light big-box">
      <section class="row bg-box p-3 mx-0">
        <div v-if="account" class="col-md-3">
          <div class=" left px-3 py-2">
            <form @submit.prevent="createEvent()" class="text-center">
              <h4>Create a Gathering</h4>
              <div class="mb-2">
                <input v-model="creatorEventData.title" type="text" placeholder="Event Title..." id="title" name="title"
                  class="form-control" maxlength="25">
              </div>
              <!-- <div class="input-group mb-2 d-flex align-items-center">
                <label for="startDate">Start Date</label>
                <input v-model="creatorEventData.startDate" type="date" class="form-control ms-2" name="startDate"
                  id="startDate" required>
              </div> -->
              <div class="mb-2">
                <textarea v-model="creatorEventData.description" id="description" name="description"
                  class="form-control" rows="5" maxlength="2000" placeholder="Event Description..."></textarea>
              </div>
              <div class="d-flex">
                <input v-model="creatorEventData.location.coordinates[0]" type="text" class="form-control me-1"
                  placeholder="Lat..." name="latitude">
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
            <em><span>{{ group?.name }}</span></em>
            <h3>Celestial Gatherings</h3>
            <div class="col-md-10">
              <section class="row justify-content-center">
                <div v-for="event in creatorEvents" :key="event.id" class="col-md-7">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <div class="dropdown text-end me-1 mb-2">
                          <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="mdi mdi-dots-horizontal text-danger fw-bold"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li><button @click="cancelEvent(event.id)" class="btn dropdown-item text-danger"
                                type="button">Cancel Gathering</button></li>
                          </ul>
                        </div>
                        <MapsComponent :location="event.location" />
                      </div>
                      <div>
                        <h5 class="mt-2">{{ event.title }}</h5>
                        <b v-if="event.isCanceled == true">
                          <h1 class="text-danger">--HAS BEEN CANCELED--</h1>
                        </b>
                        <!-- <p>Event starts at {{ event.startDate.toLocaleDateString() }}</p> -->
                        <div v-if="event.isCanceled == false">
                          <p>{{ event.description }}</p>
                          <a href="#">
                            <p>Get Directions</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </div>
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