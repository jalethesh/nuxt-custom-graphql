<template>
  <div>
    <SfMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results')"
      class="search"
    >
      <transition name="sf-fade" mode="out-in">
        <div
          v-if="products && products.length > 0"
          key="results"
          class="search__wrapper-results"
        >
          <SfMegaMenuColumn
            :title="$t('Categories')"
            class="sf-mega-menu-column--pined-content-on-mobile search__categories"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                @click="megaMenu.changeActive(title)"
                class="sf-mega-menu-column__header search__header ml-0"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <SfList v-if="categories.length">
              <SfListItem v-for="(category, key) in categories" :key="key">
                <SfMenuItem
                  :label="category.label"
                  :link="uiHelper.getCatLinkForSearch(category)"
                >
                  <template #mobile-nav-icon> &#8203; </template>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn
            :title="$t('Product suggestions')"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <div
              class="results--desktop desktop-only"
              show-text=""
              hide-text=""
            >
              <div class="results-listing">
                <CopiaProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  data-cy="category-product-card"
                  :product="product"
                  :style="{ '--index': index }"
                  :nuxtImgConfig="{ fit: 'cover' }"
                  image-tag="nuxt-img"
                  :show-add-to-cart-button="true"
                  class="result-card products__product-card"
                />
              </div>
              <div class="sf-button--text">
                <SfButton
                  class="sf-button--text custom__text"
                  @click="$emit('close')"
                >
                  {{ $t('See all results') }}
                </SfButton>
              </div>
            </div>
            <div class="results--mobile smartphone-only">
              <CopiaProductCard
                v-for="(product, index) in products"
                :key="index"
                data-cy="category-product-card"
                :product="product"
                :style="{ '--index': index }"
                :nuxtImgConfig="{ fit: 'cover' }"
                image-tag="nuxt-img"
                :show-add-to-cart-button="true"
                class="result-card products__product-card"
              />
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <CopiaButton
              class="action-buttons__button color-secondary mb-4"
              @click="$emit('close')"
            >
              {{ $t('See all results') }}
            </CopiaButton>
            <SfButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
            >
              {{ $t('Cancel') }}
            </SfButton>
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            :width="256"
            :height="176"
            src="/error/error.svg"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <p class="before-results__paragraph">
            {{ $t('You haven’t searched for items yet') }}
          </p>
          <p class="before-results__paragraph">
            {{ $t('Let’s start now – we’ll help you') }}
          </p>
          <CopiaButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </CopiaButton>
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfImage,
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@nuxtjs/composition-api';
import {
  productGetters,
  categoryGetters,
  useWishlist,
} from '@vue-storefront/odoo';
import { useUiHelpers } from '~/composables';

import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import CopiaProductCard from './Core/Organisms/CopiaProductCard.vue';
import CopiaButton from './Core/Atoms/CopiaButton.vue';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage,
    CopiaProductCard,
    CopiaButton
},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Object,
    },
  },
  watch: {
    $route() {
      this.$emit('close');
      this.$emit('removeSearchResults');
    },
  },
  directives: { clickOutside },
  setup(props, { emit }) {
    const uiHelper = useUiHelpers();
    const isSearchOpen = ref(props.visible);
    const products = computed(() => props.result?.products);

    const categories = computed(() => props.result?.categories);
    const { addItem: addItemToWishlist } = useWishlist();

    const goToProduct = (product) => {
      return `/p/${productGetters.getId(product)}/${productGetters.getSlug(
        product
      )}`;
    };
    watch(
      () => props.visible,
      (newVal) => {
        isSearchOpen.value = newVal;

        if (isSearchOpen.value) {
          document.body.classList.add('no-scroll-search');
        } else {
          document.body.classList.remove('no-scroll-search');
          emit('removeSearchResults');
        }
      }
    );
    return {
      addItemToWishlist,
      goToProduct,
      uiHelper,
      isSearchOpen,
      categoryGetters,
      productGetters,
      products,
      categories,
    };
  },
};
</script>
<style lang="scss" scoped>
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
    margin-top: -72px;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1;
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 35vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: 100%;
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.custom__text {
  color: #0468db;
  background: white;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Montserrat';
  padding-top: 40px;
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}
.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) 0;
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
</style>
