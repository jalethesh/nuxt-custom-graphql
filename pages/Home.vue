<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfCallToAction
        title
        button-text
        description
        :image="addBasePath('/homepage/deals-za-krisi.svg')"
        class="call-to-action top-action desktop-only"
      >
        <template #button></template>
      </SfCallToAction>
    </LazyHydrate>
    <LazyHydrate when-idle>
      <SfCallToAction
        title
        button-text
        description
        :image="addBasePath('/homepage/mobiledealsbanner.svg')"
        class="call-to-action top-action smartphone-only"
      >
        <template #button></template>
      </SfCallToAction>
    </LazyHydrate>
    <div class="hero-wrap">
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :subtitle="hero.subtitle"
          :background="hero.background"
          :image="hero.image"
          :buttonText="''"
          :class="hero.className"
        />
      </SfHero>
      <div class="desktop-only ml-7 hero-slide">
        <img :src="addBasePath('/homepage/heroSlider.png')" />
      </div>
    </div>
    <!-- <div>
      <div v-html="megaMenu">
      </div>
    </div> -->
    <LazyHydrate when-visible>
      <OrderProcess :class="'m-t-xl sm: pt-0 xl:pt-10'" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <OrderProcessMobile :class="'m-b-xl -mt-8'" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <ShopByCategory />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SfCallToAction
        title
        button-text="Subscribe"
        description
        :image="addBasePath('/homepage/newsletter.png')"
        class="call-to-action product-tap sm:mt-10 xl:mt-20 desktop-only"
      >
        <template #button>
          &nbsp;
        </template>
      </SfCallToAction>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SfCallToAction
        title
        button-text="Subscribe"
        description
        :image="addBasePath('/homepage/mobilesubscribenewsletter.png')"
        class="call-to-action m-t-md smartphone-only mobile-newsletter mobile-news-top"
      >
        <template #button>
          &nbsp;
        </template>
      </SfCallToAction>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <div class="similar-products sm:mt-10 xl:mt-20">
        <div
          class="text-left new-tap-txt pointer"
          :class="[isNewArrival ? 'active' : '']"
          @click="isNewArrival = true"
        >
          new arrivals
        </div>
        <div
          class="text-left new-tap-txt pointer"
          :class="[isNewArrival ? '' : 'active']"
          @click="isNewArrival = false"
        >
          top sellers
        </div>
        <!-- <nuxt-link :to="localePath('/')" class="see-all">
          <p class="mr-4">{{ $t('See all') }}</p>
          <SfIcon
            icon="chevron_right"
            size="14px"
            color="black"
            :class="'desktop-only'"
        /></nuxt-link> -->
      </div>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SfCarousel
        v-if="isNewArrival"
        :key="1"
        class="carousel"
        :settings="{
          peek: 0,
          type: 'slider',
          breakpoints: {
            1025: {
              peek: { before: 0, after: 0 },
              perView: 1,
              type: 'slider',
            },
          },
        }"
      >
        <template #prev="{ go }">
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left rounded-full"
            @click="go('prev')"
          />
        </template>

        <template #next="{ go }">
          <SfArrow
            aria-label="next"
            class="sf-arrow--right rounded-full"
            @click="go('next')"
          />
        </template>

        <SfCarouselItem
          class="carousel__item"
          v-for="(product, i) in newArrivalsData"
          :key="i"
        >
          <HomeCopiaProductCard
            data-cy="home-product-card"
            :product="product"
            :style="{ '--index': i }"
            :arrive="'NEW ARRIVAL'"
            class="products__product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
      <SfCarousel
        v-else
        :key="2"
        class="carousel"
        :settings="{
          peek: 0,
          type: 'slider',
          breakpoints: {
            1025: {
              peek: { before: 0, after: 0 },
              perView: 1,
              type: 'slider',
            },
          },
        }"
      >
        <template #prev="{ go }">
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left rounded-full"
            @click="go('prev')"
          />
        </template>

        <template #next="{ go }">
          <SfArrow
            aria-label="next"
            class="sf-arrow--right rounded-full"
            @click="go('next')"
          />
        </template>

        <SfCarouselItem
          class="carousel__item"
          v-for="(product, i) in topSellersData"
          :key="i"
        >
          <HomeCopiaProductCard
            data-cy="home-product-card"
            :product="product"
            :style="{ '--index': i }"
            :arrive="'TOP SELLER'"
            :nuxtImgConfig="{ fit: 'cover' }"
            image-tag="nuxt-img"
            :show-add-to-cart-button="true"
            :isInWishlist="isInWishlist({ product })"
            :isAddedToCart="isInCart({ product })"
            class="products__product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <div>
        <SfBannerGrid :bannerGrid="1" class="banner-grid desktop-only">
          <template v-for="item in banners" v-slot:[item.slot]>
            <SfBanner
              :key="item.slot"
              :title="item.title"
              :subtitle="item.subtitle"
              :description="item.description"
              :button-text="''"
              :link="localePath(item.link)"
              :image="item.image"
              :class="item.class"
            />
          </template>
        </SfBannerGrid>
        <SfBannerGrid :bannerGrid="1" class="banner-grid smartphone-only">
          <template v-for="item in banners" v-slot:[item.slot]>
            <div :key="item.slot" class="smartphone-only">
              <SfBanner
                :title="item.title"
                :subtitle="item.subtitle"
                :description="item.description"
                :button-text="''"
                :link="localePath(item.link)"
                :image="item.image"
              />
              <!-- <SfButton
                class="learn-more-banner smartphone-only"
                :class="item.class"
              >
                {{ item.buttonText }}
              </SfButton> -->
            </div>
          </template>
        </SfBannerGrid>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div class="similar-products feature-see-all">
        <SfHeading
          title="Featured Category"
          class="text-left featured-category"
          :level="3"
        />
        <!-- <nuxt-link :to="localePath('/c/women')" class="see-all"
          ><p class="pt-1 mr-4">{{ $t('See all') }}</p>
          <SfIcon
            icon="chevron_right"
            size="14px"
            color="black"
            :class="'desktop-only'"
        /></nuxt-link> -->
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCarousel
        class="carousel"
        :key="3"
        :settings="{
          peek: 0,
          type: 'slider',
          breakpoints: {
            1025: {
              peek: { before: 0, after: 0 },
              perView: 1,
              type: 'slider',
            },
          },
        }"
      >
        <template #prev="{ go }">
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left rounded-full"
            @click="go('prev')"
          />
        </template>

        <template #next="{ go }">
          <SfArrow
            aria-label="next"
            class="sf-arrow--right rounded-full"
            @click="go('next')"
          />
        </template>

        <SfCarouselItem
          class="carousel__item"
          v-for="(product, i) in featuredProductsData"
          :key="i"
        >
          <HomeCopiaProductCard
            data-cy="home-product-card"
            :product="product"
            :style="{ '--index': i }"
            :pricerow="product.combinationInfo.discount_perc"
            :nuxtImgConfig="{ fit: 'cover' }"
            image-tag="nuxt-img"
            :show-add-to-cart-button="true"
            class="products__product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        title
        button-text
        description
        :image="addBasePath('/homepage/copia-pesa-recommending-learn-how1.png')"
        class="call-to-action m-t-xl m-b-xl footer-action desktop-only"
      >
        <template #button>
          &nbsp;
        </template>
      </SfCallToAction>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SfCallToAction
        title
        button-text="Subscribe"
        description
        :image="addBasePath('/homepage/mobilesubscriptionbanner1.png')"
        class="call-to-action m-t-lg smartphone-only mobile-newsletter"
      >
        <template #button>
           &nbsp;
        </template>
      </SfCallToAction>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <section id="our-promise-footer">
        <h3>Our Promise</h3>

        <section class="row flex desktop-only">
          <article class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-collor-palette.svg')"
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
                :src="addBasePath('/icons/product-icon-delivery.svg')"
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
                :src="addBasePath('/icons/product-icon-padlock.svg')"
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
                :src="addBasePath('/icons/product-icon-chat.svg')"
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
        <SfHero class="smartphone-only mb-10">
          <div class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-collor-palette.svg')"
                alt
                id="unique-everything--image"
              />

              <div class="card--text-wrap">
                <h5>Unique Everything</h5>
                <p class="text-small">
                  We have millions of <br />
                  one-of-a-kinditems in our shop
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-delivery.svg')"
                alt
                id="free-delivery--image"
              />

              <div class="card--text-wrap">
                <h5>Free delivery &amp; return</h5>
                <p class="text-small">
                  Copia will deliver your goods to your <br />
                  nearest delivery point in 2-4 days
                </p>
              </div>
            </div>
          </div>
          <div class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-padlock.svg')"
                alt
                id="secure-payment--image"
              />

              <div class="card--text-wrap">
                <h5>Secure payments</h5>
                <p class="text-small">
                  Your information is <br />treated securely.
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div>
              <img
                :src="addBasePath('/icons/product-icon-chat.svg')"
                alt
                id="customer-support--image"
              />

              <div class="card--text-wrap">
                <h5>Customer support</h5>
                <p class="text-small">
                  We are here to assist you. <br />If you need help call 0709
                  339 000
                </p>
              </div>
            </div>
          </div>
        </SfHero>
      </section>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <NewsletterModal @email-submitted="onSubscribe" />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfTabs,
  SfIcon,
} from '@storefront-ui/vue';
import axios from 'axios';
import SfTab from '@storefront-ui/vue/src/components/organisms/SfTabs/_internal/SfTab.vue';
import {
  useCart,
  useWishlist,
  productGetters,
  useProduct,
  useFacet,
  facetGetters,
} from '@vue-storefront/odoo';
import { computed, onBeforeMount } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { ref, useContext } from '@nuxtjs/composition-api';
import InstagramFeed from '~/components/InstagramFeed.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiState, useUiHelpers } from '../composables';
import {
  useNewArrival,
  useTopSeller,
  useFeaturedProducts,
  useMegaMenu,
} from '../composables';

