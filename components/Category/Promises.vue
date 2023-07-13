<template>
  <div id="our-promise-footer-category">
      <section >
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
       
      </section>
     <div>
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
    </div>
  </div>
</template>

<script>
import { SfHero } from "@storefront-ui/vue";
import LazyHydrate from 'vue-lazy-hydration';
import { addBasePath } from '@vue-storefront/core';

export default {
    components: {
      LazyHydrate,
        SfHero,
    },
    setup() {
      return {
        addBasePath
      }
    }
}
</script>

<style lang="scss" scoped>
#our-promise-footer-category {
  @include for-mobile{
    padding: 16px;
  }
}
#our-promise-footer-category .card {
  background: #f1f2f3;
  height: 140px;
  @include for-mobile{
    height: 130px;
  }
  width: 298px;
}

#our-promise-footer-category .card > div {
  padding: 36px 27px;
  @include for-mobile{
    padding-top: 18px;
  }
  display: flex;
}

#our-promise-footer-category .flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @include for-mobile {
    justify-content: space-around;
  }
}

#our-promise-footer-category .card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  @include for-mobile {
    margin-bottom: 10px;
    align-items: flex-start;
  }
}
#our-promise-footer-category img {
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
#our-promise-footer-category .card:nth-child(2) > div {
  padding-top: 36px;
  @include for-mobile{
    padding-top: 18px;
  }
  padding-right: 17px;
  padding-left: 20px;
}
#our-promise-footer-category .card:nth-child(4) > div {
  padding-top: 36px;
  @include for-mobile{
    padding-top: 18px;
  }
  padding-right: 21px;
  padding-left: 22px;
}

#our-promise-footer-category .card:nth-child(2) img {
  margin-right: 16px;
}
#our-promise-footer-category .card:nth-child(4) img {
  margin-right: 16px;
}
#our-promise-footer-category h3 {
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
<style  lang='scss'>
#our-promise-footer-category .sf-hero__bullets {
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
</style>