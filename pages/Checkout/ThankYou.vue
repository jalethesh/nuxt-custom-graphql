<template>
  <div id="thank-you">
    <SfCallToAction
      v-e2e="'thank-you-banner'"
      class="banner"
      title="Thank you for your order!"
      :image="{
        mobile: '/thankyou/bannerM.png',
        desktop: '/thankyou/bannerD.png',
      }"
    >
      <template #description>
        <div class="banner__order-number">
          <span>{{ $t('Order No.') }}</span>
          <strong>{{ `# ${ cartGetters.getOrderNumber(cart) }` }}</strong>
          <!-- <strong>#80932031-030-00</strong> -->
        </div>

        <div class="banner__order-number" v-if="paymentRefused">
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="redirectToPayment"
          >
            Pay
          </SfButton>
        </div>
      </template>
    </SfCallToAction>
    <section class="section grid lg:grid-cols-2">
      <div class="order">
        <SfHeading
          title="Your Purchase"
          class="order__heading sf-heading--left"
          :level="3"
        />
        <p class="order__paragraph">
          {{ $t('Successful placed order') }}
        </p>
        <div class="order__contact lg:w-full w-2/3">
          <SfHeading
            :level="6"
            class="sf-heading--left"
            title="Primary contacts for any questions"
          ></SfHeading>
          <p class="order__contact-number">{{ companyDetails.number }}</p>
        </div>
        <CopiaButton
          color="Black"
          outline
          class="lg:mt-10 mt-7 lg:ml-4 ml-0 lg:w-auto w-full"
          @click="backToHome"
        >
          {{ $t('Back to home page') }}
        </CopiaButton>
      </div>
    </section>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfCallToAction } from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { usePayment, useCart, cartGetters } from '@vue-storefront/odoo';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';

export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction,
    CopiaButton
  },
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const { getPaymentConfirmation } = usePayment();
    const {
      cart,
      load: loadCart
    } = useCart();

    const companyDetails = ref({
      number: '0709 339 000'
    });

    onMounted(async () => {
      await getPaymentConfirmation();
    });

    const redirectToPayment = () => {
      return root.$router.push('/checkout/payment');
    };

    const backToHome = () => {
      return root.$router.push('/');
    };

    onSSR(async () => {
      await loadCart();
    })

    return {
      cartGetters,
      cart,
      companyDetails,
      redirectToPayment,
      backToHome
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/checkout/thankyou.scss';
</style>
