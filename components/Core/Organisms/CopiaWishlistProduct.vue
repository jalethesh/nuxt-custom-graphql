<template>
  <SfCollectedProduct
    :key="product.id"
    data-cy="collected-product-cart-sidebar"
    class="collected-product"
    @click:remove="removeItem({ product: product, customQuery: { wishlistRemoveItem : 'copiaWishlistRemoveItem' } })"
  >
    <template #title>
      <div class="product_title">
        <label class="uppercase font-lato product_tag">SKU: {{ productGetters.getSku(product.product) }}</label>
        <h5 class="uppercase font-montserrat product_name">
          {{ name }}
        </h5>
      </div>
    </template>
    <template #image>
      <div class="image_container px-3 overflow-hidden">
        <img :src="$image(productGetters.getImage(product.product))" :alt="name" class=" w-full h-auto object-cover object-center"/>
      </div>
    </template>
    <template #configuration>
      <div />
    </template>
    <template #more-actions>
      <div />
    </template>
    <template #price>
      <div class="mt-2">
        <h4 v-if="hasDiscount" class="price_before font-lato">{{ priceBeforeDiscount.toFixed(2) }}</h4>
       <!--  <h4 v-else class="empty_price"></h4> -->
        <div class="w-full price mt-1">
          <h5 class="font-lato font-black price_currency">KES</h5>
          <h5 class="font-lato font-black price_amount">{{ actualPrice.toFixed(2) }}</h5>
        </div>
        <div class="quantity_selector mt-1 flex justify-between items-center">
          <span class="cursor-pointer" @click="quantityDecrease">-</span>
          <span class="cursor-pointer">{{quantity}}</span>
          <span class="cursor-pointer" @click="qunatityIncrease">+</span>
        </div>
      </div>
    </template>
    <template #input>
      <div />
    </template>
    <template #actions>
      <div />
    </template>
  </SfCollectedProduct>
</template>

<script lang="ts">
import { SfCollectedProduct, SfIcon, SfButton } from '@storefront-ui/vue';
import { productGetters } from '~/composables';
import { cartGetters, useWishlist } from '@vue-storefront/odoo';
import { defineComponent, computed, PropType, ref } from '@nuxtjs/composition-api';
import { CopiaOrderLine } from '~/copia-api/types';

export default defineComponent({
  components: {
    SfCollectedProduct,
    SfIcon,
    SfButton,
  },
  props: {
    product: {
      type: Object as PropType<CopiaOrderLine>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const { removeItem } = useWishlist()
    const name = computed(() => props.product?.product?.name || '')

    const quantity = ref(1);

    const qunatityIncrease = () => {
        quantity.value = quantity.value + 1;
        emit('updateProduct', { ...props.product.product, quantity: Number(quantity) })
    };
    const quantityDecrease = () => {
      if (quantity.value > 1) 
      {
        quantity.value = quantity.value - 1;
        emit('updateProduct', { ...props.product.product, quantity: Number(quantity) })
      }
    };

    const priceBeforeDiscount = computed(() =>
      productGetters.getPriceBeforeDiscount(props.product?.product)
    );

    const actualPrice = computed(() =>
      productGetters.getActualPrice(props.product?.product)
    );

    const hasDiscount = computed(() =>
      productGetters.productHasDiscount(props.product?.product)
    );

    const handleRemoveItem = async (product) => {
        await removeItem({ product, customQuery: { wishlistRemoveItem: 'copiaWishlistRemoveItem' } })
    }

    const handleUpdateItem = () => {};

    return {
      productGetters,
      hasDiscount,
      actualPrice,
      priceBeforeDiscount,
      cartGetters,
      handleRemoveItem,
      removeItem,
      qunatityIncrease,
      quantityDecrease,
      name,
      quantity
    };
  },
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/collectedProduct.scss';
</style>
