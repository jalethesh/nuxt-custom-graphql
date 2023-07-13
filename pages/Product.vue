<template>
  <div id="product">
    <nav aria-label="breadcrumb" class="desktop-only">
      <ol class="breadcrumbs__list">
        <li
          class="breadcrumbs__list-item"
          v-for="(bread, i) in breadcrumbs"
          :key="i"
          :aria-current="false"
        >
          <router-link :to="bread.link">
            <span>{{ bread.text }}</span>
          </router-link>
        </li>

        <li class="breadcrumbs__list-item breadcrumbs__list-item--last">
          <span>{{ name }}</span>
        </li>
      </ol>
    </nav>

    <div class="product lg:grid lg:grid-cols-2">
      <LazyHydrate when-idle>
        <div id="product-gallery">
          <SfGallery
            class="product__gallery"
            :images="productGallery"
            :imageWidth="450"
            :imageHeight="665"
            :thumb-width="161"
            :thumb-height="161"
            :nuxt-img-config="{
              format: 'webp',
              fit: 'cover',
            }"
            :thumb-nuxt-img-config="{ fit: 'cover' }"
            image-tag="nuxt-img"
            thumb-image-tag="nuxt-img"
          >
          </SfGallery>

          <span v-if="getWarrantyBadge" class="product-badge label">
            {{ getWarrantyBadge }}
          </span>

          <span class="add-to-wishlist">
            <SfButton class="sf-button--pure sf-header__action"
              @click="
                isInWishlist({ product })
                  ? removeItemFromWishlist({ product: { product } })
                  : addItemToWishlist({ product })
              "
            >
              <SfIcon v-if="isInWishlist({ product })" class="sf-header__icon" :icon="'heart_fill'" size="1.25rem" />
              <SfIcon v-else class="sf-header__icon" :icon="'heart'" size="1.25rem" />
            </SfButton>
          </span>

          <span class="add-to-compare desktop-only" @click="addToCompare(productGetters.getId(product))">
            <SfButton class="sf-button--pure sf-header__action">
              <SfImage
                :src="addBasePath('/icons/compare.svg')"
                :width="24"
                :height="24"
                alt="Compare"
              />
            </SfButton>
          </span>
        </div>
      </LazyHydrate>

      <div class="product__info">
        <p class="label sf-heading--left label-red">SKU: {{ code }}</p>

        <div class="product__header">
          <h2 class="sf-heading--no-underline sf-heading--left">
            {{ name }}
          </h2>
        </div>

        <div class="product__price-and-rating my-8">
          <SfPrice
            :regular="productGetters.productHasDiscount() ? $n(productGetters.getPriceBeforeDiscount(product).toFixed(2), 'currency') : $n(productGetters.getActualPrice(product).toFixed(2), 'currency')"
            :special="productGetters.productHasDiscount() ? $n(productGetters.getActualPrice(product).toFixed(2), 'currency') : ''"
          />
        </div>

        <div>
          <div v-if="options.select">
            <SfSelect
              v-for="(select, selectKey) in options.select"
              :key="selectKey"
              class="sf-select--underlined"
              :value="$route.query[select.label.replace(' ', '+')]"
              :label="select.label"
              required
              @input="(selected) => updateFilter({ [select.label.replace(' ', '+')]: selected })"
            >
              <SfSelectOption
                :key="`${selectKey}_${itemKey}`"
                :value="item.value"
                :label="item.label"
                v-for="(item, itemKey) in select.values"
              >
              </SfSelectOption>
            </SfSelect>
          </div>

          <div v-if="options.radio">
            <template v-for="(radio, radioKey) in options.radio">
              <p class="product__radio-label" :key="radioKey">
                {{ radio.label }}:
              </p>
              <SfRadio
                class="sf-radio--transparent"
                v-for="(item, itemKey) in radio.values"
                required
                :key="`${radioKey}_${itemKey}`"
                :selected="$route.query[radio.label.replace(' ', '+')]"
                :name="radio.label"
                :value="item.value"
                :label="item.label"
                @change="updateFilter({ [radio.label.replace(' ', '+')]: item.value })"
              />
            </template>
          </div>

          <div v-if="options.color" class="product__colors desktop-only">
            <template v-for="(option, colorKey) in options.color">
              <p class="product__color-label" :key="colorKey">
                {{ $t('Color') }}:
              </p>

              <SfColor
                required
                v-for="(color, itemKey) in option.values"
                :key="`${colorKey}_${itemKey}`"
                :color="color.label"
                class="product__color"
                :selected="checkSelected(option.label.replace(' ', '+'), color.value)"
                @click="updateFilter({ [option.label.replace(' ', '+')]: color.value })"
              >
              </SfColor>
            </template>
          </div>

          <SfAddToCart
            v-if="maxQuantity > 0"
            id="add-to-cart"
            data-cy="product-cart_add"
            :stock="stock"
            :canAddToCart="stock > 0"
            class="product__add-to-cart mb-16 desktop-only"
          >
            <template #add-to-cart-btn>
              <CopiaButton
                @click="addItem({ product: product, quantity: parseInt(quantity) })"                
                :disabled="loading || !allOptionsSelected || quantity > maxQuantity || quantity <= 0"
              >
                Add to cart
              </CopiaButton>
            </template>

            <template #quantity-select-input>
              <div id="add-to-cart--quantity-options">
                <button
                  id="add-to-cart--decrease"
                  @click="quantity--;"
                  :disabled="quantity <= 1"
                >
                  <img
                    :src="addBasePath('/icons/add-cart-minus-icon.svg')"
                    alt=""
                  />
                </button>

                <input
                  type="number"
                  v-model="quantity"
                  class="input-number-arrow-hide"
                />

                <button id="add-to-cart--increase" @click="quantity++" :disabled="quantity>=maxQuantity">
                  <img
                    :src="addBasePath('/icons/add-cart-plus-icon.svg')"
                    alt=""
                  />
                </button>
              </div>
            </template>
          </SfAddToCart>
          <CopiaNotification
            v-else-if="maxQuantity === 0"
            :message="$t('Out of stock')"
            type="error"
            class="mb-4"
          />
          <div v-else class="mb-16" />
        </div>

        <section class="social-links-sharer--row">
          <SocialLinkSharer :product="mock_product" />
        </section>
      </div>

      <LazyHydrate when-idle>
        <SfTabs :open-tab="1">
          <SfTab v-if="description" data-cy="product-tab_description" title="Description">
            <p>
              {{ description }}
            </p>

            <!-- <SfProperty
              v-for="attribute in attributes"
              :key="attribute.id"
              :name="attribute.name"
              :value="attribute.value"
              class="product__property product__property--title"
            >
              <template #value>
                <button
                  class="product__property__button product__property--button button--text"
                >
                  {{ attribute.value }}
                </button>
              </template>
            </SfProperty> -->
          </SfTab>

          <SfTab
            title="Returns &amp; Refunds"
            data-cy="product-tab_additional"
          >
            <h3 class="product__additional-info__title">
              {{ $t('Brand') }}
            </h3>
            <p>{{ brand }}</p>
            <h3 class="product__additional-info__title">
              {{ $t('Instruction1') }}
            </h3>
            <p class="product__additional-info__paragraph">
              {{ $t('Instruction2') }}
            </p>
            <p class="product__additional-info__paragraph">
              {{ $t('Instruction3') }}
            </p>
            <p>{{ careInstructions }}</p>
          </SfTab>
        </SfTabs>
      </LazyHydrate>

      <LazyHydrate when-idle>
        <SmallBanner
          title="This Week"
          subtitle="Amazing Offers"
          buttonText="Learn More"
          image="/productpage/amazing-offer-image.png"
          link="/"
        />
      </LazyHydrate>
    </div>

    <LazyHydrate when-visible>
      <section
        id="related-items-viewed"
        class="mt-10"
        v-if="relatedProducts && relatedProducts.length > 0"
      >
        <div
          class="flex justify-between items-center lg:py-10 py-3 lg:border-b-0 border-b"
        >
          <h3>Related to items you've viewed</h3>
          <nuxt-link :to="localePath('#')" class="flex items-center">
            <p class="mr-2 font-bold desktop-only">{{ $t('See all') }}</p>
            <p class="mr-2 font-bold smartphone-only text-sm underline">
              {{ $t('See all') }}
            </p>
            <SfIcon
              icon="chevron_right"
              size="14px"
              color="black"
              :class="'desktop-only'"
            />
          </nuxt-link>
        </div>

        <RelatedProducts :products="relatedProducts" />
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section
        v-if="recentProducts && recentProducts.length > 0"
        id="recently-viewed-items"
        class="mt-5 lg:mt-10"
      >
        <div
          class="flex justify-between items-center lg:py-10 py-3 lg:border-b-0 border-b"
        >
          <h3>Recently viewed items</h3>
          <nuxt-link :to="localePath('#')" class="flex items-center">
            <p class="mr-2 font-bold desktop-only">{{ $t('See all') }}</p>
            <p class="mr-2 font-bold smartphone-only text-sm underline">
              {{ $t('See all') }}
            </p>
            <SfIcon
              icon="chevron_right"
              size="14px"
              color="black"
              :class="'desktop-only'"
            />
          </nuxt-link>
        </div>

        <RelatedProducts :products="recentProducts" :loading="recentLoading" />
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        :image="
          addBasePath('/productpage/copia-pesa-recommending-learn-how.png')
        "
        class="call-to-action my-5 lg:my-10 desktop-only"
      >
        <template #button>
          <SfButton
            class="sf-call-to-action__button color-secondary mr-20"
            data-testid="cta-button"
            @click="toggleNewsletterModal"
          >
            {{ $t('Learn how') }}
          </SfButton>
        </template>
      </SfCallToAction>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SfCallToAction
        title
        button-text="Subscribe"
        description
        :image="addBasePath('/productpage/mobile-subscribe-banner.png')"
        class="smartphone-only h-72"
      >
        <template #button>
          <SfButton
            class="sf-call-to-action__button color-secondary"
            data-testid="cta-button"
            @click="toggleNewsletterModal"
            >{{ $t('Learn More') }}</SfButton
          >
        </template>
      </SfCallToAction>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section id="our-promise-footer">
        <h3 class="py-5 lg:py-10">Our Promise</h3>

        <section class="grid lg:grid-cols-4 md:grid-cols-2 gap-4 desktop-only">
          <article
            v-for="(hero, i) in heroes"
            :key="i"
            class="flex bg-light-accent items-center content-arount p-6 space-x-1"
          >
            <img
              :src="addBasePath(hero.img)"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>{{ hero.title }}</h5>
              <span class="text-small">
                {{ hero.text }}
              </span>
            </div>
          </article>
        </section>
        <SfHero class="smartphone-only mb-10">
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-2"
          >
            <img
              :src="addBasePath('/icons/product-icon-collor-palette.svg')"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Unique Everything</h5>
              <span class="text-small">
                We have millions of one-of-a-kind<br />
                items in our shop
              </span>
            </div>
          </div>
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-4"
          >
            <img
              :src="addBasePath('/icons/product-icon-delivery.svg')"
              alt
              id="unique-everything--image"
              class="flex-none"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Free delivery &amp; return</h5>
              <span class="text-small">
                Copia will deliver your goods to your<br />
                nearest delivery point in 2-4 days
              </span>
            </div>
          </div>
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-2"
          >
            <img
              :src="addBasePath('/icons/product-icon-padlock.svg')"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Secure payments</h5>
              <span class="text-small">
                Your information is treated securely.
              </span>
            </div>
          </div>
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-2"
          >
            <img
              :src="addBasePath('/icons/product-icon-chat.svg')"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Customer support</h5>
              <p class="text-small">
                We are here to assist you. If you need<br />
                help call 0709 339 000
              </p>
            </div>
          </div>
        </SfHero>
      </section>
    </LazyHydrate>
  </div>
