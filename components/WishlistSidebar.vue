<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      title="My Favorites"
      @close="toggleWishlistSidebar"
      class="sidebar sf-sidebar--right"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition type="transition" name="fade" mode="out-in">
        <div v-if="totalItems" class="my-wishlist" key="my-wishlist">
          <div class="collected-product-list">
            <transition-group name="fade" tag="div">
              <CopiaWishlistProduct
                v-for="product in products"
                :key="product.id"
                :product="product"
                @updateProduct="updateProduct"
              />
            </transition-group>
          </div>
        </div>
        <div v-else class="empty-wishlist" key="empty-wishlist">
          <div class="empty-wishlist__banner">
            <SfImage
              :width="142"
              :height="195"
              src="/icons/favourites.svg"
              alt="Empty bag"
              class="empty-wishlist__icon desktop-only"
            />
            <SfImage
              :width="86"
              :height="117"
              src="/icons/favourites1.svg"
              alt="Empty bag"
              class="empty-wishlist__icon smartphone-only"
            />
            <SfHeading
              title="No favorites yet"
              description="Looks like you haven’t added any items to the favorites yet. Start adding itens to your list pressing the heart on products."
              class="empty-wishlist__label"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <div class="sidebar-bottom">
          <SfProperty
            name="Total price"
            class="sf-property sf-property--large my-cart__total-price flex items-center mb-8"
          >
            <template #value>
              <SfPrice :regular="$n(totals, 'currency')" />
            </template>
          </SfProperty>
        </div>
        <div v-if="totalItems"  class="flex justify-between space-x-5">
          <CopiaButton class="shopping-button" color="Red" @click="addItemsToCart">
            {{ $t('Add To Cart') }}
          </CopiaButton>
          <CopiaButton  class="shopping-button" color="Black" outline>
            {{ $t('Share this list') }}
          </CopiaButton>
        </div>
        <CopiaButton
          v-else
          @click="toggleWishlistSidebar"
          class="shopping-button"
        >
          {{ $t('Start shopping') }}
        </CopiaButton>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
} from '@storefront-ui/vue';
import CopiaWishlistProduct from './Core/Organisms/CopiaWishlistProduct.vue';
import { computed } from '@nuxtjs/composition-api';
import { useUser, productGetters, useMultipleProduct,  } from '@vue-storefront/odoo';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';

import { onSSR } from '@vue-storefront/core';
import { useUiState,  wishlistGetters,useWishlist } from '~/composables';
import { root } from 'postcss';

export default {
  name: 'Wishlist',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    CopiaButton,
    CopiaWishlistProduct,
  },
  setup(props, { root }) {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const { wishlist,  load: loadWishlist } = useWishlist();
    const { addMultipleProductsToCart, loading } = useMultipleProduct();
    const { isAuthenticated } = useUser();
    const products = computed(() => wishlistGetters.getItems(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );

    const formatedProducts = computed(() => products.value.map((item) => ({
      ...item.product,
      quantity: 1
      })))

    const getLocalPathFromWishListItem = (wishlistItem) => {
      return `/p/${productGetters.getId(
        wishlistItem.product
      )}/${productGetters.getSlug(wishlistItem.product)}`;
    };

    const updateProduct=(product)=> {
      const index = formatedProducts.value.findIndex(item => item.id === product.id);
      //root.$set(formatedProducts, index, product)
      formatedProducts.value[index] = product;
    }

    const addItemsToCart = async () => {
      const params = {
        // products: [{
        //   id: product.value.id,
        //   quantity: 1,
        // }],
        products: formatedProducts,
        customQuery: { cartAddMultipleItems: 'copiaCartAddMultipleItem'}
      };
      addMultipleProductsToCart(params);
    }

    onSSR(async () => {
      await Promise.all([ 
        loadWishlist()
      ]);
    });
    return {
      getLocalPathFromWishListItem,
      isAuthenticated,
      formatedProducts,
      // removeItem,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      totals,
      totalItems,
      wishlistGetters,
      productGetters,
      updateProduct,
      products,
      addItemsToCart
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/wishlistSlider.scss';
</style>
