<template>
  <div class="container flex items-center relative w-full">
    <div class="wrapper relative">
      <img
        :src="image"
        alt="top image banner"
        class="w-full"
      />
      <div
        class="absolute left-0 -top-1 w-full px-6 text-white font-semibold flex space-x-2"
      >
        <div>
          <h4 class="mb-2">Electronics</h4>
          <h1 class="">
            50%<br />
            OFF
          </h1>
        </div>
      </div>
    </div>
    <div class="absolute left-6 bottom-6">
      <CopiaButton color="Black"> Learn More </CopiaButton>
    </div>
  </div>
</template>

<script>
import CopiaButton from '../Core/Atoms/CopiaButton.vue';
export default {
  components: {CopiaButton},
  props: {
    image: {
      tyep: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #7cc131;
  height: 268px;
}
</style>
