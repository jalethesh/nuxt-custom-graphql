<template>
<!-- begin: Payment Modal -->
<SfModal
  :visible="visible"
  @close="$emit('close')"
>
  <div class="flex flex-col gap-4 items-center">
    <SfImage
      :src="addBasePath(payment.image)"
      :alt="payment.name"
    />
    <p class="text-center payment-description mb-6">
      {{ `Pay now via ${payment.name} Online Checkout.`}}<br/>
      {{ `You will receive a ${payment.name} push to the following number.`}}<br/>
      0709 339 000
    </p>
    <CopiaButton
      class="sf-button--full-width"
      color="Grey"
      outline
      @click="handleChangePhoneNumber"
    >
      {{ $t('Change phone number') }}
    </CopiaButton>
    <CopiaButton class="sf-button--full-width"
      @click="handleInitiagePayment"
    >
      {{ $t('Initiate payment') }}
    </CopiaButton>
  </div>
</SfModal>
<!-- end: Payment Modal -->
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { onSSR, addBasePath } from "@vue-storefront/core";
import {
  SfModal,
  SfImage
} from "@storefront-ui/vue";
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';
import { Payment } from '~/copia-api/types';

export default defineComponent({
  components: {
    SfModal,
    SfImage,
    CopiaButton
  },
  props: {
    payment: {
      type: Object as PropType<Payment>,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'close'
  ],
  setup(props) {
    const handleChangePhoneNumber = () => {
      // function content goes here
    }
    const handleInitiagePayment = () => {
      // function content goes here
    }

    return {
      addBasePath,
      handleChangePhoneNumber,
      handleInitiagePayment
    }
  },
})
</script>
