<template>
  <SfProductCard
    data-cy="category-product-card"
    :style="{ '--index': product.id }"
    :nuxtImgConfig="{ fit: 'cover' }"
    image-tag="nuxt-img"
    showAddToCartButton
    :special-price="
      productGetters.getPrice(product).special_price &&
      $n(productGetters.getPrice(product).special_price, 'currency')
    "
    :max-rating="5"
    class="products__product-card relative"
    link="https://google.com"
  >
    <template #image>
      <div class="w-full flex space-x-5">
        <nuxt-link
          class="image__container"
          :to="
            localePath(
              `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                product
              )}`
            )
          "
        >
          <img :src="$image(product.image)" alt="" class="image__product" />
        </nuxt-link>
        <div class="content">
          <div class="product_title">
            <label class="uppercase font-lato product_tag"
              >SKU: {{ product.sku }}</label
            >
            <nuxt-link
              :to="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
            >
              <h5 class="uppercase font-montserrat product_name mr-8">
                {{ product.name }}
              </h5>
            </nuxt-link>
          </div>
          <h4 v-if="hasDiscount" class="price_before font-lato">
            {{ priceBeforeDiscount.toFixed(2) }}
          </h4>
          <h4 v-else class="empty_price"></h4>
          <div class="flex w-full">
            <div class="w-1/2 price">
              <h5 class="font-lato font-black price_currency kes-text">KES</h5>
              <h5 class="font-lato font-black price_amount price-text">
                {{ actualPrice.toFixed(2) }}
              </h5>
            </div>
            <div class="w-1/2 flex justify-end">
              <div class="quantity_selector flex justify-between items-center">
                <span class="cursor-pointer" @click="quantityDecrease">-</span>
                <span class="cursor-pointer">{{ quantity }}</span>
                <span class="cursor-pointer" @click="qunatityIncrease">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #add-to-cart>
      <CopiaButton
        class="sf-button--full-width mt-3"
        @click="
          addItemToCart({
            product: product,
            quantity: parseInt(quantity),
            customQuery: { cartAddItem: 'copiaCartAddItem' },
          })
        "
      >
        ADD TO CART
      </CopiaButton>
    </template>

    <template #wishlist-icon>
      <div class="flex flex-col space-y-3">
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
        <!-- <SfButton
          class="sf-button--pure sf-header__action block text-center"
          @click="addToCompare(productGetters.getId(product))"
        >
          <SfIcon class="sf-header__icon m-auto" size="1.25rem">
            <img :src="'/homepage/compare.svg'" alt="filter" />
          </SfIcon>
        </SfButton> -->
      </div>
    </template>
  </SfProductCard>
</template>

<script>
import { SfProductCard, SfImage, SfIcon, SfButton } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { ref, useContext, computed } from '@nuxtjs/composition-api';
import CopiaButton from '../Core/Atoms/CopiaButton.vue';
import { productGetters } from '~/composables';
import {
  categoryGetters,
  useWishlist,
  useCart,
  cartGetters,
} from '@vue-storefront/odoo';
import { useCompareProducts } from '~/composables';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    SfProductCard,
    SfImage,
    SfIcon,
    SfButton,
    CopiaButton,
  },
  setup(props) {
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
      wishlist,
    } = useWishlist();
    const { addToCompare } = useCompareProducts();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const quantity = ref(1);
    const qunatityIncrease = () => {
      quantity.value = quantity.value + 1;
    };
    const quantityDecrease = () => {
      if (quantity.value > 1) quantity.value = quantity.value - 1;
    };
    const priceBeforeDiscount = computed(() =>
      productGetters.getPriceBeforeDiscount(props.product)
    );

    const actualPrice = computed(() =>
      productGetters.getActualPrice(props.product)
    );

    const hasDiscount = computed(() =>
      productGetters.productHasDiscount(props.product)
    );
    return {
      productGetters,
      addBasePath,
      addItemToCart,
      quantity,
      qunatityIncrease,
      quantityDecrease,
      addItemToWishlist,
      isInWishlist,
      removeItemFromWishlist,
      wishlist,
      actualPrice,
      priceBeforeDiscount,
      hasDiscount,
      addToCompare,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-product-card {
  max-width: 100% !important;
}

.content {
  width: calc(100% - 85px);
}

.product_tag {
  color: var(--_c-copia-primary-red);
}

.product_name {
  color: #43464e;
  font-family: 'Montserrat' !important;
  font-weight: 700 !important;
  font-size: 16px;
  line-height: 24px;
  margin-top: 10px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize !important;
}

.price_before {
  font-size: 16px;
  line-height: 22px;
  font-weight: 900;
  color: var(--_c-copia-primary-red);
  text-decoration: line-through;
  font-family: var(--font-family--secondary);
}

.price {
  margin-top: 3px;
  margin-bottom: 11px;
  font-family: 'Lato';

  &_currency {
    font-size: 16px;
    line-height: 22px;
  }

  &_amount {
    font-size: 24px;
    line-height: 28.8px;
  }
}

.quantity_selector {
  background-color: var(--_c-copia-gray-light-accent);
  padding: 5px 12px;
  height: 48px;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  width: 108px;
}

.products__product-card {
  height: auto;
  width: 100%;
  --product-card-wishlist-icon-opacity: 1 !important;

  .product_title {
    height: 82px;
  }

  .compare-icon {
    position: absolute;
    right: 22px;
    top: 48px;
    cursor: pointer;
  }

  .ribbon-price {
    position: absolute;
    left: 0px;
    top: 20px;
    background-color: #e81e2b;
    font-size: 12px;
    font-family: 'Montserrat';
    font-weight: 600;
    padding: 5px 16px;
    color: white;
    text-transform: uppercase;
  }

  .ribbon-title {
    position: absolute;
    left: 0px;
    top: 20px;
    background-color: #fecb06;
    font-size: 12px;
    font-family: 'Montserrat';
    font-weight: 600;
    padding: 5px 8px;
    text-transform: uppercase;
  }

  .image {
    &__container {
      width: 85px;
      background-color: var(--_c-copia-gray-light-accent);
    }
    &__product {
      width: 100%;
      height: 100% !important;
      object-fit: cover;
      object-position: center;
    }
  }
}

.empty_price {
  padding-top: 22px;
}
</style>
