<template>
  <div id="product">
    <nav id="breadcrumbs" aria-label="breadcrumb">
      <ol class="breadcrumbs__list">
        <li
          class="breadcrumbs__list-item"
          v-for="(bread, i) in mock_breadcrumbs"
          :key="i"
          :aria-current="false"
        >
          <router-link :to="bread.link">
            <span>{{ bread.text }}</span>
          </router-link>
        </li>

        <li class="breadcrumbs__list-item breadcrumbs__list-item--last">
          <span>{{ mock_product.name }}</span>
        </li>
      </ol>
    </nav>

    <div class="product">
      <LazyHydrate when-idle>
        <div id="product-gallery">
          <SfGallery
            class="product__gallery"
            :images="mock_product.images"
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
          ></SfGallery>

          <span v-if="getWarrantyBadge" class="product-badge label">{{
            getWarrantyBadge
          }}</span>

          <span class="add-to-wishlist">
            <SfButton class="sf-button--pure sf-header__action">
              <SfIcon class="sf-header__icon" :icon="'heart'" size="1.25rem" />
            </SfButton>
          </span>

          <span class="add-to-compare" @click="addToCompare(productGetters.getId(product))">
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
        <p class="label sf-heading--left label-red">SKU: {{ getProductSku }}</p>

        <div class="product__header">
          <h2 class="sf-heading--no-underline sf-heading--left">
            {{ mock_product.name }}
          </h2>

          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>

        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(mock_product.price, 'currency')"
            :special="getSpecialPrice"
          />
        </div>

        <div>
          <div v-if="options.select">
            <SfSelect
              v-for="(select, selectKey) in options.select"
              :key="selectKey"
              class="sf-select--underlined"
              :value="$route.query[select.label]"
              :label="select.label"
              required
              @input="(selected) => updateFilter({ [select.label]: selected })"
            >
              <SfSelectOption
                :key="`${selectKey}_${itemKey}`"
                :value="item.value"
                :label="item.label"
                v-for="(item, itemKey) in select.values"
              ></SfSelectOption>
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
                :selected="$route.query[radio.label]"
                :name="radio.label"
                :value="item.value"
                :label="item.label"
                @change="updateFilter({ [radio.label]: item.value })"
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
                :selected="checkSelected(option.label, color.value)"
                @click="updateFilter({ [option.label]: color.value })"
              ></SfColor>
            </template>
          </div>

          <SfAddToCart
            id="add-to-cart"
            data-cy="product-cart_add"
            :stock="stock"
            v-model="qty"
            :disabled="loading || !allOptionsSelected"
            :canAddToCart="stock > 0"
            class="product__add-to-cart"
          >
            <template #add-to-cart-btn>
              <button
                id="add-cart-button"
                @click="addItem({ product, quantity: parseInt(qty) })"
              >
                Add to cart
              </button>
            </template>

            <template #quantity-select-input>
              <div id="add-to-cart--quantity-options">
                <button
                  id="add-to-cart--decrease"
                  @click="if (qty >= 1) qty--;"
                >
                  <img
                    :src="addBasePath('/icons/add-cart-minus-icon.svg')"
                    alt
                  />
                </button>

                <input
                  type="number"
                  v-model="qty"
                  class="input-number-arrow-hide"
                />

                <button id="add-to-cart--increase" @click="qty++">
                  <img
                    :src="addBasePath('/icons/add-cart-plus-icon.svg')"
                    alt
                  />
                </button>
              </div>
            </template>
          </SfAddToCart>
        </div>

        <section class="social-links-sharer--row">
          <SocialLinkSharer :product="mock_product" />
        </section>
      </div>
    </div>

    <div class="product product--row-two">
      <LazyHydrate when-idle>
        <div class="product__info">
          <SfTabs :open-tab="1" class="product__tabs tabs--forcer">
            <SfTab data-cy="product-tab_description" title="Description">
              <p class="text desktop-only">{{ mock_product.description }}</p>

              <SfProperty
                v-for="attribute in mock_product.attributes"
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
              </SfProperty>
            </SfTab>

            <SfTab title="Reviews" data-cy="product-tab_reviews">
              <SfReview
                v-for="(review, i) in mock_product.reviews"
                :key="i"
                :author="review.author"
                :date="review.date"
                :message="review.message"
                :max-rating="review.rating.max"
                :rating="review.rating.rate"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab>

            <SfTab
              title="Returns &amp; Refunds"
              data-cy="product-tab_additional"
              class="product__additional-info"
            >
              <div class="product__additional-info">
                <p class="product__additional-info__title">{{ $t('Brand') }}</p>
                <p>{{ brand }}</p>
                <p class="product__additional-info__title">
                  {{ $t('Instruction1') }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t('Instruction2') }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t('Instruction3') }}
                </p>
                <p>{{ careInstructions }}</p>
              </div>
            </SfTab>
          </SfTabs>
        </div>
      </LazyHydrate>

      <LazyHydrate>
        <div class="product__info--offer-banner">
          <a href>
            <figure>
              <img
                :src="addBasePath('/productpage/amazing-offers-this-week.png')"
                alt
              />
            </figure>
          </a>
        </div>
      </LazyHydrate>
    </div>

    <LazyHydrate when-visible>
      <section id="related-items-viewed">
        <h3>Related to items you've viewed</h3>

        <RelatedProducts
          :products="mock_related_products"
          :loading="relatedLoading"
        />
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section id="recently-viewed-items">
        <h3>Recently viewed items</h3>

        <RelatedProducts
          :products="mock_related_products"
          :loading="relatedLoading"
        />
      </section>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        :image="
          addBasePath('/productpage/copia-pesa-recommending-learn-how.png')
        "
        class="call-to-action"
      >
        <template #button>
          <SfButton
            class="sf-call-to-action__button bottom-action bg-primary-black"
            data-testid="cta-button"
            @click="toggleNewsletterModal"
            >{{ $t('Learn how') }}</SfButton
          >
        </template>
      </SfCallToAction>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <section id="our-promise-footer">
        <h3>Our Promise</h3>

        <section class="row flex">
          <article class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-collor-palette.png')"
                alt
                id="unique-everything--image"
              />

              <div class="card--text-wrap">
                <h5>Unique Everything</h5>
                <p class="text-small">
                  We have millions of one-of-a-kind items in our shop
                </p>
              </div>
            </div>
          </article>

          <article class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-delivery.png')"
                alt
                id="free-delivery--image"
              />

              <div class="card--text-wrap">
                <h5>Free delivery &amp; return</h5>
                <p class="text-small">
                  Copia will deliver your goods to your nearest delivery point
                  in 2-4 days
                </p>
              </div>
            </div>
          </article>

          <article class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-padlock.png')"
                alt
                id="secure-payment--image"
              />

              <div class="card--text-wrap">
                <h5>Secure payments</h5>
                <p class="text-small">Your information is treated securely.</p>
              </div>
            </div>
          </article>

          <article class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-chat.png')"
                alt
                id="customer-support--image"
              />

              <div class="card--text-wrap">
                <h5>Customer support</h5>
                <p class="text-small">
                  We are here to assist you. If you need help call 0709 339 000
                </p>
              </div>
            </div>
          </article>
        </section>
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
} from '@storefront-ui/vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import SocialLinkSharer from '~/components/SocialLinkSharer.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, reactive, useContext } from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  useProductVariant,
  reviewGetters,
  facetGetters,
} from '@vue-storefront/odoo';
import { useUiState, useCompareProducts } from '@/composables';
import { onSSR } from '@vue-storefront/core';
import { addBasePath } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
export default {
  name: 'ProductPage',
  transition: 'fade',
  setup(props, { root }) {
    const { $config } = useContext();
    const qty = ref(1);
    const { id } = root.$route.params;
    const { toggleNewsletterModal } = useUiState();
    const { query } = root.$route;
    const { size, color } = root.$route.query;
    const configuration = reactive({ size, color });
    const { addToCompare } = useCompareProducts();
    const {
      products,
      search,
      loading: productloading,
    } = useProduct(`products-${id}`);

    const { searchRealProduct, productVariants, realProduct, elementNames } =
      useProductVariant(query);

    const { products: relatedProducts, loading: relatedLoading } =
      useProduct('relatedProducts');

    const { addItem, loading } = useCart();
    const { addTags } = useCache();

    const { reviews: productReviews } = useReview('productReviews');

    const product = computed(() => {
      return {
        ...products.value,
        realProduct: realProduct.value,
      };
    });

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

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbsByProduct(product.value)
    );

    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value)
    );

    // const productGallery = computed(() =>
    //   productGetters.getGallery(product.value).map((img) => ({
    //     mobile: { url: img.small },
    //     desktop: { url: img.normal },
    //     big: { url: img.big },
    //     alt: product.value.name || "alt",
    //   }))
    // );

    onSSR(async () => {
      await searchRealProduct({
        productTemplateId: parseInt(id),
        combinationIds: Object.values(root.$route.query),
      });
      await search({ id: parseInt(id) });
      addTags([{ prefix: CacheTagPrefix.Product, value: id }]);
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      // await searchReviews({ productId: id });
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
          ...options.value[item].map((element) => element.label),
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

    const mock_breadcrumbs = reactive([
      {
        text: 'Home',
        link: '#',
      },
      {
        text: 'Pants',
        link: '#',
      },
    ]);

    const mock_related_products = ref([
      {
        title: 'HDMI-18GD – HDMI Cable 1.8m',
        image: addBasePath('/productpage/hdmi-cable-1_8m.png'),
        price: { regular: '1385.00', special_price: '1038.75' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        title: 'Sandisk 16 GB Micro Memory Card - Black',
        image: addBasePath('/productpage/sandis-16gb.png'),
        price: { regular: '1385.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        title: 'ClipTec Stereo Multimedia Headset (Lorem Ipsum lorel)',
        image: addBasePath('/productpage/cliptec-stereo.png'),
        price: { regular: '1385.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        title: 'SanDisk Memory Card 32gb',
        image: addBasePath('/productpage/sandis-32gb.png'),
        price: { regular: '1385.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        title: 'HDMI-18GD – HDMI Cable 1.8m',
        image: addBasePath('/productpage/hdmi-cable-1_8m.png'),
        price: { regular: '1385.00', special_price: '1038.75' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        title: 'Sandisk 16 GB Micro Memory Card - Black',
        image: addBasePath('/productpage/hdmi-cable-1_8m.png'),
        price: { regular: '1385.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
    ]);

    const getSpecialPrice = computed(() => {
      return mock_product.special_price ? mock_product.special_price : null;
    });

    const getProductSku = computed(() => {
      let object_found = mock_product.attributes.filter((atr) => {
        return atr.name == 'SKU';
      });
      return object_found[0].value || null;
    });

    const getWarrantyBadge = computed(() => {
      let object_found = mock_product.attributes.filter((atr) => {
        return atr.name == 'warranty';
      });
      return object_found[0].value || null;
    });

    return {
      getWarrantyBadge,
      productGetters,
      toggleNewsletterModal,
      getSpecialPrice,
      getProductSku,
      mock_product,
      mock_breadcrumbs,
      addBasePath,
      productloading,
      breadcrumbs,
      allOptionsSelected,
      checkSelected,
      elementNames,
      updateFilter,
      configuration,
      product,
      code,
      description,
      properties,
      reviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      options,
      qty,
      addItem,
      loading,
      productVariants,
      mock_related_products,
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
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
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
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
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
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
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
}
.bottom-action {
  @include for-desktop {
    margin-top: 80px;
    margin-right: 80px;
  }
  border-radius: 5px;
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
  @include for-mobile {
    justify-content: space-around;
  }
}

#our-promise-footer .card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  @include for-mobile {
    margin-bottom: 10px;
  }
}

// .card--text-wrap {
//   width: 187px;
// }

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
  color: #e81e2b;
}

.product__price-and-rating {
  span {
    font-family: 'Lato Black';
    font-weight: 900;
    font-size: 24px;
    line-height: 28.8px;
  }
}

.product__add-to-cart {
  margin: 64px 0px 0px;
}

#add-cart-button {
  background-color: #fecb06;
  width: 169px;
  color: #1d1f22;
  text-transform: uppercase;
  font-family: 'Lato Bold';
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
}

#add-to-cart input {
  font-family: 'Lato Regular';
}

div#add-to-cart--quantity-options {
  position: relative;
  //background: #f1f2f3;
}

div#add-to-cart--quantity-options button {
  position: absolute;
}

div#add-to-cart--quantity-options input {
  background: #f1f2f3;
  padding: 8px 48px;
  width: 108px;
  margin-right: 32px;
}

#add-to-cart--decrease {
  position: absolute;
  top: 6px;
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
  font-family: 'Montserrat Semi Bold';
  font-size: 14px;
  color: #72757e;
  margin: 40px 0 24px;
}

