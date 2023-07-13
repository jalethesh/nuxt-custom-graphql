<template>
  <SfFooter multiple class="footer" logo="/assets/logo.svg">
    <div class="absolute top-0 left-0 w-full desktop-only">
      <img :src="'/homepage/footer.svg'" class="w-full" />
    </div>
    <SfFooterColumn :title="$t('Copia')">
      <div class="footer__logo">
        <SfImage
          class="footer__logo-image"
          :src="addBasePath('/icons/logo.svg')"
          alt="logo"
          :width="173"
          :height="52"
        />
        <p class="footer-description">
          Copia is a service where you buy <br />
          quality goods with affordable prices and send to mashinani for free,
          in just 2 to 4 days.
        </p>
      </div>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('About us')">
      <SfList>
        <SfListItem v-for="item in aboutUs" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Shop By')">
      <SfList>
        <SfListItem v-for="item in ShopBy" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('SUPPORT')">
      <SfList>
        <SfListItem v-for="item in Support" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Social">
      <div class="footer__socials">
        <SfImage
          class="footer__social-image cursor-pointer"
          v-for="item in social"
          :key="item"
          :src="addBasePath('/icons/' + item + '.svg')"
          :alt="item"
          :width="32"
          :height="32"
        />
      </div>
    </SfFooterColumn>
    <SfFooterColumn>
      <div class="sub-div">
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form
            @submit.prevent="handleSubmit(onSubscribe)"
            style="display: flex; height: 46px"
          >
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                class="sf-input--outline sub-email"
                type="text"
                placeholder="Type your email address"
                :valid="!errors[0]"
                v-model="emailAddress"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
              <button
                class="sf-button subscribe-button"
                :aria-disabled="false"
                :link="null"
                type="submit" 
              >
                Subscribe
              </button>
          </form>
        </ValidationObserver>
      </div>
    </SfFooterColumn>
    <div class="smartphone-only phone-logo">
      <nuxt-link :to="localePath('/')">
        <img
          :src="'/homepage/logo-mobile.svg'"
          alt="logo"
          class="logo-mobile"
        />
      </nuxt-link>
    </div>
  </SfFooter>
</template>

<script>
import {
  SfFooter,
  SfList,
  SfImage,
  SfMenuItem,
  SfInput,
} from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
import { useNewsLetter } from '@vue-storefront/odoo';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { ref } from '@nuxtjs/composition-api';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
    SfInput,
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const { sendSubscription, loading } = useNewsLetter();
    const emailAddress = ref('');
    const { send } = useUiNotification();

    const onSubscribe = async () => {
      const data = await sendSubscription({ email: emailAddress.value });
      if (data?.subscribed) {
        send({
          message: 'Subscribe successfull!',
          type: 'success'
        });
      }
      if (!data?.subscribed) {
        send({
          message: 'Something wrong!',
          type: 'danger'
        });
      }
    };
    return {
      addBasePath,
      onSubscribe,
      emailAddress,
      sendSubscription,
      loading,
    };
  },
  data() {
    
    return {
      aboutUs: ['Our story', 'Contact us', 'Policy', 'Careers'],
      ShopBy: ['New arrival', 'Best seller', 'Featured product', 'Copia deals'],
      Support: ['Blog', 'FAQs', 'Order tracking', 'Shipping and returns'],
      social: [
        'facebookicon',
        'pinteresticon',
        'googleicon',
        'twittericon',
        'youtubeicon',
      ],
      isMobile: false,
      desktopMin: 1024,
    };
  },
};
</script>

<style lang="scss">
.footer {
  position: relative;
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
  .sf-chevron__bar:after {
    background: #43464e;
  }
  .sf-footer-column__title {
    @include for-mobile {
      padding: 21px 24px;
    }
  }
  .sf-list__item {
    @include for-mobile {
      margin-right: 24px;
      margin-left: 24px;
    }
  }
  .footer__socials {
    @include for-mobile {
      padding: 4px 24px 0;
    }
  }
  .sf-footer-column,
  .sf-footer-column__title {
    background-color: var(--_c-copia-gray-light-accent);
  }
  .sf-menu-item__label,
  .sf-footer-column__title {
    color: var(--_c-copia-secondary-black);
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 14px;
  }
  .sf-footer-column__title {
    font-size: 16px;
  }
  .footer__logo {
    @include for-desktop {
      margin-right: 50px;
    }
    @include for-mobile {
      margin-right: 24px;
      margin-left: 24px;
    }
  }
}
.sf-footer {
  background-color: var(--_c-copia-gray-light-accent) !important;
  @include for-desktop {
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: 0;
    grid-template-columns: 4fr 1fr 1.5fr 2fr !important;
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}

.footer-description {
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #43464e;
  margin-top: 24px;

}
.subscribe-button {
  background: #fecb06;
  font-size: 12px;
  font-family: 'Raleway';
  color: #1d1f22;
  border-radius: 5px;
  font-weight: 800;
  padding: 0px 24px;
  line-height: 20px;
  @include for-mobile {
    margin-left: -10px;
  }
}

.sub-div {
  display: flex;
  @include for-mobile {
    width: 100%;
    span{
      width: 100%;
    }
    .sf-input__bar{
      width: auto !important;
    }
  }
}

.sf-footer-column:nth-child(6) {
  .sf-footer-column__content {
    @include for-mobile {
      display: block !important;
    }
  }
  @include for-mobile {
    background: #1d1f22;
  }
  .sf-footer-column__title {
    @include for-mobile {
      color: white;
      background: #1d1f22;
    }
  }
  .sf-chevron__bar:after {
    @include for-mobile {
      display: none;
    }
  }
}
.sf-footer-column:nth-child(7) {
  grid-column-end: span 3;
  margin-left: 10%;
  @include for-mobile {
    margin-left: 0;
    grid-column: span 1;
  }
  .sf-chevron__bar:after {
    @include for-mobile {
      display: none;
    }
  }
  .sf-footer-column__title {
    @include for-mobile {
      display: none;
    }
  }
  .sf-footer-column__content {
    @include for-mobile {
      display: block !important;
      background: #1d1f22;
      padding: 0 24px 37px 24px;
    }
  }
}
.sub-email {
  @include for-mobile {
    width: 100%;
  }
}
.sub-email input {
  width: 300px;
  padding: 0;
  border: 0;
  font-weight: 400;
  padding-left: 15px;
  font-size: 16px;
  font-family: 'Lato';
  background: white;
  width: 242px;
  border-radius: 8px;
  margin-right: -10px;
  padding-top: 13px;
  padding-bottom: 14px;
  @include for-mobile {
    width: 100%;
  }
}
.phone-logo {
  display: flex;
  justify-content: center;
  background: #1d1f22;
  padding-bottom: 32px;
}
</style>
