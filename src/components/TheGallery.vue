<template>
  <div class="gallery">
    <div class="gallery__item" v-for="(photo, index) in photos" :key="index">
      <PhotoBox :photo="photo" @changeUrl="changePhotoUrl"></PhotoBox>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PhotoBox from "./PhotoBox.vue";
const API_URL_PHOTOS =
  "https://s3.eu-west-2.amazonaws.com/assets-test.fast-thinking.co.uk/recruitment/data.json";

export default {
  data() {
    return {
      acctualUrl: null,
      photos: [],
    };
  },
  components: {
    PhotoBox,
  },
  created() {
    this.getPhotos();
  },
  methods: {
    changePhotoUrl(photo, newUrl) {
      photo.url = newUrl;
    },
    getPhotos() {
      axios
        .get(API_URL_PHOTOS)
        .then((response) => {
          this.photos = response.data;
        })
        .catch((error) => {
          alert("There were problems with the API");
        });
    },
  },
};
</script>
