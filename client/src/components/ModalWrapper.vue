<script setup>
import PostModal from "./PostModal.vue";
</script>

<template>
  <div
    class="modal fade"
    id="postModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="postModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 w-100 text-center fw-bold" id="postModalLabel">Create post</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <PostModal />
        </div>
        <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