</template>

<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfRadio,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfColorPicker,
  SfLoader,
  SfCallToAction,
  SfHero,
} from '@storefront-ui/vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import SocialLinkSharer from '~/components/SocialLinkSharer.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import SmallBanner from '~/components/SmallBanner.vue';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';
import CopiaNotification from '~/components/Core/Atoms/CopiaNotification.vue';

import {
  ref,
  computed,
  reactive,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import {
  useProduct,
  useFacet,
  useCart,
  useWishlist,
  facetGetters,
  useReview,
  useProductVariant,
  reviewGetters,
} from '@vue-storefront/odoo';
import { useUiState, productGetters, useCompareProducts } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { addBasePath } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Product',
  transition: "fade",
  setup(props, { root }) {
    const quantity = ref(1);
    const { id } = root.$route.params;
    const { toggleNewsletterModal } = useUiState();
    const { addToCompare } = useCompareProducts();

    const { query } = root.$route;
    const { size, color } = root.$route.query;
    const configuration = reactive({ size, color });
    const { $cookies } = useContext();

    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishlist,
      wishlist,
      load: loadWishlist,
      isInWishlist,
    } = useWishlist();

    const {
      products,
      search,
      loading: productloading,
    } = useProduct(`products`);
    const {
      result,
      search: searchRecentProducts,
      loading: recentLoading,
    } = useFacet(`recentProducts`);

    const { searchRealProduct, productVariants, realProduct, elementNames } =
      useProductVariant(query);

    const { addItem, loading } = useCart();

    const { addTags } = useCache();

    const { reviews: productReviews } = useReview('productReviews');

    const product = computed(() => {
      return {
        ...products.value,
        // ...productGetters.getFiltered(products.value, { master: true }),
        realProduct: realProduct.value,
      };
    });

    const recentProducts = computed(() =>
      facetGetters.getProducts(result.value)
    );

    const name = computed(() => productGetters.getName(product.value));

    const options = computed(() =>
      productGetters.getAttributes(product.value, ['color', 'size'])
    );

    const description = computed(() =>
      productGetters.getDescription(product.value)
    );
    const properties = computed(() =>
      productGetters.getProperties(product.value)
    );
    const code = computed(() => productGetters.getCode(product.value));

    const breadcrumbs = computed(() => {
      const category = product.value.categories?.find((cat) => cat.name !== 'All');
      const breadcrumbs = [{ text: 'Home', link: '/' }];

      if (!category) {
        return [];
      }

      const topCategoryParent = category.parent === null ? category.id : category.parent?.id;
      const splited = category.slug?.split('-');
      breadcrumbs.push({
        text: splited[0],
        link: `/c/${splited[0]}/${topCategoryParent}`
      });

      return breadcrumbs || [];
    });

    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value)
    );

    const maxQuantity = computed(() => 
      product.value.realProduct ?
        ( product.value.realProduct.product.qty ? product.value.realProduct.product.qty : 0 ) :
        (product.value.productVariants?.length <= 1  ? product?.value?.productVariants[0].qty : -1)
    );

    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: root.$image(img.small) },
        desktop: { url: root.$image(img.normal) },
        big: { url: root.$image(img.big) },
        alt: product.value.name || 'alt',
      }))
    );
    const getWarrantyBadge = computed(() => {
      let object_found = mock_product.attributes.filter((atr) => {
        return atr.name == 'warranty';
      });
      return object_found[0].value || null;
    });

    const attributes = computed(() =>
      productGetters.getAttributes(product.value)
    );
    
    console.log('query:', root.$route.query);
    console.log('options:', options);
    console.log('max:', maxQuantity);
    console.log('realProduct:', realProduct);
    console.log('productGallery:', productGetters.getGallery(product.value));

    // if (!products.value.length) root.$nuxt.error({ statusCode: 404, isProduct404: true });
    

    onSSR(async () => {
      await searchRealProduct({
        productTemplateId: parseInt(id),
        combinationIds: Object.values(root.$route.query),
        customQuery: {
          getRealProduct: 'getProductVariant'
        }
      });
      await search({
        id: parseInt(id),
        customQuery: {
          getProductTemplate: 'getProduct',
        },
      });
      
      if (!productGetters.getId(product.value)) root.$nuxt.error({ statusCode: 404, isProduct404: true });

      await searchRecentProducts({
        customQueryProducts: {
          getProductTemplatesList: 'getProductsList',
          metadata: {
            filters: {
              ids: $cookies.get('recent-products', { parseJSON: true })
                ? $cookies.get('recent-products', { parseJSON: true })
                    .filter((productId) => productId != id)
                : [0],
            },
          },
        },
      });

      (() => {
        let recentProductIds = $cookies.get('recent-products', {
          parseJSON: true,
        });

        if (recentProductIds === undefined) {
          recentProductIds = [ parseInt(id), 0 ];
        } else if (recentProductIds.indexOf(parseInt(id)) === -1) {
          recentProductIds.push(parseInt(id));
        }
        $cookies.set(
          'recent-products',
          JSON.stringify(recentProductIds.slice(-8)),
          { maxAge: 60 * 60 * 24 * 7, path: '/' }
        );
      })();

      addTags([{ prefix: CacheTagPrefix.Product, value: id }]);
      
      await loadWishlist();
    });

    const updateFilter = (filter) => {
      root.$router.push({
        path: root.$route.path,
        query: { ...root.$route.query, ...filter },
      });
    };

    const allOptionsSelected = computed(() => {
      let keys = [];
      Object.keys(options.value).forEach((item) => {
        keys = [
          ...options.value[item].map((element) => element.label.replace(' ', '+')),
          ...keys,
        ];
      });
      const queryParams = Object.keys(root.$route.query);

      return keys.every((param) => queryParams.includes(param));
    });

    const checkSelected = (attribute, value) => {
      return root.$route.query[attribute] === value;
    };

    const mock_product = reactive({
      name: 'Armco DVD-MX405AC – 2.1Ch DVD Player – AC/DC – USB Movies',
      description: `The Karissa V-Neck Tee features a semi-fitted shape that's flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women's cocktail dresses and party dresses.`,
      images: [
        {
          mobile: { url: addBasePath('/productpage/real-example-image.png') },
          desktop: { url: addBasePath('/productpage/real-example-image.png') },
          big: { url: addBasePath('/productpage/real-example-image.png') },
          alt: 'Product A',
        },
        {
          mobile: { url: addBasePath('/productpage/real-example-image.png') },
          desktop: { url: addBasePath('/productpage/real-example-image.png') },
          big: { url: addBasePath('/productpage/real-example-image.png') },
          alt: 'Product B',
        },
        {
          mobile: { url: addBasePath('/productpage/real-example-image.png') },
          desktop: { url: addBasePath('/productpage/real-example-image.png') },
          big: { url: addBasePath('/productpage/real-example-image.png') },
          alt: 'Product M',
        },
        {
          mobile: { url: addBasePath('/productpage/real-example-image.png') },
          desktop: { url: addBasePath('/productpage/real-example-image.png') },
          big: { url: addBasePath('/productpage/real-example-image.png') },
          alt: 'Product B',
        },
      ],
      price: 2840.0,
      special_price: null,
      attributes: [
        {
          name: 'SKU',
          value: 'KF675',
        },
        {
          name: 'Material',
          value: 'Plastic',
        },
        {
          name: 'Category',
          value: 'DVD Players',
        },
        {
          name: 'Country',
          value: 'Poland',
        },
        {
          name: 'warranty',
          value: '2 years warranty',
        },
      ],
      reviews: [
        {
          author: 'Jane D.Smith',
          date: 'April 2019',
          message:
            'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can comment on interlation as I had an electrition instal it. Would recommend.',
          rating: {
            max: 5,
            rate: 4,
          },
        },
        {
          author: 'Jane D.Smith',
          date: 'April 2019',
          message:
            'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can comment on interlation as I had an electrition instal it. Would recommend.',
          rating: {
            max: 5,
            rate: 4,
          },
        },
      ],
      returns_and_refunds:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et finibus risus, at eleifend magna. Vestibulum eleifend lorem quis viverra posuere. Quisque venenatis vulputate est at elementum. Sed in tellus mattis dolor tempus laoreet quis vel mauris.',
    });

    const heroes = ref([
      {
        img: '/icons/product-icon-collor-palette.svg',
        title: 'Unique Everything',
        text: 'We have millions of one-of-a-kind items in our shop',
      },
      {
        img: '/icons/product-icon-delivery.svg',
        title: 'Free delivery & return',
        text: 'Copia will deliver your goods to your nearest delivery point in 2-4 days',
      },
      {
        img: '/icons/product-icon-padlock.svg',
        title: 'Secure payments',
        text: 'Your information is treated securely.',
      },
      {
        img: '/icons/product-icon-chat.svg',
        title: 'Customer support',
        text: 'We are here to assist you. If you need help call 0709 339 000',
      },
    ]);

    return {
      productGetters,
      toggleNewsletterModal,
      mock_product,
      addBasePath,
      productloading,
      breadcrumbs,
      allOptionsSelected,
      checkSelected,
      elementNames,
      updateFilter,
      configuration,
      product,
      recentProducts,
      recentLoading,
      name,
      attributes,
      productGallery,
      code,
      description,
      properties,
      reviews,
      maxQuantity,
      reviewGetters,
      getWarrantyBadge,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      relatedProducts: computed(
        () =>
          product.value.alternativeProducts
      ),
      options,
      quantity,
      addItem,
      loading,
      productVariants,
      heroes,
      addItemToWishlist,
      removeItemFromWishlist,
      isInWishlist,
      addToCompare,
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfRadio,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    SfLoader,
    RelatedProducts,
    MobileStoreBanner,
    SfColorPicker,
    LazyHydrate,
    SfCallToAction,
    SocialLinkSharer,
    SfHero,
    SmallBanner,
    CopiaButton,
    CopiaNotification,
    CopiaNotification
},
  data() {
    return {
      stock: 5,
      detailsIsActive: false,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
    };
  },
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product {
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      margin: 0 0 0 7.5rem;
    }
    @include for-mobile {
      margin: var(--spacer-sm);
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
    position: absolute;
    left: 50px;
    bottom: 200px;
  }
  &__price-and-rating {
    margin: var(--spacer-lg) 0;
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__radio-label {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }

  & .product__info {
    & .sf-heading--left {
      color: #43464e;
      font-weight: 700;
    }
  }

  & .sf-price {
    flex-direction: column;
    align-items: flex-start;
    .sf-price__old {
      font-weight: 900 !important;
      font-size: var(--font-size--base);
    }
    .sf-price__special, .sf-price__regular {
      font-weight: 900 !important;
      font-size: 24px;
    }
  }
  
  & .sf-tabs {
    height: fit-content;    
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
  text-transform: capitalize;
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

#social-links-sharer {
  margin-top: 0px;
}

#related-items-viewed,
#recently-viewed-items {
  @include for-mobile {
    margin: 0 var(--spacer-sm);
    & h3 {
      font-family: 'Raleway' !important;
    }
  }
}

