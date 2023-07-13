<template>
  <div class="">
    <SfHeader
      class="sf-header--has-mobile-search bg-secondary-yellow justify-between"
      :class="{
        'header-on-top': isSearchOpen,
      }"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath('/')" class="sf-header__logo desktop-only">
          <SfImage
            :width="173"
            :height="52"
            src="/icons/logo.svg"
            alt="Copia Maisha Rahist"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <!-- <template #navigation> &nbsp; </template> -->
      <!-- <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template> -->
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            class="sf-button--pure sf-header__action block text-center"
            @click="handleAccountClick"
          >
            <SfIcon
              :icon="(isAuthenticated && !isWelcomeToCopia)? 'profile_fill' :'account'"
              :class="'m-auto'"
              size="1.25rem"
              color="#1D1F22"
            />
            <p>Profile</p>
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action block text-center"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              class="sf-header__icon m-auto"
              :icon="wishlistHasItems ? 'heart_fill' : 'heart'"
              size="1.3rem"
              color="#1D1F22"
            />
            <p>Favorites</p>
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action block text-center"
            @click="toggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon m-auto"
              icon="empty_cart"
              size="1.4rem"
              color="#1D1F22"
            />

            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
              >{{ cartTotalItems }}</SfBadge
            >
            <p>Cart</p>
          </SfButton>
        </div>
      </template>
      <template #search>
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for products')"
          aria-label="Search"
          class="sf-header__search search-products"
          :value="term"
          :icon="{
            icon: isSearchOpen ? 'cross' : 'search',
            size: '32px',
            color: '#ffffff',
          }"
          @click:icon="closeOrFocusSearchBar"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              class="sf-search-bar__button sf-button--pure"
              @click="closeOrFocusSearchBar"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="18px" icon="cross" />
              </span>
            </SfButton>
            <SfButton
              v-else
              class="sf-search-bar__button sf-button--pure"
              @click="
                isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
              "
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="20px" icon="search" />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </template>
    </SfHeader>
    <SfHeader
      class="sf-subheader"
      :class="$route.path == '/my-account' || $route.path == '/forgot-password/new-password' ? 'sf-subheader-account' : ''"
    >
      <template #navigation>
        <div class="header-links" v-click-outside="closeMenu">
          <div class="dropdown-wrap" v-for="(megaMenu, i) in megaMenuData" :key="i" @click="onMenuShow(i)">
            <div class="flex cursor-pointer items-center">
              <!-- <a :href="megaMenu.url && megaMenu.url" class="custom-link">{{megaMenu.name}} &nbsp;</a> -->
              <a class="custom-link">{{megaMenu.name}} &nbsp;</a>
              <SfIcon
                icon="chevron_down"
                color="#1D1F22"
                viewBox="0 0 16 16"
                size="1rem"
              />
            </div>
            <div class="dropdown" v-if="menuShow[i]">
              <div class="dropdown-in">
                <SfMegaMenu title="Man" visible>
                  <SfMegaMenuColumn class="indi-category" v-for="(megaMenuChild, j) in megaMenu.child" :key="j">
                    <template #title>
                      <SfList class="category-title">
                        <SfListItem><SfMenuItem :label="megaMenuChild.name" :link="localePath(`${megaMenuChild.url}`)"/></SfListItem>
                      </SfList>
                    </template>
                    <div class="flex category-content justify-between">
                      <SfList>
                        <SfListItem v-for="(menuitem, k) in megaMenuChild.child" :key="k"><SfMenuItem :label="menuitem.name" :link="localePath(`${menuitem.url}`)"/></SfListItem>
                      </SfList>
                    </div>
                  </SfMegaMenuColumn>
                  <SfMegaMenuColumn
                    v-if="!!megaMenu.image"
                    class="sf-mega-menu-column--pined-content-on-mobile sf-mega-menu-column--hide-header-on-mobile indi-category"
                  >
                    <div class="desktop-only">
                      <SfBanner
                        :image="{
                          mobile:
                            '/assets/storybook/SfMegaMenu/bannerBeachBag.jpg',
                          desktop: $image(megaMenu.image),
                        }"
                        button-text="Learn More"
                        class="category-banner"
                        :link="localePath(`${megaMenu.url}`)"
                      />
                    </div>
                  </SfMegaMenuColumn>
                </SfMegaMenu>
              </div>
            </div>
          </div>
          <!-- <div class="dropdown-wrap">
            <div class="flex cursor-pointer items-center">
              <a href="/" class="custom-link">Fashion & Beauty &nbsp;</a>
              <SfIcon
                icon="chevron_down"
                color="#1D1F22"
                viewBox="0 0 16 16"
                size="1rem"
              />
            </div>
            <div class="dropdown">
              <div class="dropdown-in">
                <SfMegaMenu title="Man" visible>
                  <SfMegaMenuColumn title="FASHION" class="indi-category">
                    <template #title>
                      <SfList class="category-title">
                        <SfListItem><SfMenuItem label="FASHION" /></SfListItem>
                      </SfList>
                    </template>
                    <div class="flex category-content justify-between">
                      <SfList>
                        <SfListItem><SfMenuItem label="Skirts" /></SfListItem>
                        <SfListItem><SfMenuItem label="Sweaters" /></SfListItem>
                        <SfListItem><SfMenuItem label="Dresses" /></SfListItem>
                        <SfListItem><SfMenuItem label="TShirts" /></SfListItem>
                        <SfListItem><SfMenuItem label="Pants" /></SfListItem>
                        <SfListItem
                          ><SfMenuItem label="Underwear"
                        /></SfListItem>
                        <SfListItem><SfMenuItem label="Jackets" /></SfListItem>
                        <SfListItem><SfMenuItem label="Blouses" /></SfListItem>
                      </SfList>
                      <SfList>
                        <SfListItem
                          ><SfMenuItem label="Bags & Purses"
                        /></SfListItem>
                        <SfListItem><SfMenuItem label="Belts" /></SfListItem>
                        <SfListItem><SfMenuItem label="Gloves" /></SfListItem>
                        <SfListItem><SfMenuItem label="Hats" /></SfListItem>
                      </SfList>
                    </div>
                  </SfMegaMenuColumn>
                  <SfMegaMenuColumn title="BEAUTY" class="indi-category">
                    <template #title>
                      <SfList class="category-title">
                        <SfListItem><SfMenuItem label="BEAUTY" /></SfListItem>
                      </SfList>
                    </template>
                    <div class="flex category-content">
                      <SfList>
                        <SfListItem><SfMenuItem label="Boots" /></SfListItem>
                        <SfListItem><SfMenuItem label="Heels" /></SfListItem>
                        <SfListItem><SfMenuItem label="Loafers" /></SfListItem>
                        <SfListItem><SfMenuItem label="Sandals" /></SfListItem>
                        <SfListItem><SfMenuItem label="Slippers" /></SfListItem>
                        <SfListItem><SfMenuItem label="Trainers" /></SfListItem>
                      </SfList>
                    </div>
                  </SfMegaMenuColumn>
                  <SfMegaMenuColumn
                    class="sf-mega-menu-column--pined-content-on-mobile sf-mega-menu-column--hide-header-on-mobile indi-category"
                  >
                    <div class="desktop-only">
                      <SfBanner
                        :image="{
                          mobile:
                            '/assets/storybook/SfMegaMenu/bannerBeachBag.jpg',
                          desktop: addBasePath('/homepage/banner3.png'),
                        }"
                        button-text="Learn More"
                        class="category-banner"
                      />
                    </div>
                  </SfMegaMenuColumn>
                </SfMegaMenu>
              </div>
            </div>
          </div> -->
        </div>
      
      </template>
      
      <template #search> &nbsp; </template>
      <template #header-icons> &nbsp; </template>
    </SfHeader>
    <!-- <div>
      <div v-html="megaMenu">
      </div>
    </div> -->
    <MobileMenu />
    <SearchResults
      :visible="isSearchOpen"
      :result="formatedResult"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import {
  SfImage,
  SfSearchBar,
  SfIcon,
  SfButton,
  SfOverlay,
  SfBadge,
  SfHeader,
  SfMegaMenu,
  SfList,
  SfMenuItem,
  SfBanner,
} from '@storefront-ui/vue';
import MobileMenu from './MobileMenu';
import { addBasePath } from '@vue-storefront/core';
import { useUiState } from '~/composables';
import {
  useCart,
  useUser,
  cartGetters,
  categoryGetters,
  useCategory,
  useFacet,
  useWishlist,
} from '@vue-storefront/odoo';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import {
  useMegaMenu,
} from '../composables';
import LocaleSelector from './LocaleSelector';
import SearchResults from '~/components/SearchResults';

