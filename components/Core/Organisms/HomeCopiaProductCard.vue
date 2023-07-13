<template>
  <SfProductCard
    data-cy="category-product-card"
    badge="-50%"
    :style="{ '--index': product.id }"
    :title="productGetters.getName(product)"
    :nuxtImgConfig="{ fit: 'cover' }"
    image-tag="nuxt-img"
    :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
    :special-price="
      productGetters.getPrice(product).special &&
      $n(productGetters.getPrice(product).special, 'currency')
    "
    :max-rating="5"
    :link="
      localePath(
        `/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`
      )
    "
    :is-in-wishlist="isInWishlist({product})"
    class="products__product-card relative copia-product"
    @click:wishlist="
      isInWishlist({ product })
        ? removeItemFromWishlist({ product:{ product }, customQuery: { wishlistRemoveItem : 'copiaWishlistRemoveItem' } })
        : addItemToWishlist({ product, customQuery: { wishlistAddItem : 'copiaWishlistAddItem'}  })
    "
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
        <div class="image_container">
          <SfImage
            :src="$image(product.image)"
            alt="product"
            :width="imageWidth"
            :height="imageHeight"
            class="image_product"
          />
        </div>
      </nuxt-link>
      <div class="desktop-only">
        <CompareButton v-if="compare" :product-id="productGetters.getId(product)" />
      </div>
      <div class="ribbon-title" v-if="arrive">
        {{ arrive }}
      </div>

      <div class="ribbon-price" v-if="pricerow">
        {{ pricerow }}%
      </div>
    </template>
    <div slot="title" class="product_title mt-4">
      <nuxt-link
        :to="
          localePath(
            `/p/${productGetters.getId(product)}/${productGetters.getSlug(
              product
            )}`
          )
        "
      >
        <label class="uppercase font-lato product_tag"
          >SKU: {{ product.sku }}</label
        >
        <h5 class="uppercase font-montserrat product_name">
          {{ product.name }}
        </h5>
      </nuxt-link>
    </div>
    <div slot="price" class="mt-4">
      <h4 class="price_before font-lato" v-if="product.combinationInfo.has_discounted_price">
        {{
          parseFloat(product.combinationInfo.list_price).toFixed(2)
        }}
      </h4>
      <h4 class="price_before1 font-lato" v-else>
        &nbsp;
      </h4>
      <div class="flex">
        <div class="w-1/2 price">
          <h5 class="font-lato font-black price_currency kes-text">KES</h5>
          <h5 class="font-lato font-black price_amount price-text">
            {{
              parseFloat(product.combinationInfo.price).toFixed(2)
            }}
          </h5>
        </div>
        <div class="w-1/2 quantity_selector flex justify-between items-center">
          <span class="cursor-pointer" @click="quantityDecrease">-</span>
          <span class="cursor-pointer">{{ quantity }}</span>
          <span class="cursor-pointer" @click="qunatityIncrease">+</span>
        </div>
      </div>

      <CopiaButton
        class="sf-button--full-width"
        @click="
          addItemToCart({ 
            product: product, 
            quantity: parseInt(quantity),
            customQuery: { cartAddItem: 'copiaCartAddItem' }
          })
        "
      >
        ADD TO CART
      </CopiaButton>
    </div>
  </SfProductCard>
</template>

<script>
import { SfProductCard, SfImage } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { ref, computed } from '@nuxtjs/composition-api';

import {
  productGetters,
  categoryGetters,
  useWishlist,
  useCart,
  cartGetters,
} from '@vue-storefront/odoo';
import CopiaButton from '../Atoms/CopiaButton.vue';
import CompareButton from '~/components/CompareButton.vue';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    arrive: {
      type: String,
      default: '',
    },
    pricerow: {
      type: Number,
      default: 0,
    },
    imageWidth: {
      type: Number,
      default: 160
    },
    imageHeight: {
      type: Number,
      default: 206
    },
    compare: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SfProductCard,
    SfImage,
    CopiaButton,
    CompareButton,
  },
  setup(props) {
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
      wishlist,
    } = useWishlist();
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
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-product-card {
  max-width: 100% !important;
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
.price_before1{
  font-size: 16px;
  line-height: 22px;
  font-weight: 900;
  color: var(--_c-copia-primary-red);
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
}

.products__product-card {
  height: auto;
  max-width: 256px !important;
  width: 100%;
  --product-card-wishlist-icon-opacity: 1 !important;

  .product_title {
    height: 82px;
  }

  .compare-icon {
    position: absolute;
    right: 19px;
    top: 45px;
    cursor: pointer;
    @include for-mobile {
      right: 11px;
      top: 35px;
    }
  }

  .ribbon-price {
    position: absolute;
    left: 0px;
    top: 20px;

    @include for-mobile {
      top: 15px;
    }

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

    @include for-mobile {
      top: 15px;
    }

    background-color: #fecb06;
    font-size: 12px;
    font-family: 'Montserrat';
    font-weight: 600;
    padding: 5px 8px;
    text-transform: uppercase;
  }

  .image_container {
    width: 100%;
    height: 326px;
    // padding: 60px;
    // background-color: var(--_c-copia-gray-light-accent);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 20px 30px;
    overflow: hidden;

    .image_product {
      max-width: 100% !important;
      width: 100% !important;

      @include for-mobile {
        width: 240px !important;
      }

      display: flex;
      justify-content: center;
    }

    &_product {
      width: 100%;
      height: 100% !important;
    }
  }

  @media (max-width: 640px) {
    .products__product-card {
      margin-left: auto;
      margin-right: auto;
    }
  }
}

::v-deep {
  .sf-product-card {
    &__wishlist-icon {
      top: 20px;
      right: 20px;
      @include for-mobile {
        top: 12px;
        right: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
.copia-product {
  .sf-product-card__image-wrapper {
    border: 1px solid #e0e0e1;
    border-radius: 4px;
  }
  .image_container{
    .sf-image{
      width: 100%;
      height: auto;
    }
  }
}
</style>