#our-promise-footer {
  @include for-mobile {
    padding: 0 var(--spacer-sm);
  }
}

#our-promise-footer .card {
  background: #f1f2f3;
  height: 140px;
  width: 298px;
}

#our-promise-footer .card > div {
  padding: 36px 27px;
  display: flex;
}

#our-promise-footer .flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#our-promise-footer .card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

#unique-everything--image {
  width: 41px;
  height: 41px;
}

#free-delivery--image {
  width: 53px;
  height: 53px;
}

#secure-payment--image {
  width: 27px;
  height: 36px;
}

#customer-support--image {
  width: 44px;
  height: 44px;
}

.label-red {
  color: #e81e2b !important;
}

#add-to-cart input {
  font-family: 'Lato';
}

div#add-to-cart--quantity-options {
  position: relative;
  font-family: Lato;
  //background: #f1f2f3;
}

div#add-to-cart--quantity-options button {
  position: absolute;
  top: 10px;
}

div#add-to-cart--quantity-options input {
  background: #f1f2f3;
  padding: 12px 48px;
  width: 108px;
  margin-right: 32px;
}

#add-to-cart--decrease {
  position: absolute;
  top: 10px;
  left: 3px;
}

#add-to-cart--increase {
  position: absolute;
  top: 6px;
  right: calc(3px + 32px);
}

