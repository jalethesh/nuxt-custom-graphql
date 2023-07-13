<template>
    <div class="flex items-center relative w-full justify-center category-bottom-banner">
        <SfImage
            :src="addBasePath('/homepage/copia-pesa-recommending-learn-how1.png')"
            :nuxt-img-config="{ fit: 'cover' }"
            alt="Category banner"
            class="desktop-only"
        />
        <SfImage
            :src="addBasePath('/homepage/mobilesubscribenewsletter.png')"
            :nuxt-img-config="{ fit: 'cover' }"
            alt="Category banner"
            class="smartphone-only"
        />
        <!-- <div class="banner__text w-2/5 px-20 absolute right-0 flex items-center">
            <div>
                <h3 class="text-center">
                    Buying products or
                    recommending your friends
                </h3>

                <CopiaButton color="Black" class="mt-6 mx-auto">Learn More</CopiaButton>
            </div>
        </div> -->
    </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue'
import CopiaButton from '../Core/Atoms/CopiaButton.vue'
import { addBasePath } from '@vue-storefront/core';

export default {
    components: { SfImage, CopiaButton },
    setup(){
      return{
        addBasePath
      }
    }
}
</script>

<style lang="scss" scoped>
.category-bottom-banner{
  @include for-mobile{
    padding-right: 16px;
    padding-left: 16px;
  }
}
.banner__text {
    height: 206px;
    background-color: var(--_c-copia-secondary-yellow);
    color: var(--_c-copia-primary-black);
}
</style>