import { addBasePath } from '@vue-storefront/core';

import OrderProcess from '~/components/HomePage/OrderProcess.vue';
import OrderProcessMobile from '~/components/HomePage/OrderProcessMobile.vue';

import ShopByCategory from '~/components/HomePage/ShopByCategory.vue';
import HomeCopiaProductCard from '~/components/Core/Organisms/HomeCopiaProductCard.vue';

export default {
  name: 'Home',
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    NewsletterModal,
    LazyHydrate,
    OrderProcess,
    OrderProcessMobile,
    ShopByCategory,
    SfTab,
    SfTabs,
    SfIcon,
    HomeCopiaProductCard
},
  setup() {
    const { $config } = useContext();
    const { toggleNewsletterModal } = useUiState();
    const { result, search: searchFacet } = useFacet();
    const {
      newArrivals,
      error: errorNewArrival,
      loading: loadingNewArrival,
      searchNewArrival,
    } = useNewArrival();
    const {
      topSellers,
      error: errorTopSeller,
      loading: loadingTopseller,
      searchTopSeller,
    } = useTopSeller();
    const {
      featuredProducts,
      error: errorFeaturedProducts,
      loading: loadingFeaturedProducts,
      searchFeaturedProduct,
    } = useFeaturedProducts();

    const featuredProductsData = computed(() => featuredProducts.value);
    const newArrivalsData = computed(() => newArrivals.value);
    const topSellersData = computed(() => topSellers.value);


    const products = computed(() => facetGetters.getProducts(result.value));
    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
      isInWishlist,
    } = useWishlist();
    const { addItem: addItemToCart, isInCart } = useCart();

    const products1 = ref([
      {
        title: 'Toss Blue Washing Powder 20g',
        image: addBasePath('/homepage/category1.png'),
        price: { regular: '1385.00', special_price: '1385.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
        pricerow: '-50%',
      },
      {
        title: 'Toss Lavender Washing Powder 200g',
        image: addBasePath('/homepage/category2.png'),
        price: { regular: '75.00', special_price: '65.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
        pricerow: '-50%',
      },
      {
        title: 'Ariel Washing Powder 3.5kg',
        image: addBasePath('/homepage/category3.png'),
        price: { regular: '2000.00', special_price: '1000.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
        pricerow: '-50%',
      },
      {
        title: 'Omo Hand Washing Powder Fast Action 500g',
        image: addBasePath('/homepage/category4.png'),
        price: { regular: '200.00', special_price: '190.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
        pricerow: '-50%',
      },
      {
        title: 'Toss Lavender Washing Powder 200g',
        image: addBasePath('/homepage/category2.png'),
        price: { regular: '75.00', special_price: '65.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
        pricerow: '-50%',
      },
      {
        title: 'Ariel Washing Powder 3.5kg',
        image: addBasePath('/homepage/category3.png'),
        price: { regular: '2000.00', special_price: '1000.00' },
        sku: 'KF675',
        rating: { max: 5, score: 4 },
        isInWishlist: false,
        pricerow: '-50%',
      },
    ]);

    const heroes = [
      {
        subtitle: 'Nunua kutoka Copia na tutafikisha mashinani bila malipo',
        title:
          'Copia is a platform that offers you a service to get a variety of quality, affordable goods upcountry conveniently in 2 – 4 days bila malipo',
        background: '#eceff1',
        image: addBasePath('/homepage/banner.png'),
      },
      // {
      //   subtitle: 'Nunua kutoka Copia na tutafikisha mashinani bila malipo',
      //   title:
      //     'Copia is a platform that offers you a service to get a variety of quality, affordable goods upcountry conveniently in 2 – 4 days bila malipo',
      //   background: '#eceff1',
      //   image: addBasePath('/homepage/banner.png'),
      // },
      // {
      //   subtitle: 'Nunua kutoka Copia na tutafikisha mashinani bila malipo',
      //   title:
      //     'Copia is a platform that offers you a service to get a variety of quality, affordable goods upcountry conveniently in 2 – 4 days bila malipo',
      //   background: '#eceff1',
      //   image: addBasePath('/homepage/banner.png'),
      // },
    ];
    const banners = [
      {
        slot: 'banner-A',
        subtitle: '',
        title: '',
        description: '',
        buttonText: 'watch now',
        image: {
          mobile: addBasePath('/homepage/banner1-mobile.png'),
          desktop: addBasePath('/homepage/banner1.png'),
        },
        class: 'sf-banner--slim first-banner',
        link: $config.theme.home.bannerA.link,
      },
      {
        slot: 'banner-B',
        subtitle: '',
        title: '',
        description: '',
        buttonText: 'Learn More',
        image: {
          mobile: addBasePath('/homepage/banner2-mobile.png'),
          desktop: addBasePath('/homepage/banner2.png'),
        },
        class: 'sf-banner--slim banner-central',
        link: $config.theme.home.bannerB.link,
      },
      {
        slot: 'banner-C',
        subtitle: '',
        title: '',
        buttonText: 'Learn More',
        image: {
          mobile: addBasePath('/homepage/banner3-mobile.png'),
          desktop: addBasePath('/homepage/banner3.png'),
        },
        class: 'sf-banner--slim banner__tshirt',
        link: $config.theme.home.bannerC.link,
      },
      {
        slot: 'banner-D',
        subtitle: '',
        title: '',
        buttonText: 'Learn More',
        image: {
          mobile: addBasePath('/homepage/banner4-mobile.png'),
          desktop: addBasePath('/homepage/banner4.png'),
        },
        class: 'sf-banner--slim',
        link: $config.theme.home.bannerD.link,
      },
    ];

    const onSubscribe = (emailAddress) => {
      console.log(`Email ${emailAddress} was added to newsletter.`);
      toggleNewsletterModal();
    };

    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };
    const isNewArrival = ref(true);
    const { getFacetsFromURL } = useUiHelpers();
    onSSR(async () => {
      await Promise.all([
        // searchFacet({
        //   ...getFacetsFromURL,
        //   pageSize: 16,
        //   customQueryProducts: {
        //     getProductTemplatesList: 'productsNewArrival',
        //   },
        // }),
        searchFeaturedProduct(),
        searchNewArrival(),
        searchTopSeller(),
        
      ]);
    });

    return {
      toggleWishlist,
      toggleNewsletterModal,
      onSubscribe,
      addBasePath,
      banners,
      heroes,
      products,
      products1,
      productGetters,
      isNewArrival,
      newArrivalsData,
      topSellersData,
      featuredProductsData,
      isInWishlist,
      isInCart,
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}
::v-deep .sf-section {
  &__content {
    --section-content-margin: 0 0 0 0;
  }
}
.active {
  color: #e81e2b !important;
  border-bottom: 4px solid #e81e2b;
  @include for-mobile {
    border-bottom-width: 3px;
  }
}
.new-tap-txt {
  margin-right: 32px;
  font-weight: 800;
  font-size: 24px;
  font-family: 'Montserrat';
  cursor: pointer;
  text-transform: uppercase;
  @include for-mobile {
    font-size: 14px;
    margin-right: 10px;
    margin-top: 10px;
    text-transform: capitalize;
    font-size: 18px;
  }
}
.new-tap-txt:hover {
  border-bottom: 4px solid #1d1f22;
  @include for-mobile {
    border-bottom-width: 3px;
  }
}
.new-tap-txt {
  &.active:hover {
    border-bottom-color: #e81e2b;
  }
}
.see-all {
  font-size: 18px;
  font-weight: 600;
  font-family: 'Montserrat';
  display: flex;
  align-items: center;
  color: #1d1f22;
  @include for-mobile {
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    margin-top: 2px;
    margin-right: 0;
    & > p {
      margin: 0 !important;
    }
  }
}
.see-all:nth-child(2) {
  p {
    margin-top: -3px;
  }
}

.hero-slide {
  position: absolute;
  top: 0;
  right: 0;
  width: 28%;
  height: 100%;
  img {
    height: 100%;
  }
}
.hero-wrap {
  position: relative;
}
.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  @include for-desktop {
    width: 70%;
  }
  @include for-desktop {
    margin: 0;
  }
  .sf-hero-item {
    height: 586px;
    background-size: 100% 100%;
    .sf-button {
      --button-background: #fecb06;
      --button-color: black;
      color: black !important;
    }
    .sf-button::before {
      background: #fecb06 !important;
      --button-background: #fecb06 !important;
    }
    ::v-deep .sf-hero-item__subtitle {
      font-size: 52px;
      line-height: 58px;
      font-family: 'Montserrat';
      color: #ffffff;
      font-weight: 900;
      text-transform: capitalize;
    }
    ::v-deep .sf-hero-item__title {
      font-size: 18px;
      font-family: 'Montserrat';
      color: #ffffff;
      font-weight: 600;
    }
    @include for-mobile {
      height: 224px;
      ::v-deep .sf-hero-item__subtitle {
        font-size: 24px !important;

        line-height: 30px;
        font-family: 'Montserrat';
        color: #ffffff;
        font-weight: 700;
        width: 98%;
        text-transform: capitalize;
        height: 90px;
        overflow: hidden;
      }
      ::v-deep .sf-hero-item__title {
        font-size: 16px;
        font-family: 'Montserrat';
        color: #ffffff;
        font-weight: 500;
        width: 98%;
        height: 60px;
        overflow: hidden;
      }
    }
    // &:nth-child(even) {
    //   --hero-item-background-position: left;

    //   @include for-mobile {
    //     --hero-item-background-position: 30%;
    //     ::v-deep .sf-hero-item__subtitle,
    //     ::v-deep .sf-hero-item__title {
    //       text-align: right;
    //       width: 100%;
    //       padding-left: var(--spacer-sm);
    //     }
    //   }
    // }
    ::v-deep .sf-hero-item__wrapper {
      width: 95%;
      @include for-mobile {
        width: 70%;
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-background-size: 100%;
  --banner-background-position: top center;
  --banner-grid-row-margin: -43px 0 0 0 !important;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  &:nth-child(3) {
    @include for-desktop {
      margin-top: 0px;
      margin-bottom: -90px;
    }
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}
.sf-banner-grid__row + .sf-banner-grid__row {
  --banner-grid-row-margin: -43px 0 0 0 !important;
}
.sf-banner__wrapper {
  position: absolute;
}
.banner {
  --banner-background: 100%;
  --banner-background-position: center center;
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}
.mobile-newsletter {
  @include for-mobile {
    height: 268px;
  }
}
.mobile-news-top {
  @include for-mobile {
    margin-bottom: 30px !important;
  }
}

.call-to-action {
  background-position: right;
  background-size: 100%;
  margin: var(--spacer-xs) 0;
  width: 101%;

  &.top-action {
    width: 100%;
    margin-bottom: -30px;
    padding-top: 50px;
    padding-bottom: 50px;
    @include for-mobile {
      margin-top: 12px;
    }
  }
  &.product-tap {
    background-position: center;
    background-size: cover;
    margin: var(--spacer-xs) 0;
    width: 100%;
  }
  &.footer-action {
    width: 100%;
  }
  @include for-desktop {
    margin: 0;
  }
}

.bottom-action {
  @include for-desktop {
    margin-top: 80px;
    margin-right: 80px;
  }
  border-radius: 5px;
}
.shop-button {
  border-radius: 5px;
  color: #43464e;
  font-size: 16px;

  @include for-mobile {
    background: black;
    color: white;
    margin-top: 161px;
    margin-left: -8px;
    width: 55%;
    padding: 13px;
  }
}
.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-mobile {
    margin-right: -16px !important;
  }
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-mobile {
      width: 250px !important;
    }
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

#our-promise-footer .card {
  background: #f1f2f3;
  height: 140px;
  @include for-mobile{
    height: 130px;
  }
  width: 298px;
}

#our-promise-footer .card > div {
  padding: 36px 27px;
  @include for-mobile{
    padding-top: 18px;
  }
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
    align-items: flex-start;
  }
}
#our-promise-footer img {
  margin-right: 18px;
  margin-top: 10px;
}

#unique-everything--image {
  width: 40px;
  height: 40px;
}

#free-delivery--image {
  width: 42px;
  height: 42px;
}

#secure-payment--image {
  width: 41px;
  height: 41px;
}

