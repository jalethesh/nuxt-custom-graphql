<template>
  <div v-if="products.length" class="fixed left-0 right-0 fixed-bar bottom-0 z-50">
    <div id="layout" class="
        flex flex-col
        justify-between
        flex-grow
        p-3
        mx-auto
        bg-white
        md:flex-row md
        card-container 
        border border-sf-c-gray-darken
        shadow-md
      ">
      <div class="grid grid-cols-4 gap-2">
        <div v-for="product in products" :key="product.id" class="grid grid-cols-5 gap-x-2 relative">
          <picture class="col-span-2 p-2 bg-gray-200">
            <img class="w-32" :src="$image(product.smallImage)" />
          </picture>
          <div class="col-span-3 mt-2 text-sm">
            <p class="sf-product-card__title">
              {{ product.name }}
            </p>
            <p class="mt-2 text-lg font-bold">
              {{ $n(product.price, 'currency') }}
            </p>
          </div>
          <button class="
              px-2
              py-1.5
              text-xs
              leading-3
              text-white
              bg-red-600
              rounded-full
              absolute
              top-0
              right-0
            " @click="removeFromCompare(product.id)">
            &times;
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-3">
        <nuxt-link to="/compare" class="px-4 py-2 font-medium uppercase bg-yellow-400 rounded-md">
          compare
        </nuxt-link>
        <button class="
            px-4
            py-1.5
            border-black
            font-medium
            uppercase
            border-2
            rounded-md
          " @click.stop="clear">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api';

import { useCompareProducts } from '~/composables';

export interface State {
  compare: {
    products: []
  }
}

export default defineComponent({
  name: 'TheCompareModal',

  setup() {
    const { state } = useStore<State>();
    const { removeFromCompare, clear, getProducts } = useCompareProducts();
    const products = computed(() => state.compare.products)

    if (products.value.length === 0) {
      getProducts()
    }
    
    return {
      products,
      removeFromCompare,
      clear,
    };
  },
});
</script>

<style scoped>
.font-16 {
  font-size: 16px !important;
}
</style>