.input-number-arrow-hide::-webkit-outer-spin-button,
.input-number-arrow-hide::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-number-arrow-hide {
  -moz-appearance: textfield;
}

.breadcrumbs__list {
  display: flex;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 14px;
  color: #72757e;
  margin: 40px 0 24px;
  text-transform: capitalize;
}

.breadcrumbs__list .breadcrumbs__list-item:not(:last-child)::after {
  content: url('/icons/breadcrumb-arrow-right.svg');
  margin-left: 20px;
  margin-right: 20px;
}

.breadcrumbs__list-item--last {
  color: #e81e2b;
}

.sf-gallery {
  @include for-mobile {
    align-items: center;
  }
}
.product__gallery::v-deep {
  .sf-gallery__stage {
    width: 100%;
    .glide__slides,
    .glide__slide {
      width: auto !important;
      max-width: 442px;
      height: 665px !important;
    }
    .glide__slide {
      justify-content: center;
      align-items: center;
      display: flex;
      .sf-gallery__big-image {
        width: 100%;      
        .sf-image {
          width: 100%;
          height: auto;
        }      
      }
    }
  }
}

#product-gallery {
  position: relative;
}

.product-badge {
  position: absolute;
  width: 145px;
  height: 28px;
  background: #fecb06;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  @include for-desktop {
    top: 16px;
    left: 168px;
  }
  @include for-mobile {
    top: 72px;
    left: 0px;
  }
}

