<script setup>
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editablePostData = ref({
    body: '',
    imgUrl: '',
    groupId: route.params.groupId

})

async function createPost() {
    try {
        await postsService.createPost(editablePostData.value)
        editablePostData.value.body = ''
        editablePostData.value.imgUrl = ''
        Modal.getInstance('#postModal').hide()
    }
    catch (error) {
        Pop.error(error);
    }

}

</script>

<template>
    <form @submit.prevent="createPost()">
        <div class="form-floating mb-3 textarea">
            <textarea v-model="editablePostData.body" maxlength="1000" rows="10" class="form-control" id="body"
                name="body" placeholder="Write something" required></textarea>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editablePostData.imgUrl" type="url" id="imgUrl" name="img-url" placeholder="Url">
        </div>
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