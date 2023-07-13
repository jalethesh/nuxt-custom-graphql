<template>
  <SfSection :title-heading="title">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel
        :settings="{
          type: products.length > 4 ? 'carousel' : 'slider',
          perView: 4,
          peek: 5,
          slidePerPage: !(products.length > 4),
          gap: 10,
          breakpoints: {
            1023: {
              type: products.length > 1 ? 'carousel' : 'slider',
              perView: 1.5,
            },
          },
        }"
        class="carousel"
      >
        <SfCarouselItem
          class="carousel__item"
          v-for="(product, i) in products"
          :key="i"
        >
          <CopiaProductCard
            :product="product"
            class="carousel__product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts">
import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader,
  SfQuantitySelector,
} from '@storefront-ui/vue';
import {
  productGetters,
  useWishlist,
  wishlistGetters,
  useCart,
} from '@vue-storefront/odoo';
import { computed } from '@vue/composition-api';
import { addBasePath } from '@vue-storefront/core';
import CopiaProductCard from './Core/Organisms/CopiaProductCard.vue';

export default {
  name: 'RelatedProducts',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader,
    SfQuantitySelector,
    CopiaProductCard
},
  props: {
    title: String,
    products: Array,
    loading: Boolean,
  },
  setup(props) {
    const { addItem: addItemToCart, isInCart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
      wishlist,
    } = useWishlist();
    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() =>
        wishlistGetters.getItems(wishlist.value)
      );
      const product = productsInWhishlist.value.find(
        (wishlistProduct) => wishlistProduct.variant.sku === productItem.sku
      );
      removeItemFromWishlist({ product });
    };

    return {
      productGetters,
      addItemToWishlist,
      isInWishlist,
      removeProductFromWishlist,
      addItemToCart,
      isInCart,
      addBasePath,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-section {
  margin: 0;
  &__content {
    margin-top: 0px;
  }
}

.sf-carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__product-card {
    --product-card-title-margin: var(--spacer-2xs) 0 0 0;
    --price-regular-font-line-height: 1;
    margin-bottom: var(--spacer-sm);
    ::v-deep .sf-product-card__price {
      margin: var(--spacer-2xs) 0 var(--spacer-xs);
    }
    --product-card-wishlist-icon-opacity: 1;
    @include for-desktop {
      margin-bottom: 0;
      --product-card-max-width: 256px;
      --product-card-title-margin: var(--spacer-base) 0 0 0;
    }
  }
}

.sf-product-card {
  max-width: 246px;
  &__compare-icon {
    position: absolute;
    top: 55px;
    right: 27px;
    opacity: 1;
    @include for-mobile {
      top: 45px;
      right: 20px;
    }
  }
}
.sf-quantity-selector {
  width: 100%;
  font-family: 'Lato';
}

.sf-carousel .glide__slide {
  margin: 20px 0px;
}

::v-deep {
  .sf-section {
    &__content {
      margin: 0;
    }
  }
  .sf-arrow {
    border-radius: 50px !important;
  }
  .sf-product-card {
    &__badge {
      background-color: var(--_c-copia-primary-red);
      padding: 5px 18px;
      top: 12px;
    }
  }
}
</style>
