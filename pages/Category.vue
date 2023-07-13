<template>
  <div id="category">
    <BreadCrumbs class="breadcrumbs desktop-only" :breadCrumbs="breadcrumbs" />
    <LazyHydrate when-idle>
      <TopBanner
        class="hidden lg:block"
        v-if="!loading && categoryBanner && $device.isDesktop"
        :image="categoryBanner"
      />
      <!-- <TopBannerMobile v-else :image="categoryBanner"/> -->
    </LazyHydrate>

    <div id="category">
      <Navbar :pagination="pagination" :hasAttributes="hasAttributes"/>
      <div class="main section">
        <LazyHydrate when-idle>
          <SidebarFilters
            :loading="categoryLoading"
            :currentCategory="currentCategory"
            :currentCategoryNameForAccordion="currentCategoryNameForAccordion"
            :categoryTree="categoryTree"
            :currentRootCategory="currentRootCategory"
          />
        </LazyHydrate>
        <SfLoader :class="{ loading }" :loading="loading">
          <div class="lg:p-4" v-if="showProducts">
            <transition-group
              v-if="isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <div
                v-for="(product, i) in products"
                :key="product.id"
                class="w-full flex justify-center"
              >
                <CopiaProductCard
                  data-cy="category-product-card"
                  :product="product"
                  :style="{ '--index': i }"
                />
              </div>
            </transition-group>
            <div v-else>
              <transition-group
                v-if="$device.isDesktop"
                appear
                name="products__slide"
                tag="div"
                class="w-full flex flex-col space-y-2 lg:space-y-5"
              >
                <div
                  v-for="(product, i) in products"
                  :key="product.id"
                  class="w-full products__list"
                >
                  <ProuctHorizontalCard
                    :product="product"
                    :style="{ '--index': i }"
                  />
                </div>
              </transition-group>
              <transition-group v-else>
                <div
                  v-for="(product, i) in products"
                  :key="product.id"
                  class="w-full products__list"
                >
                  <ProductHorizontalCardMobile
                    :product="product"
                    :style="{ '--index': i }"
                  />
                </div>
              </transition-group>
            </div>
            <div
              class="w-full flex justify-center lg:justify-between items-center mt-6"
            >
              <LazyHydrate on-interaction>
                <SfPagination
                  v-if="!loading"
                  data-cy="category-pagination"
                  class="products__pagination"
                  v-show="pagination.totalPages > 1"
                  :current="pagination.currentPage"
                  :total="pagination.totalPages"
                  :visible="5"
                />
              </LazyHydrate>

              <div
                v-show="$device.isDesktop && pagination.totalPages > 1"
                class="products__show-on-page"
              >
                <div class="relative text-left">
                  <div
                    class="flex items-center space-x-2 cursor-pointer pagination_text"
                    :class="showPages ? 'active' : ''"
                  >
                    <span class="products__show-on-page__label">
                      {{ $t('Show on page') }}:
                    </span>
                    <div
                      class="flex space-x-4 items-center"
                      @click="toggleShowPages"
                    >
                      <span class="font-bold">{{ perPage }} Items</span>
                      <svg
                        width="14"
                        height="7"
                        viewBox="0 0 14 7"
                        fill="#000"
                        class="flex-shrink-0 flex-grow-0"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.20913e-08 0.954545L1.12025 1.33588e-08L7 5.07793L12.8798 1.5359e-07L14 0.954546L6.99994 7L7.20913e-08 0.954545Z"
                          fill="#000"
                        />
                      </svg>
                    </div>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-if="showPages"
                      v-click-outside="toggleShowPages"
                      class="origin-top-right absolute right-0 bottom-10 mt-2 w-40 focus:outline-none pagination_menu"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div
                        v-for="option in pagination.pageOptions"
                        :key="option"
                        class="py-1 pagination_item cursor-pointer"
                        :class="option === Number(perPage) ? 'active' : ''"
                        role="none"
                        @click="th.changeItemsPerPage(option)"
                      >
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <h5
                          href="#"
                          class="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                        >
                          {{ option }} items
                        </h5>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
          <div v-else key="no-results" class="w-full flex justify-center">
            <div class="before-results mt-20">
              <SfImage
                :width="256"
                :height="176"
                src="/error/error.svg"
                class="before-results__picture"
                alt="error"
                loading="lazy"
              />
              <p class="before-results__paragraph">
                {{ $t('Sorry, we didnt find what youre looking for') }}
              </p>
              <div class="flex justify-center mt-4">
                <SfButton
                  class="before-results__button color-secondary smartphone-only"
                  @click="$emit('close')"
                  >{{ $t('Go back') }}</SfButton
                >
              </div>
            </div>
          </div>
        </SfLoader>
      </div>

      <BottomBanner class="mt-20" />

      <Promises class="mt-16" />

      <Sidebar :result="result" />
    </div>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfLoader,
  SfColor,
  SfProperty,
  SfImage,
} from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { useCategory } from '@vue-storefront/odoo';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import {
  useUiHelpers,
  useUiState,
  facetGetters,
  useFacet,
} from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import CopiaProductCard from '~/components/Core/Organisms/CopiaProductCard.vue';
import ProuctHorizontalCard from '~/components/Category/ProductHorizontalCard.vue';
import ProductHorizontalCardMobile from '~/components/Category/ProductHorizontalCardMobile.vue';
import TopBanner from '~/components/Category/TopBanner.vue';
import TopBannerMobile from '~/components/Category/TopBannerMobile.vue';
import Navbar from '~/components/Category/Navbar.vue';
import SidebarFilters from '~/components/Category/SidebarFilters.vue';
import BreadCrumbs from '~/components/Core/Atoms/BreadCrumbs.vue';
import BottomBanner from '~/components/Category/BottomBanner.vue';
import Promises from '~/components/Category/Promises.vue';
import Sidebar from '~/components/Category/Sidebar.vue';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';

