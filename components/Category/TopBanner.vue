<template>
  <div class="w-full">
    <SfImage
      class="banner_image"
      :src="$image(image) || require('/assets/images/banner.png')"
      :height="300"
      :width="null"
      :nuxt-img-config="{ fit: 'cover' }"
      alt="Category banner"
    />
    <!-- <div class="hidden lg:flex items-center relative w-full">
            <SfImage
                class
                :src="require('/assets/images/banner.png')"
                :height="300"
                :width="null"
                :nuxt-img-config="{ fit: 'cover' }"
                alt="Category banner"
            />
            <div class="banner__text w-2/5 pr-6 absolute right-0 flex items-center">
                <div>
                    <h6 class="uppercase text-white">Electronics</h6>
                    <h2 class="text-white mt-2">50% OFF</h2>
                    <p class="text text-white">
                        The collection features formal and casual comfort shoes with
                        a Danish design focus. Made from premium leathers and comfort.
                    </p>

                    <CopiaButton color="Black" class="mt-6">Learn More</CopiaButton>
                </div>
            </div>
        </div>
        <div class="flex lg:hidden w-full px-4 relative">
            <div class="mobile_banner_text w-1/2 absolute left-0">
                 
            </div>
            <img
                :src="require('/assets/images/small-banner.png')"
                alt="Category banner small"
                height="343"
                width="100%"
                class=" object-cover object-center"
                style="height:343px;"
            />
        </div> -->
  </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue';
import CopiaButton from '../Core/Atoms/CopiaButton.vue';
export default {
  components: { SfImage, CopiaButton },
  props: {
    image: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.banner__text {
  height: 300px;
  background-color: #7cc131;
}

.mobile_banner_text {
  height: 343px;
  background-color: #7cc131;
}

.banner_image {
    width: 100%;
    height: auto;
}
</style>
