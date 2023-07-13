<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import { useCompareProducts } from '~/composables';

export default defineComponent({
  name: 'CompareButton',

  components: { SfButton },

  props: {
    productId: {
      type: [Number, String],
      default: null,
    }
  },

  setup() {
    const { addToCompare } = useCompareProducts();

    return {
      addToCompare
    }
  },
});
</script>

<template>
  <div class="compare-icon" @click="addToCompare(productId)">
    <img :src="'/homepage/compare.svg'" />
  </div>
</template>