import debounce from 'lodash.debounce';
import { mapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer.js';

export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    LocaleSelector,
    SearchResults,
    SfOverlay,
    SfBadge,
    SfMegaMenu,
    SfList,
    SfMenuItem,
    SfBanner,
    MobileMenu,
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);
    const isSearchOpen = ref(false);

    const { changeSearchTerm } = useUiHelpers();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, isWelcomeToCopia } =
      useUiState();
    const {
      megaMenu,
      error: errorMegaMenu,
      loading: loadingMegaMenu,
      searchMegaMenu,
    } = useMegaMenu();
    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { load: loadWishlist, wishlist } = useWishlist();
    const { search: searchProductApi, result } = useFacet('AppHeader:Search');
    const { categories: topCategories, search: searchTopCategoryApi } =
      useCategory('AppHeader:TopCategories');

    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const megaMenuData = computed(() => megaMenu?.value?.websiteMenu);
    const menuShow = ref([false, false, false, false, false, false, false, false, false]);
    const onMenuShow = (index) =>{
     menuShow.value = menuShow.value.map((item, i)=>
     {
        if(index === i){
           return !item
        }
        else{
          return false;
        }
      }
      );
    }

    const closeMenu = () =>{
      menuShow.value = menuShow.value.map((item, i)=> false );
    }
    
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const removeSearchResults = () => {
      formatedResult.value = null;
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      if (term.value.length < 2) return;


    const customQueryProducts = {
      getProductTemplatesList: 'copiaGetProductList',
    };

      await searchProductApi({
        search: term.value,
        pageSize: 12,
        currentPage: 1,
        fetchCategory: true,
        customQueryProducts
      });

      formatedResult.value = {
        products: result?.value?.data?.products,
        categories: result?.value?.data?.categories
          .filter((category) => category.childs === null)
          .map((category) => categoryGetters.getTree(category)),
      };
    }, 100);
    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      if (isSearchOpen.value) {
        return closeSearch();
      }
      isSearchOpen.value = true;
      term.value = '';
      return searchBarRef.value.$el.children[0].focus();
    };
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    const filteredTopCategories = computed(() =>
      // TODO: need to header menu decide base on the demand
      topCategories.value.filter((cat) => cat)
    );

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );

    onSSR(async () => {
      await Promise.all([
       /*  searchTopCategoryApi({
          filter: { parent: true },
        }), */
        searchMegaMenu(),
        loadUser(),
        loadWishlist(),
        loadCart({ customQuery: { cartLoad: 'copiaCartLoad' } }),
      ]);
    });

    return {
      wishlistHasItems: computed(
        () => wishlist.value?.wishlistItems?.length > 0
      ),
      filteredTopCategories,
      accountIcon,
      closeOrFocusSearchBar,
      cartTotalItems,
      removeSearchResults,
      isSearchOpen,
      searchBarRef,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      formatedResult,
      term,
      isMobile,
      handleSearch,
      closeSearch,
      addBasePath,
      isAuthenticated,
      megaMenuData,
      isWelcomeToCopia,
      menuShow,
      onMenuShow,
      closeMenu
    };
  },
};
</script>

