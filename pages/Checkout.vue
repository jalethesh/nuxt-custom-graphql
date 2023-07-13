<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps
          v-if="!isThankYou"
          :active="currentStepIndex"
          :class="{ checkout__steps: true }"
          @change="handleStepClick"
        >
          <template #steps={step,stepClick}>
            <SfButton
              :key="step.index"
              class="sf-button--pure"
              :class="{
                'sf-steps__step': true,
                'is-done': step.done,
                current: step.index<=currentStepIndex,
                'is-disabled': step.disabled,
              }"
              data-testid="steps-button"
              @click="stepClick(step)"
            >
              <span class="sf-steps__title">{{ step.step }}</span>
            </SfButton>
          </template>
          <SfStep v-for="(step, key) in steps" :key="key" :name="step">
            <nuxt-child />
          </SfStep>
        </SfSteps>
        <nuxt-child v-else />
      </div>
      <div v-if="!isThankYou" class="checkout__aside lg:pt-0 pt-10" :class="{ 'lg:pb-0 pb-20': currentStep !== 'login' }">
        <transition name="fade">
          <CartPreview key="order-summary"/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps, SfButton } from '@storefront-ui/vue';
import CartPreview from '~/components/Checkout/CartPreview';
import { computed, ref } from '@vue/composition-api';
import { useCheckout } from '~/composables';

export default {
  name: 'Checkout',
  layout: "checkout",
  components: {
    SfButton,
    SfSteps,
    CartPreview
  },
  setup(props, context) {
    const {
      isGuest
    } = useCheckout();
    
    const steps = ref({});

    console.log('guest:', isGuest);
    
    if (isGuest.value) {
      steps.value = {
        guest: 'Guest',
        delivery: 'Delivery',
        payment: 'Payment'
      };
    } else {
      steps.value = {
        login: 'Login',
        delivery: 'Delivery',
        payment: 'Payment'
      };
    }

    const currentStep = computed(() =>
      context.root.$route.path.split('/').pop()
    );
    const currentStepIndex = computed(() => {
      return Object.keys(steps.value).findIndex((s) => s === currentStep.value);
    });
    const isThankYou = computed(() => currentStep.value === 'thank-you');
    const handleStepClick = (stepIndex) => {
      const key = Object.keys(steps.value)[stepIndex];
      context.root.$router.push(`/checkout/${key}`);
    };
    return {
      handleStepClick,
      steps,
      currentStepIndex,
      isThankYou,
      currentStep
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/checkout.scss';
</style>
