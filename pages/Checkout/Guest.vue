<template>
    <div>
        <h3 class="header-text text-left lg:text-center mt-10">Guest Checkout</h3>
        <div class="flex justify-center items-center my-10">
            <SfIcon :icon="'info'" class="mr-2" size="1.5rem" color="gray-secondary"/>
            <p class="text-info">We will use your e-mail address or your mobile only to confirm your order.</p>
        </div>
        <div class="max-w-md mx-auto">
            <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
                <form class="form" @submit.prevent="handleSubmit(handleGuestFormSubmit)">
                    <div class="lg:grid lg:grid-cols-2 gap-8">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <SfInput
                                data-cy="guest-input_firstName"
                                v-model="guestForm.firstName"
                                :valid="!errors[0]"
                                :errorMessage="errors[0]"
                                name="firstName"
                                label="Your first name"
                                class="mb-8"
                            />
                        </ValidationProvider>
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <SfInput
                                data-cy="guest-input_lastName"
                                v-model="guestForm.lastName"
                                :valid="!errors[0]"
                                :errorMessage="errors[0]"
                                name="lastName"
                                label="Your last name"
                                class="mb-8"
                            />
                        </ValidationProvider>
                    </div>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <SfInput
                            data-cy="guest-input_phone"
                            v-model="guestForm.phone"
                            :valid="!errors[0]"
                            :errorMessage="errors[0]"
                            name="phone"
                            label="Your mobile number or email address"
                            class="mb-4"
                        />
                    </ValidationProvider>                    
                    <SfCheckbox
                        data-cy="guest-checkbox-create-accoount"
                        v-model="rememberMe"
                        name="create-account"
                        label="I want to create a free account"
                        class="mb-10"
                    />            
                    <CopiaButton
                        data-cy="guest-btn_submit"
                        type="submit"
                        class="sf-button--full-width mt-4 m-auto"
                        key="guest-btn_submit"
                        :disabled="loading"
                    >
                        <SfLoader :class="{ loader: loading }" :loading="loading">
                            <div>{{ $t('Continue to Delivery') }}</div>                    
                        </SfLoader>
                    </CopiaButton>
                </form>
            </ValidationObserver>

            <div class="bottom mt-10">
                <h5 class="text-left lg:text-center">Enjoy these perks with your free account!</h5>
                <div class="flex justify-center flex-col lg:flex-row py-6">
                    <div class="flex items-center">
                        <img src="~/static/icons/clock.svg" alt="clock" class="mr-3 p-0.5" />
                        <p class="mr-7">Faster checkout</p>
                    </div>
                    <div class="flex items-center pt-6 lg:pt-0">
                        <SfIcon :icon="'heart'" class="mr-3" size="1.25rem" />
                        <p>Manage your favorites</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, defineComponent } from '@vue/composition-api';
import { useUiNotification } from '~/composables';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';

import {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    SfBar,
    SfIcon
} from '@storefront-ui/vue';
import { useCheckout } from '~/composables';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required.',
});

export default defineComponent({
    name: 'checkoutGuest',
    components: {
        SfModal,
        SfInput,
        SfButton,
        SfCheckbox,
        SfLoader,
        SfAlert,
        ValidationProvider,
        ValidationObserver,
        SfBar,
        SfIcon,
        CopiaButton
    },
    setup(pros, { root }) {
        const { send } = useUiNotification();
        const {
            order,
            loading,
            setAddress,
            error
        } = useCheckout();
        
        const guestForm = reactive({
            firstName: '',
            lastName: '',
            phone: ''
        });
        const rememberMe = ref(false);

        const handleGuestFormSubmit = async () => {
            console.log('guest:', guestForm);
            await setAddress({
                customer: {
                    firstName: guestForm.firstName,
                    lastName: guestForm.lastName,
                    emailPhone: guestForm.phone
                }
            });

            if (error.setAddress) {
                console.log('error:', error.setAddress);
            } else {
                root.$router.push('/checkout/delivery');
            }
        };

        // if (order.value) {
        //     root.$router.go(-1);
        // }

        return {
            loading,
            handleGuestFormSubmit,
            guestForm,
            rememberMe
        }
    }
})
</script>

<style lang="scss" scoped>
@import '~/assets/css/checkout/guest.scss';
</style>
