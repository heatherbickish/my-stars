<script setup>
import { postsService } from "@/services/PostsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const editablePostData = ref({
  body: "",
  imgUrl: "",
  groupId: ''
});

async function createPost() {
  try {
    // @ts-ignore
    editablePostData.value.groupId = route.params.groupId;
    console.log(editablePostData.value.groupId)
    await postsService.createPost(editablePostData.value);
    editablePostData.value.body = "";
    editablePostData.value.imgUrl = "";
    editablePostData.value.groupId = "";
    Modal.getInstance("#postModal").hide();
  } catch (error) {
    Pop.error(error);
  }
}
// function uploadFile(event){
//     console.log(event.target.files["0"]["name"])
//     editablePostData.value.imgUrl = event.target.files["0"]["name"]
// }
</script>

<template>
  <form @submit.prevent="createPost()">
    <div class="mb-3">
      <textarea v-model="editablePostData.body" maxlength="1000" class="form-control p-0" name="body" placeholder="Create a post..." rows="10" required></textarea>
    </div>
    <!-- <div class="form-floating mb-3">
        <div>
            <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yQ/r/74AG-EvEtBm.png" alt="">
        </div>
        <div>
            <input @change="uploadFile($event)" type="file" name="file">
        </div> -->
      <input
        v-model="editablePostData.imgUrl"
        type="url"
        id="imgUrl"
        name="img-url"
        placeholder="Url"
      />
    <div class="text-end">
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
textarea {
  resize: none;
}
</style>
