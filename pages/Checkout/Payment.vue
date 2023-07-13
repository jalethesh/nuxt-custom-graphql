<template>
  <div>
    <!-- begin: Payment Modal -->
    <PaymentModal
      v-if="currentPayment"
      :payment="currentPayment"
      :visible="isPaymentModalOpen"
      @close="isPaymentModalOpen = !isPaymentModalOpen"
    />
    <!-- end: Payment Modal -->
    <!-- begin: Select your payment method -->
    <div class="flex flex-col lg:flex-row justify-between my-10">
      <SfHeading
        :level="3"
        :title="$t('Select your payment method')"
        class="sf-heading--left"
      />      
      <SfLink
        href="#"
        class="flex items-center h-fit font-bold"
      >
        <SfIcon
          icon="info"
          size="sm"
          class="lg:mr-2 mr-1"
        />
        {{ $t('Need any assistance?') }}
      </SfLink>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <BoxTab
        v-for="(paymentMethod, index) in mockup_paymentMethods"
        :key="index"
        class="select-payment"
      >
        <template #content>
          <div class="flex flex-col gap-4" 
            @click="togglePaymentModal(index)"
          >
            <SfHeading
              :level="5"
              :title="paymentMethod.name"
              class="sf-heading--left uppercase"
            />
            <SfImage
              :src="addBasePath(paymentMethod.image)"
              :alt="paymentMethod.name"
            />
            <p class="text-left">
              {{ paymentMethod.description }}
            </p>
          </div>
        </template>
      </BoxTab>
    </div>
    <!-- end: Select your payment method -->

    <!-- begin: Payment Methods -->
    <SfHeading
      :level="3"
      :title="$t('Payment Methods')"
      class="sf-heading--left my-10"
    />

    <SfRadio
      value="payment"
      selected="payment"
      class="sf-radio--transparent mb-8"
    >
      <template #label>
        <div class="flex items-center gap-4">
          <SfImage
            :src="addBasePath('/checkout/visa.png')"
            :width="50"
            alt="visa"
          />
          <SfImage
            :src="addBasePath('/checkout/mastercard.png')"
            :width="50"
            alt="mastercard"
          />
          <SfImage
            :src="addBasePath('/checkout/maestro.png')"
            :width="50"
            alt="maestro"
          />
        </div>
      </template>
    </SfRadio>
    <ValidationObserver ref="cardFormRef">
      <ValidationProvider
        name="cardNumber"
        rules="required"
        v-slot="{ errors }"
        slim
      >
        <SfInput
          v-model="cardForm.number"
          label="Card number"
          name="cardNumber"
          :valid="!errors[0]"
          :errorMessage="errors[0]"
          class="mb-3"
        />
      </ValidationProvider>
      <ValidationProvider
        name="cardHolder"
        rules="required"
        v-slot="{ errors }"
        slim
      >
        <SfInput
          v-model="cardForm.holder"
          label="Card holder"
          name="cardHolder"
          :valid="!errors[0]"
          :errorMessage="errors[0]"
          class="mb-3"
        />
      </ValidationProvider>
      <div class="grid grid-cols-1 lg:grid-cols-4 items-center">
        <div class="font-bold lg:pb-4">
          Expiry Date:
        </div>
        <div class="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
          <ValidationProvider
            name="month"
            rules="required"
            v-slot="{ errors }"
          >
            <SfSelect
              v-model="cardForm.expiryMonth"
              label="Month"
              name="month"
              class="sf-select--underlined mb-3"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            >
              <SfSelectOption
                v-for="month in 12"
                :key="month"
                :value="month"
              >
                {{ month }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>
          <ValidationProvider
            name="year"
            rules="required"
            v-slot="{ errors }"
          >
            <SfSelect
              v-model="cardForm.expiryYear"
              label="Year"
              name="year"
              class="sf-select--underlined mb-3"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            >
              <SfSelectOption
                v-for="year in 99"
                :key="year"
                :value="`20${year}`"
              >
                {{ `20${year}` }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 items-center">
        <ValidationProvider
          name="codeCVC"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="cardForm.cvc"
            label="Code CVC"
            name="codeCVC"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="lg:mb-3"
          />
        </ValidationProvider>
        <SfLink href="#" class="lg:col-span-2 font-bold lg:pb-5 find-cvc">
          {{ $t("Where can I find CVC code?") }}
        </SfLink>
      </div>
    </ValidationObserver>
    <!-- end: Payment Methods -->

    <!-- begin: Billing address -->
    <SfHeading
      :level="3"
      :title="$t('Billing address')"
      class="sf-heading--left my-10"
    />

    <ValidationObserver ref="addressFormRef">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <ValidationProvider
          name="firstName"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="billingForm.firstName"
            label="First Name"
            name="firstName"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="mb-3"
          />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="billingForm.lastName"
            label="Last Name"
            name="lastName"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="mb-3"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        name="streetName"
        rules="required"
        v-slot="{ errors }"
      >
        <SfInput
          v-model="billingForm.streetName"
          label="Street Name"
          name="streetName"
          :valid="!errors[0]"
          :errorMessage="errors[0]"
          class="mb-3"
        />
      </ValidationProvider>
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="billingForm.city"
            label="City"
            name="city"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="mb-3"
          />
        </ValidationProvider>
        <ValidationProvider
          name="state"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="billingForm.state"
            label="State / Province"
            name="state"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="mb-3"
          />
        </ValidationProvider>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <ValidationProvider
          name="zipCode"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="billingForm.zipCode"
            label="Zip-code"
            name="zipCode"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="mb-3"
          />
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-model="billingForm.country"
            label="Country"
            name="country"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            class="mb-3"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        name="phoneNumber"
        rules="required"
        v-slot="{ errors }"
      >
        <SfInput
          v-model="billingForm.phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          :valid="!errors[0]"
          :errorMessage="errors[0]"
          class="mb-3"
        />
      </ValidationProvider>
      <CopiaButton
        type="submit"
        color="Red"
        class="desktop-only"
      >
        {{ $t('Confirm and Pay') }}
      </CopiaButton>
      <div class="footer fixed z-10 bottom-0 left-0 right-0 smartphone-only bg-white w-full p-4">
        <CopiaButton
          type="submit"
          color="Red"
          class="sf-button--full-width"
        >
          {{ $t('Confirm and Pay') }}
        </CopiaButton>     
      </div>
    </ValidationObserver>
    <!-- end: Billing address -->
</div>
</template>

<script lang="ts">
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfLink,
  SfRadio,
  SfInput,
  SfSelect,
  SfModal
} from "@storefront-ui/vue";
import BoxTab from '~/components/Checkout/BoxTab.vue';
import { onSSR, addBasePath } from "@vue-storefront/core";
import { ref, reactive, onMounted, defineComponent } from "@nuxtjs/composition-api";
import CopiaButton from "~/components/Core/Atoms/CopiaButton.vue";
import PaymentModal from "~/components/Checkout/PaymentModal.vue";
import {
  useCountrySearch
} from "@vue-storefront/odoo";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { Payment } from '~/copia-api/types';

export default defineComponent({
  name: "Payment",
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfLink,
    SfRadio,
    SfInput,
    SfSelect,
    SfModal,
    BoxTab,
    ValidationProvider,
    ValidationObserver,
    CopiaButton,
    PaymentModal,
  },
  setup(props, context) {
    const {
      search: searchCountries,
      countries
    } = useCountrySearch(`country-search`);
    const cardForm = reactive(
      {
        number: null,
        holder: null,
        expiryMonth: null,
        expiryYear: null,
        cvc: null
      }
    );
    const billingForm = reactive({
      firstName: '',
      lastName: '',
      streetName: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
    })
    const isPaymentModalOpen = ref<boolean>(false);
    const currentPayment = ref<Payment>(null);

    // Replace with composable to fetch data from backend
    const mockup_paymentMethods = ref<Array<Payment>>([
      {
        name: 'M-PESA EXPRESS',
        image: '/checkout/m-pesa_express.png',
        description: 'This is a description of the payment method and how it works'
      },
      {
        name: 'M-PESA PAYBILL',
        image: '/checkout/m-pesa_paybill.png',
        description: 'This is a description of the payment method and how it works'
      },
      {
        name: 'BONGA POINTS',
        image: '/checkout/bonga_points.png',
        description: 'This is a description of the payment method and how it works'
      },
      {
        name: 'AIRTEL ONLINE',
        image: '/checkout/airtel_online.png',
        description: 'This is a description of the payment method and how it works'
      },
      {
        name: 'AIRTEL PAYBILL',
        image: '/checkout/airtel_paybill.png',
        description: 'This is a description of the payment method and how it works'
      },
      {
        name: 'COPIA PESA',
        image: '/checkout/copia_pesa.png',
        description: 'This is a description of the payment method and how it works'
      }
    ])

    const togglePaymentModal = (index:number) => {
      currentPayment.value = mockup_paymentMethods.value[index];
      isPaymentModalOpen.value = !isPaymentModalOpen.value;
    }

    onMounted(async () => {
      await searchCountries();
    });

    return {
      cardForm,
      billingForm,
      mockup_paymentMethods,
      countries,
      isPaymentModalOpen,
      currentPayment,
      togglePaymentModal,
      addBasePath,
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/checkout/payment.scss';
</style>
