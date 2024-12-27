<script setup></script>

<template>
  <section class="row img-box mb-4">
    <div class="col-md-12 px-5">
      <div>
        <div style="
            background-image: url(https://images.unsplash.com/photo-1502318217862-aa4e294ba657?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhY2V8ZW58MHx8MHx8fDI%3D);
          " class="cover-image"></div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1>Nebula Network</h1>
            <p>2100 members</p>
          </div>
          <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal">
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="row justify-content-center">
    <div class="col-md-6">
      <section class="row">
        <div class="col-md-12 shadow mb-5">
          <div>
            <div class="d-flex justify-content-between p-3">
              <div class="d-flex">
                <div>
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="creator-img me-2" />
                </div>
                <div>
                  <p>Sean Pursley</p>
                  <span>2h</span>
                </div>
              </div>
              <div>
                <button class="btn bg-warning me-2">Edit</button>
                <button class="btn bg-warning">Delete</button>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              hic illum necessitatibus aspernatur suscipit, voluptates dicta
              quibusdam deserunt voluptatibus ipsam quae sed officiis odio
              corporis, nihil optio molestiae, accusamus quo?
            </p>
            <div class="mb-4">
              <img
                src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AjxZyzWuOoSjMvxETA-Kuhw&oh=00_AYATdeg-lm4xvt0XycrHU-ZxpmULcyhIul37MI_Fo5WaCg&oe=676F832C"
                alt="" class="post-img" />
            </div>
            <div class="bg-light d-flex justify-content-center">
              <div class="me-5 selectable rounded p-3 d-flex align-items-center">
                <span class="mdi mdi-thumb-up-outline me-1 fs-4"></span>
                <span>Like</span>
              </div>
              <div class="selectable rounded p-3 d-flex align-items-center">
                <span class="mdi mdi-comment-text-outline me-1 fs-4"></span>
                <span>Comment</span>
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 shadow mb-5">
          <div>
            <div class="d-flex justify-content-between p-3">
              <div class="d-flex">
                <div>
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="creator-img me-2" />
                </div>
                <div>
                  <p>Sean Pursley</p>
                  <span>2h</span>
                </div>
              </div>
              <div>
                <button class="btn bg-warning me-2">Edit</button>
                <button class="btn bg-warning">Delete</button>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              hic illum necessitatibus aspernatur suscipit, voluptates dicta
              quibusdam deserunt voluptatibus ipsam quae sed officiis odio
              corporis, nihil optio molestiae, accusamus quo?
            </p>
            <div class="mb-4">
              <img
                src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AjxZyzWuOoSjMvxETA-Kuhw&oh=00_AYATdeg-lm4xvt0XycrHU-ZxpmULcyhIul37MI_Fo5WaCg&oe=676F832C"
                alt="" class="post-img" />
            </div>
            <div class="bg-light d-flex justify-content-center">
              <div class="me-5 selectable rounded p-3 d-flex align-items-center">
                <span class="mdi mdi-thumb-up-outline me-1 fs-4"></span>
                <span>Like</span>
              </div>
              <div class="selectable rounded p-3 d-flex align-items-center">
                <span class="mdi mdi-comment-text-outline me-1 fs-4"></span>
                <span>Comment</span>
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 shadow mb-5">
          <div>
            <div class="d-flex justify-content-between p-3">
              <div class="d-flex">
                <div>
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="creator-img me-2" />
                </div>
                <div>
                  <p>Sean Pursley</p>
                  <span>2h</span>
                </div>
              </div>
              <div>
                <button class="btn bg-warning me-2">Edit</button>
                <button class="btn bg-warning">Delete</button>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              hic illum necessitatibus aspernatur suscipit, voluptates dicta
              quibusdam deserunt voluptatibus ipsam quae sed officiis odio
              corporis, nihil optio molestiae, accusamus quo?
            </p>
            <div class="mb-4">
              <img
                src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AjxZyzWuOoSjMvxETA-Kuhw&oh=00_AYATdeg-lm4xvt0XycrHU-ZxpmULcyhIul37MI_Fo5WaCg&oe=676F832C"
                alt="" class="post-img" />
            </div>
            <div class="bg-light d-flex justify-content-center">
              <div class="me-5 selectable rounded p-3 d-flex align-items-center">
                <span class="mdi mdi-thumb-up-outline me-1 fs-4"></span>
                <span>Like</span>
              </div>
              <div class="selectable rounded p-3 d-flex align-items-center">
                <span class="mdi mdi-comment-text-outline me-1 fs-4"></span>
                <span>Comment</span>
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
              <div class="d-flex shadow p-2 mb-3">
                <div class="ms-2">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                    alt="" class="comment-creator-img me-2" />
                </div>
                <div>
                  <span class="fw-bold">George Jones</span>
                  <p>all dressed up and ready to hit town</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="col-md-4">
      <div class="bg-info">
        <div class="p-3">
          <p class="fw-bold">About</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eum
            delectus impedit nam repellendus! Debitis esse eaque nihil voluptate
            dolore cumque, fugit ipsa, placeat vero corrupti exercitationem, sed
            quas mollitia.
          </p>
          <p>
            <span class="mdi mdi-map-marker"></span>
            <span>Boise, ID</span>
          </p>
        </div>
        <div class="bg-warning">
          <p>Recent snapshots</p>
          <section class="row">
            <div class="col-md-6 mb-3">
              <div class="text-center">
                <img
                  src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                  alt="" />
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="text-center">
                <img
                  src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                  alt="" />
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="text-center">
                <img
                  src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                  alt="" />
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="text-center">
                <img
                  src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                  alt="" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cover-image {
  height: 35dvh;
  background-repeat: no-repeat;
  background-size: cover;
}

.img-box {
  background-color: #fff;
}

.creator-img {
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.post-img {
  height: 60dvh;
  width: 100%;
  object-fit: contain;
  // object-position: center center;
}

.comment-creator-img {
  border-radius: 50%;
  aspect-ratio: 1/1;
  height: 3em;
}
</style>