#customer-support--image {
  width: 40px;
  height: 40px;
}
#our-promise-footer .card:nth-child(2) > div {
  padding-top: 36px;
  @include for-mobile{
    padding-top: 18px;
  }
  padding-right: 17px;
  padding-left: 20px;
}
#our-promise-footer .card:nth-child(4) > div {
  padding-top: 36px;
  @include for-mobile{
    padding-top: 18px;
  }
  padding-right: 21px;
  padding-left: 22px;
}

#our-promise-footer .card:nth-child(2) img {
  margin-right: 16px;
}
#our-promise-footer .card:nth-child(4) img {
  margin-right: 16px;
}
#our-promise-footer h3 {
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 24px !important;
  color: #1d1f22 !important;
  font-family: 'Montserrat' !important;

  @include for-mobile {
    margin-bottom: 26px;
    margin-top: 40px;
    font-size: 18px !important;
    font-weight: 700 !important;
  }
}
</style>
<style lang="scss">
.sf-hero-item {
  height: 586px;
  background-size: 100% 100%;
  .sf-button {
    @include for-desktop {
      --button-background: #fecb06;
    }
    --button-color: black;
    color: black !important;
    border-radius: 8px;
  }
}
.hero {
  .sf-bullets {
    .sf-button {
      background: #e0e0e1;
    }
    .is-active {
      background: #fecb06;
    }
  }
}
.banner-grid {
  .sf-banner{
    // @include for-mobile{
      background-size: contain;
      background-position: center;
    // }
  }
  .sf-banner__call-to-action {
    display: block;
    @include for-mobile {
      bottom: 10% !important;
    }
  }
  .sf-banner-grid__col:nth-child(2) {
    @include for-desktop {
      
    }
    @include for-mobile {
      margin-top: 16px !important;
      margin-bottom: 16px !important;
    }
    @media (max-width: 377px) {
      margin-top: -18px !important;
      margin-bottom: -17px !important;
    }
  }
  .first-banner {
    @include for-desktop {
      margin-right: 5px;
    }
    @include for-mobile {
      display: none;
    }
  }
  .sf-button {
    position: absolute;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
    font-family: 'Lato';
  }
  .learn-more-banner {
    @include for-mobile {
      position: absolute;
      font-family: 'Lato';
      bottom: 7% !important;
      left: 50%;
      transform: translateX(-50%);
      background: #1d1f22;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .sf-banner-grid__col:nth-child(1) {
    & > .learn-more-banner {
      @include for-mobile {
        display: none;
      }
    }
  }
  .sf-banner-grid__row + .sf-banner-grid__row {
    margin-top: 16px;
    @include for-desktop {
      margin-top: -46px !important;
    }
    @include for-mobile {
      margin-top: 16px !important;
    }
    @media (max-width: 377px) {
     margin-top: -33px !important;
    }
  }
}
.similar-products {
  display: inline-block !important;
  width: 100%;
  div {
    float: left;
  }
  a {
    float: right;
    line-height: 41px;
  }
}
#our-promise-footer .sf-hero__bullets {
  .sf-bullets {
    .sf-button {
      background: #e0e0e1;
    }
    .is-active {
      background: #fecb06;
    }
  }

  @include for-mobile {
    display: block;
    bottom: 20px;
  }
}
.feature-see-all {
  .featured-category {
    .sf-heading__title.h3 {
      font-size: 24px !important;
      font-weight: 800 !important;
      font-family: 'Montserrat' !important;
      @include for-mobile {
        font-size: 18px !important;
        font-weight: 700 !important;
      }
    }
  }
  @include for-mobile {
    display: flex !important;
    align-items: center !important;
  }
}
// .product-tap {
//   .sf-button:hover {
//     --button-transition: background 0s; */
// --button-text-decoration: underline;
// background-size: 100%;
//     --button-box-shadow-opacity: 0.25;
//     --button-background: var(--_c-copia-primary-yellow)
//       radial-gradient(
//         circle,
//         transparent 1%,
//         var(--_c-copia-secondary-yellow) 1%
//       )
//       center/15000%;
//   }
// }
.product-tap {
  --c-primary-variant: #ffe583;
}
</style>