.breadcrumbs__list .breadcrumbs__list-item:not(:last-child)::after {
  content: url('/icons/breadcrumb-arrow-right.svg');
  margin-left: 20px;
  margin-right: 20px;
}

.breadcrumbs__list-item--last {
  color: #e81e2b;
}

.product__property.product__property--title.sf-property span {
  font-family: 'Montserrat Bold' !important;
  color: #43464e;
  text-decoration: unset;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}

.product__info .product__property.product__property--title.sf-property button {
  font-family: 'Montserrat Bold' !important;
  color: #43464e;
  text-decoration: unset;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}

.tabs--forcer::v-deep .sf-tabs__tab > button.sf-tabs__title.is-active {
  color: #1d1f22 !important;
}

.tabs--forcer::v-deep .sf-tabs__tab > button.sf-tabs__title {
  font-family: 'Montserrat Semi Bold';
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: #8d8f9a;
}

.product__info .product__price-and-rating {
  margin-top: 32px;
}

#product-gallery {
  position: relative;
}

.product-badge {
  position: absolute;
  top: 16px;
  right: 278px;
  width: 145px;
  height: 28px;
  background: #fecb06;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}

.add-to-wishlist {
  position: absolute;
  top: 16px;
  right: 16px;
}

.add-to-compare {
  position: absolute;
  top: 44px;
  right: 14px;
}

.product--row-two .product__info {
  margin-left: 0px;
}

.product__info--offer-banner {
  margin: 80px 84px;
  margin-bottom: unset;
}

.price_before.label {
  font-size: 16px;
  text-decoration: line-through;
  font-weight: 900;
}

.sf-arrow.sf-button.round {
  border-radius: 100%;
}

#our-promise-footer img {
  margin-right: 18px;
}

#our-promise-footer img {
  margin-right: 18px;
}

#our-promise-footer .card:nth-child(2) > div {
  padding-top: 36px;
  padding-right: 17px;
  padding-left: 20px;
}

#our-promise-footer .card:nth-child(4) > div {
  padding-top: 36px;
  padding-right: 21px;
  padding-left: 22px;
}

#our-promise-footer .card:nth-child(2) img {
  margin-right: 16px;
}
#our-promise-footer .card:nth-child(4) img {
  margin-right: 16px;
}

#recently-viewed-items .sf-section.section .sf-section__content,
#related-items-viewed .sf-section.section .sf-section__content {
  margin-top: unset;
  margin-bottom: 0px;
}

#recently-viewed-items .sf-section.section,
#related-items-viewed .sf-section.section {
  margin-top: unset;
  margin-bottom: 0px;
}

.tabs--forcer {
  margin-bottom: unset !important;
}

.sf-section__content::v-deep,
#recently-viewed-items .sf-section__content::v-deep,
#related-items-viewed .sf-section__content::v-deep {
  margin-top: unset;
}

#our-promise-footer h3 {
  margin-top: 80px;
  margin-bottom: 40px;
}
</style>
