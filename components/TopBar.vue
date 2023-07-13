<template>
  <SfTopBar class="topbar bg-secondary-yellow">
    <template #left>
      <SfButton class="sf-button--text need-help">{{
        $t('Need help?')
      }}</SfButton>
      <div class="call-to-order flex items-center desktop-only">
        <div class="bg-black p-1 rounded-2xl cursor-pointer">
          <SfIcon :icon="'phone'" size="1.1rem" color="white " />
        </div>
        <p>&nbsp;{{ $t('Call to order:') }}</p>
        <p>&nbsp;{{ contactNumber }}</p>
      </div>
    </template>
    <template #center>
      <div class="desktop-only flex">
        <p class="where-deliver">{{ $t('Where we deliver?') }}</p>
        <SfButton class="topbar__button sf-button--text">{{
          $t('Find out here')
        }}</SfButton>
      </div>
      <div class="smartphone-only">
        <nuxt-link :to="localePath('/')">
          <img
            :src="'/homepage/logo-mobile.svg'"
            alt="logo"
            class="logo-mobile"
          />
        </nuxt-link>
      </div>
    </template>
    <template #right>
      <SfButton class="topbar__button sf-button--text desktop-only">{{
        $t('FAQs?')
      }}</SfButton>
      <SfButton class="topbar__button sf-button--text desktop-only">{{
        $t('How Copia works?')
      }}</SfButton>
      <SfButton class="topbar__button sf-button--text smartphone-only">{{
        $t('FAQs')
      }}</SfButton>
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar, SfIcon } from '@storefront-ui/vue';
import { ref, useContext } from '@nuxtjs/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    SfIcon,
  },
  setup() {
    const contactNumber = ref('0709 339 000');
    return { contactNumber };
  },
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  padding-top: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Montserrat';
  color: #1d1f22;
  @include for-desktop {
    padding-bottom: 22px;
  }
  .sf-top-bar {
    &__center {
      // @include for-desktop {
      margin-right: 12%;
      // }
    }
  }
  .need-help {
    font-size: 14px;
    font-weight: 700;
    font-family: 'Montserrat';
    color: #1d1f22;
  }
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
  .call-to-order {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Montserrat';
    color: #1d1f22;
    .call-icon {
      border-radius: 100%;
      padding: 10px;
    }
  }
}

#center {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Montserrat';
  color: #1d1f22;
}
#right {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Montserrat';
  color: #1d1f22;
}
.topbar__button {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Montserrat';
  color: #1d1f22;
}
.where-deliver {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Montserrat';
  color: #1d1f22;
}
</style>
<style lang="scss">
.topbar {
  .sf-top-bar {
    &__center {
      @include for-desktop {
        margin-right: 12%;
      }
    }
  }
  .sf-top-bar__container {
    @include for-mobile {
      padding: 0 11px;
    }
  }
}
</style>
