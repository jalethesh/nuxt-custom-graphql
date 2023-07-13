<template>
  <SfProductCardHorizontal
    v-e2e="'category-product-card'"
    :nuxtImgConfig="{ fit: 'cover', alt: '123' }"
    image-tag="nuxt-img"
    :show-add-to-cart-button="false"
    :special-price="
      productGetters.getPrice(product).special &&
      $n(productGetters.getPrice(product).special, 'currency')
    "
    :isInWishlist="isInWishlist({ product })"
    class="products__product-card-horizontal relative mb-2"
  >
    <template #image>
      <nuxt-link
        :to="
          localePath(
            `/p/${productGetters.getId(product)}/${productGetters.getSlug(
              product
            )}`
          )
        "
      >
        <div class="image_container p-2">
          <img
            :src="$image(productGetters.getCoverImage(product))"
            alt
            class="w-full h-full object-cover object-center"
          />
        </div>
      </nuxt-link>
    </template>

    <template #title>
      <nuxt-link
        :to="
          localePath(
            `/p/${productGetters.getId(product)}/${productGetters.getSlug(
              product
            )}`
          )
        "
      >
        <h5 class="product__title mt-2">
          {{ productGetters.getName(product) }}
        </h5>
      </nuxt-link>
      <p class="product__description mt-4">
        {{ productGetters.getDescription(product) }}
      </p>

      <div class="absolute bottom-2">
        <label for class="product__label">SKU: {{ product.sku }}</label>
        <h3 class="product__price mt-1">
          {{ actualPrice.toFixed(2) }}
        </h3>
      </div>
    </template>
    <template #actions>
      <div class="flex space-x-2 absolute top-0 right-0">
        <SfButton
          class="sf-button--pure sf-header__action block text-center"
          @click="
            isInWishlist({ product })
              ? removeItemFromWishlist({
                  product : { product },
                  customQuery: {
                    wishlistRemoveItem: 'copiaWishlistRemoveItem',
                  },
                })
              : addItemToWishlist({
                  product,
                  customQuery: { wishlistAddItem: 'copiaWishlistAddItem' },
                })
          "
        >
          <SfIcon
            class="sf-header__icon m-auto"
            :icon="isInWishlist({ product }) ? 'heart_fill' : 'heart'"
            size="1.25rem"
          />
        </SfButton>
        <SfButton class="sf-button--pure sf-header__action block text-center" @click="addToCompare(productGetters.getId(product))">
          <SfIcon class="sf-header__icon m-auto" size="1.25rem">
            <img :src="'/homepage/compare.svg'" alt="filter" />
          </SfIcon>
        </SfButton>
      </div>
    </template>
    <template #add-to-cart>
      <div
        class="mb-4 mt-2 quantity_selector flex justify-between items-center"
      >
        <span class="cursor-pointer" @click="quantityDecrease">-</span>
        <span class="cursor-pointer">{{ quantity }}</span>
        <span class="cursor-pointer" @click="qunatityIncrease">+</span>
      </div>
      <div>
        <CopiaButton
          class="sf-button mb-2"
          @click="
            addItemToCart({
              product: product,
              quantity: parseInt(quantity),
              customQuery: { cartAddItem: 'copiaCartAddItem' },
            })
          "
          >ADD TO CART</CopiaButton
        >
      </div>
    </template>
  </SfProductCardHorizontal>
</template>

<script>
import { SfProductCardHorizontal, SfIcon, SfButton } from '@storefront-ui/vue';
import { useWishlist, useCart } from '@vue-storefront/odoo';
import { productGetters } from '~/composables';
import CopiaButton from '../Core/Atoms/CopiaButton.vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { useCompareProducts } from '~/composables';

export default {
  props: {
    product: {
      default: Object,
      required: true,
    },
  },
  components: {
    SfProductCardHorizontal,
    SfIcon,
    SfButton,
    CopiaButton,
  },

  setup(props) {
    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
      isInWishlist,
    } = useWishlist();

    const { addItem: addItemToCart, isInCart } = useCart();
    const { addToCompare } = useCompareProducts();

    const quantity = ref(1);
    const qunatityIncrease = () => {
      quantity.value = quantity.value + 1;
    };
    const quantityDecrease = () => {
      if (quantity.value > 1) quantity.value = quantity.value - 1;
    };

    const actualPrice = computed(() =>
      productGetters.getActualPrice(props.product)
    );

    return {
      actualPrice,
      productGetters,
      addItemToWishlist,
      removeItemFromWishList,
      isInWishlist,
      addItemToCart,
      isInCart,
      quantity,
      quantityDecrease,
      qunatityIncrease,
      addToCompare,
    };
  },
};
</script>

<style lang="scss" scoped>
.before-results {
  box-sizing: border-box;
  padding: var(--spacer-lg) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;

  @include for-desktop {
    padding: 0;
  }

  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);

    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }

  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;

    @include for-desktop {
      font-size: var(--font-size--lg);
    }

    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }

  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}

.image_container {
  width: 132px;
  height: 186px;
  background-color: white;
  border: 1px solid #e0e0e1;
  border-radius: 5px;
}

.product {
  &__title {
    font-family: var(--font-family--primary);
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }

  &__description {
    font-family: var(--font-family--secondary);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: var(--_c-copia-primary-gray);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__label {
    font-family: var(--font-family--primary);
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: var(--_c-copia-primary-red);
  }

  &__price {
    font-family: var(--font-family--secondary) !important;
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 29px;
    color: var(--_c-copia-primary-black);
  }
}

.quantity_selector {
  background-color: var(--_c-copia-gray-light-accent);
  padding: 5px 12px;
  height: 48px;
  width: 108px;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  float: right;
}
</style>
