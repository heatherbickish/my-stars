<script setup>
import { AppState } from "@/AppState";
import { groupsService } from "@/services/GroupsService";
import { membersService } from "@/services/MembersService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";


const router = useRouter()
// const account = computed(() => AppState.account)
const editableGroupFormData = ref({
  name: '',
  description: '',
  coverImg: ''
})



async function createGroup() {
  try {

    const group = await groupsService.createGroup(editableGroupFormData.value)
    const memberData = { groupId: group.id };
    await membersService.createMember(memberData)
    editableGroupFormData.value = {
      name: '',
      description: '',
      coverImg: ''
    }
    router.push({ name: 'Group Details Page', params: { groupId: group.id } })

  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}


</script>


<template>
  <section class="row">
    <div class="col-md-4">
      <div class="mt-2 ms-3">
        <h4 class="text-light">Create your group</h4>
      </div>
      <form @submit.prevent="createGroup()" class="mt-5">
        <div class="form-floating mb-3">
          <input v-model="editableGroupFormData.name" type="text" class="form-control" id="name"
            placeholder="Group Name" maxlength="25" required>
          <label for="name">Group Name</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="editableGroupFormData.coverImg" type="url" class="form-control" id="coverImg"
            placeholder="Image Url" required>
          <label for="coverImg">Image Url</label>
        </div>
        <div class="form-floating mb-3">
          <textarea v-model="editableGroupFormData.description" class="form-control"
            placeholder="What is the group about?" id="description" required maxlength="1000"></textarea>
          <label for="description">What is the group about?</label>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-success">Create</button>
        </div>
      </form>
    </div>
    <div class="col-md-7">
      <div class="mt-3">
        <h4 class="text-light">Group Preview</h4>
        <div class="mt-4">
          <img :src="editableGroupFormData.coverImg" alt="" class="cover-image">
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1>{{ editableGroupFormData.name }}</h1>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h4 class="text-light">About</h4>
        </div>
        <p>{{ editableGroupFormData.description }}</p>
      </div>
    </div>
  </section>


</template>


<style lang="scss" scoped>
.cover-image {
  height: 400px;
  width: 100%;
  border-radius: 15px;
  object-position: center;
  object-fit: cover;
}
</style>
