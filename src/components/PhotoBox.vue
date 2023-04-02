<template>
  <div class="photo-box">
    <img :src="photo.url" @error="setPhoto(photo.url)" class="photo-box__img" />
    <div class="photo-box__label">{{ photo.label }}</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  props: {
    photo: {
      type: Object,
      required: false,
    },
  },
  methods: {
    async setPhoto(url) {
      this.$emit("changeUrl", this.photo, "../src/assets/no-image.png");
      try {
        //first replay with 1s delay later 8 replay with other delay
        await axios.get(url, {
          retry: 8,
          delay: 1000,
        });
        this.$emit("changeUrl", this.photo, url);
      } catch {}
    },
  },
};
</script>