.add-to-wishlist {
  position: absolute;
  top: 16px;
  @include for-desktop {
    right: 40px;
  }
  @include for-mobile {
    right: 16px;
  }
}

.add-to-compare {
  position: absolute;
  top: 44px;
  @include for-desktop {
    right: 38px;
  }
  @include for-mobile {
    right: 14px;
  }
}

.error-msg {
  color: var(--_c-copia-primary-red);
  font-weight: var(--font-weight--semibold);
}

.small-banner {
  @include for-desktop {
    margin-left: 7.5rem;
  }
  @include for-mobile {
    padding: var(--spacer-sm);
  }
}

.sf-call-to-action {
  @include for-desktop {
    align-items: flex-end;
  }
  @include for-mobile {
    align-items: flex-start;
    justify-content: flex-end;
    margin: var(--spacer-sm);
    padding: var(--spacer-sm);
  }
  & .sf-button {
    border-radius: 4px;
  }
}

::v-deep {
  .sf-tabs {
    & .sf-tabs__tab > button.sf-tabs__title.is-active {
      color: var(--_c-copia-primary-black) !important;
    }

    & .sf-tabs__tab > button.sf-tabs__title {
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--semibold);
      font-size: var(--h4-font-size);
      line-height: 26px;
      color: var(--_c-copia-secondary-gray);
    }
  }
  .sf-select {
    & select{
      --select-label-font-size: var(--font-size--base);
      &:focus ~ * {
        --select-label-color: var(--_c-copia-primary-black);
      }
    }
    &__label {
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--semibold);
      &::after {
        color: var(--_c-copia-secondary-red);
      }
    }
  }
  .sf-radio {
    border-width: 2px 0;
    border-color: var(--_c-copia-gray-light-accent);
    & .is-active {
      border-color: var(--_c-copia-primary-red);
    }
    &__container {
      display: flex;
      align-items: center;
    }
  }
}
</style>