export default {
  name: 'Category',
  transition: 'fade',
  directives: { clickOutside },
  setup(props, { root }) {
    const th = useUiHelpers();
    const selectedFilters = ref([]);
    const showPages = ref(false);

    const { addTags } = useCache();
    const { categories, search: searchCategories, loading: categoryLoading } = useCategory();
    const uiState = useUiState();
    const { result, search, loading } = useFacet();
    const { params, query } = root.$router.history.current;

    const products = computed(() => facetGetters.getProducts(result.value));

    const toggleShowPages = () => {
      showPages.value = !showPages.value;
    };

    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(categories.value)
    );

    const perPage = computed(() => query.itemsPerPage || 20);
    const sortBy = computed(() =>
      facetGetters.getSortOptions({ input: { sort: query?.sort } } || '')
    );
    const pagination = computed(() => facetGetters.getPagination(result.value));
    const showProducts = computed(
      () => !loading.value && products.value?.length > 0
    );

    const currentRootCategory = computed(() => {
      return (
        categories.value?.find((category) => category.slug === params.slug_1) ||
        {}
      );
    });

    const hasAttributes = computed(() => result.value.data?.attributes?.length > 0);

    const currentCategory = computed(() => {
      return (
        currentRootCategory.value?.childs?.find(
          (category) => category.slug === params.slug_2
        ) || {}
      );
    });

    const currentCategoryNameForAccordion = computed(() => {
      return currentRootCategory.value?.name || '';
    });

    const categoryBanner = computed(
      () => currentRootCategory.value?.bannerImage || null
    );

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs({
        input: {
          params,
          currentRootCategory: currentRootCategory.value,
          currentCategory: currentCategory.value,
        },
      })
    );

    const customQueryProducts = {
      getProductTemplatesList: 'copiaGetProductList',
    };

    onSSR(async () => {
      const params = {
        ...th.getFacetsFromURL(categories.value),
        customQueryProducts,
      };
      await search(params);

      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentRootCategory.value.id || params.slug_2,
        },
      ]);

      if(categories.value.length > 0){
        return;
      }

      await searchCategories({
        pageSize: 100,
        filter: { parent: true },
        customQuery: { getCategory: 'copiaTopCategories' },
      });
    });
    return {
      ...uiState,
      currentRootCategory,
      currentCategory,
      th,
      products,
      categoryTree,
      loading,
      pagination,
      sortBy,
      breadcrumbs,
      selectedFilters,
      showProducts,
      currentCategoryNameForAccordion,
      result,
      perPage,
      showPages,
      toggleShowPages,
      categoryBanner,
      categoryLoading,
      hasAttributes
    };
  },
  components: {
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    SfImage,
    CopiaProductCard,
    ProuctHorizontalCard,
    ProductHorizontalCardMobile,
    TopBanner,
    TopBannerMobile,
    Navbar,
    SidebarFilters,
    BreadCrumbs,
    BottomBanner,
    Promises,
    Sidebar,
    CopiaButton,
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/category.scss';
</style>
