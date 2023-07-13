<template>
  <div class="flex flex-row items-center py-4 px-3 cart-item">
    <div class="product_container overflow-hidden">
      <img
        :src="`https://odoodev.copia.odoogap.com${image}`"
        class="product_image"
      />
    </div>
    <div
      class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0"
    >
      <div class="product-name">
        <h6>{{ productName }}</h6>
      </div>
      <div class="product-price">
        <!-- <h4 class="price_before font-lato mb-1 lg:hidden">1385.00</h4> -->
        <h4>KES {{ price.toFixed(2) }}</h4>
      </div>
      <div>
        <div class="quantity_selector flex justify-between items-center">
          <span
            class="cursor-pointer"
            @click="handleProductUpdate(product, false)"
            >-</span
          >
          <span class="cursor-pointer">{{ quantity }}</span>
          <span
            class="cursor-pointer"
            @click="handleProductUpdate(product, true)"
            >+</span
          >
        </div>
      </div>

      <h4
        class="remove-item cursor-pointer"
        @click="handleRemoveProduct(product)"
      >
        Remove from cart
      </h4>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { cartGetters, useCart as baseUseCart } from '@vue-storefront/odoo';
import { useCart } from '~/composables';
import { productGetters, useCollectedProduct } from '~/composables';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { removeItem } = baseUseCart();
    const { cartUpdateItem } = useCart()
    const productName = computed(() => props.product?.product?.name);

    const price = computed(() =>
      productGetters.getActualPrice(props.product?.product)
    );

    const image = computed(() => props.product?.product?.image);

    const quantity = computed(() => cartGetters.getItemQty(props.product));

    const handleProductUpdate = async (product, increase) => {
      let parseQuantity = quantity.value;
      if (increase) {
        parseQuantity = Number(parseQuantity + 1);
      } else {
        parseQuantity = Number(parseQuantity - 1);
      }
      await cartUpdateItem(
        props.product?.product.id,
        parseQuantity);
    };

    const handleRemoveProduct = async () => {
      await removeItem({
        product: props.product?.product,
        customQuery: {
          cartRemoveItem: 'copiaCartRemoveItem',
        },
      });
    };

    return {
      productName,
      handleRemoveProduct,
      handleProductUpdate,
      price,
      quantity,
      image,
    };
  },
};
</script>

<style lang="scss" scoped>
.quantity_selector {
  background-color: var(--_c-copia-gray-light-accent);
  padding: 5px 12px;
  height: 40px;
  width: 108px;
  font-family: 'Lato';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  margin-right: 30px;
}

.product_container {
  height: 75px;
  width: 53px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product_image {
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.product-name {
  width: 177px;
  margin-right: 16px;
  h6 {
    font-family: var(--font-family--primary);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
  }
}

.product-price {
  margin-right: 16px;
  width: 160px;
  h4 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 29px;
  }
  .price_before {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 22px;
    color: var(--_c-copia-primary-red);
    text-decoration: line-through;
  }
}

.remove-item {
  font-family: var(--font-family--primary);
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-decoration: underline;
  color: var(--_c-copia-primary-red);
}

.cart-item {
  border-bottom: 1px solid var(--_c-copia-gray-light-accent);
}

@media (max-width: 1024px) {
  .product-image {
    width: 140px;
    height: 200px;
  }
}
</style>