<style lang="scss" scoped>
.category-banner {
  --banner-background-size: cover;
  --c-link-hover:white;
  --button-width: auto;
  .sf-button {
    position: absolute;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    font-family: 'Lato';
  }
}
.indi-category {
  width: 25%;
  margin-right: 5%;
}
.indi-category:nth-child(3) {
  width: 357px;
}
.category-title {
  padding-bottom: 10px;
  border-bottom: 3px solid #1d1f22;
  margin-bottom: 20px;
}
.header-links {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.dropdown {
  position: absolute;
  width: 100vw;
  left: 0;
  z-index: 10;
}
.dropdown-in {
  margin-top: 24px;
}
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-mobile {
    --header-padding: 8px;
  }
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
  &__wrapper {
    background: white;

    &__search {
      & input {
        --input-background: white;
        --input-font-size: 14px;
        --input-font-familiy: 'Montserrat';
        --input-color: #1d1f22;
        --c-text: #1d1f22;
        // .sf-icon {
        //   --icon-size: 32px;
        //   background: #e81e2b;
        // }
      }
    }
  }
}
.search-products {
  font-family: 'Montserrat';
  color: white;
  font-size: 14px;
  background: white;
  border-radius: 20px;
  padding: 9px 4px 9px 15px;
  border-bottom: #fafafa;
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}
.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.sf-header.sf-subheader {
  border-top: 3px solid #e81e2b;
  @include for-mobile {
    border: 0;
    display: none;
  }
  background: #fafafa;
  position: relative;
  .sf-header__wrapper {
    background-color: #fafafa;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
.dropdown {
  // display: none;
}
.dropdown-wrap:hover .dropdown {
  // display: block;
}
.dropdown-wrap:hover .custom-link {
  color: #e81e2b;
}
.custom-link {
  font-size: 16px;
  font-weight: 700;
  font-family: 'Montserrat';
  line-height: 24px;
}
</style>
<style lang="scss">
.search-products {
  @include for-desktop {
    margin-right: 20%;
  }
  .sf-input__icon {
    background: #e81e2b;
    padding: 2.5px;
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 100%;
  }
  .sf-icon svg,
  .sf-icon img {
    width: 16px;
    height: 16px;
  }
  input:focus-visible {
    outline: none !important;
  }
}
.sf-subheader {
  .sf-header__navigation {
    width: 100%;
  }
}
.sf-subheader-account {
  box-shadow: none !important;
  .sf-header__wrapper {
    display: none;
  }
}
</style>
<style lang="scss">
.category-banner {
  .sf-button {
    border-radius: 8px;
    font-family: 'Lato';
    position: absolute;
    bottom: 10%;
    transform: translate(43px, -15px);
    width: auto;
  }
}

.sf-subheader{
  .indi-category{
    .category-title{
      .sf-list__item{
        margin: 0;
        .sf-menu-item__label{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        color: #1D1F22;
        }
      }
    }
  }
}
.sf-subheader{
  .category-title{
    .sf-menu-item:hover {
    .sf-menu-item__label {
      color: #e81e2b;
    }
  }
  }
}
.sf-subheader{

.category-content {
  .sf-menu-item:hover {
    .sf-menu-item__label {
      color: #e81e2b;
      text-decoration: underline;
    }
  }
  .sf-menu-item__label {
    font-size: 16px;
    font-weight: 400;
    font-family: 'Lato';
    margin-bottom: 10px;
    
  }
}
}
.sf-subheader{

.dropdown {
  .sf-mega-menu__menu {
    justify-content: flex-start;
  }
  .sf-menu-item__label {
    font-size: 16px;
  }
}
.dropdown-wrap:hover .sf-icon {
  --icon-color: #e81e2b !important;
}
.dropdown .sf-mega-menu__content {
  padding-right: 0;
  padding-left: 0;
}
}

.sf-subheader {
  .sf-header__wrapper {
    background: #fafafa;
    @include for-desktop {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
}

.sf-subheader{
  .sf-mega-menu-column__content{
    @include for-desktop{
      padding-right: 50px;
    }
  }
  .sf-mega-menu-column:nth-child(3){
    
  .sf-mega-menu-column__content{
    @include for-desktop{
      // margin-top: -30px;
      padding-right: 0px;
    }
  }
  }
}
</style>
