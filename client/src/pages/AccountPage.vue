<script setup>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "@/utils/Logger.js";
import { accountService } from "@/services/AccountService.js";
import Pop from "@/utils/Pop.js";

const account = computed(() => AppState.account);

onMounted(() => editableAccountData.value = { ...account.value })
const editableAccountData = ref({
  name: "",
  picture: "",
  bio: "",
  coverImg: "",
});

async function updateAccount() {
  try {
    logger.log(editableAccountData.value);
    await accountService.updateAccount(editableAccountData.value);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}
</script>

<template>
  <section v-if="account" class="row justify-content-center my-4 mx-0">
    <div class="col-md-3">
      <form @submit.prevent="updateAccount" class="w-100" id="edit-form">
        <div class="mb-3">
          <input v-model="editableAccountData.name" type="text" id="name" name="name" class="form-control"
            placeholder="Name..." required />
        </div>
        <div class="mb-3">
          <input v-model="editableAccountData.picture" type="url" id="picture" name="picture" class="form-control"
            placeholder="Profile picture..." />
        </div>
        <div class="mb-3">
          <input v-model="editableAccountData.coverImg" type="url" id="coverImg" name="coverImg" class="form-control"
            placeholder="Cover Image url..." required />
        </div>
        <div>
          <textarea v-model="editableAccountData.bio" name="" id="bio" class="form-control" rows="10" maxlength="1000"
            placeholder="Bio..."></textarea>
        </div>
        <div class="mt-3 text-end">
          <button class="btn btn-success" type="submit">Submit Changes</button>
        </div>
      </form>
    </div>
    <div class="col-md-8">
      <div>
        <h5>Profile Preview</h5>
        <div>
          <img :src="editableAccountData.coverImg" class="cover-img" alt="" />
        </div>
        <div id="bio-box" class="p-4">
          <div class="d-flex justify-content-end">
            <div style="height: 20px"></div>
          </div>
          <div id="creator-img-icon-box" class="d-inline-block position-absolute">
            <img :src="editableAccountData.picture" alt="" class="creator-img" />
          </div>
          <div class="m-3 name-bio-box">
            <h2>{{ editableAccountData.name }}</h2>
            <p class="bio-text">{{ editableAccountData.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
</template>

<style scoped lang="scss">
.bio-box {
  resize: none;
  min-height: 300px;
}

textarea {
  resize: none;
}

#bio-box {
  background-color: white;
  position: relative;
}

.cover-img {
  width: 100%;
  height: 30dvh;
  object-fit: cover;
  object-position: center;
}

#creator-img-icon-box {
  position: absolute;
  left: 18px;
  top: -100px;
}

.creator-img {
  height: 10em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
}

.name-bio-box h2 {
  position: absolute;
  left: 16%;
  top: 10%;
}

.bio-text {
  margin-top: 3em;
}
</style>
