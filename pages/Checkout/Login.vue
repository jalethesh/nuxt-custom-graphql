<template>
    <div id="login">
        <div v-if="isCreateAccount" class="max-w-md mx-auto">
            <h3 class="header-text text-left lg:text-center mt-10">Create New Account</h3>
            <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
                <form class="form" @submit.prevent="handleSubmit(handleRegister)">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <SfInput
                            data-cy="login-input_name"
                            v-model="registerForm.firstName"
                            :valid="!errors[0]"
                            :errorMessage="errors[0]"
                            name="first name"
                            label="Your first name"
                            class="form__element mb-8"
                        />
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <SfInput
                            data-cy="login-input_name"
                            v-model="registerForm.lastName"
                            :valid="!errors[0]"
                            :errorMessage="errors[0]"
                            name="last name"
                            label="Your last name"
                            class="form__element mb-8"
                        />
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <SfInput
                            data-cy="login-input_email"
                            v-model="registerForm.email"
                            :valid="!errors[0]"
                            :errorMessage="errors[0]"
                            name="email"
                            label="Your mobile number or email address"
                            class="form__element mb-8"
                        />
                    </ValidationProvider>

                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <SfInput
                            data-cy="login-input_password"
                            v-model="registerForm.password"
                            :valid="!errors[0]"
                            :errorMessage="errors[0]"
                            name="password"
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            class="form__element mb-4"
                            hasShowPassword
                        >
                            <template #icon>
                                <img
                                    v-if="showPassword"
                                    :src="'/icons/hidden-password.svg'"
                                    class="absolute top-3 right-0 cursor-pointer"
                                    @click="
                                    {
                                        showPassword = false;
                                    }
                                    "
                                />
                                <img
                                    v-else
                                    :src="'/icons/show-password.svg'"
                                    class="absolute top-3 right-0 cursor-pointer"
                                    @click="
                                    {
                                        showPassword = true;
                                    }
                                    "
                                />
                            </template>
                        </SfInput>
                    </ValidationProvider>
                    
                    <SfCheckbox
                        data-cy="login-checkbox-remember-me"
                        v-model="rememberMe"
                        name="remember-me"
                        class="form__element pb-10"
                    >
                        <template #label>
                            <span class="sf-checkbox__label">
                                I declare that I have read and agree to the <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>.
                            </span>
                        </template>
                    </SfCheckbox>

                    <CopiaButton
                        data-cy="login-btn_submit"
                        type="submit"
                        class="sf-button--full-width"
                        :disabled="loading"
                    >
                        <SfLoader :class="{ loader: loading }" :loading="loading">
                            <div>{{ $t('Create New Account') }}</div>
                        </SfLoader>
                    </CopiaButton>
                </form>
            </ValidationObserver>
        </div>
        <div v-else-if="isResetPassword" class="max-w-md mx-auto">
            <h3 class="header-text text-left lg:text-center mt-10">{{ $t('Reset your password') }}</h3>
            <p class="text-center mb-8 mt-4">Enter the mobile number or email address associated with your account, and we will send you a link to reset your password.</p>
            <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
                <form class="form" @submit.prevent="handleSubmit(handleResetPassword)">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <SfInput
                            data-cy="reset-input_email"
                            v-model="resetPasswrodForm.email"
                            :valid="!errors[0]"
                            :errorMessage="errors[0]"
                            name="email"
                            label="Your mobile number or email address"
                            class="form__element mb-4"
                        />
                    </ValidationProvider>

                    <CopiaButton
                        data-cy="login-btn_submit"
                        type="submit"
                        class="sf-button--full-width"
                        :disabled="loading"
                    >
                        <SfLoader :class="{ loader: loading }" :loading="loading">
                            <div>{{ $t('Reset your password') }}</div>
                        </SfLoader>
                    </CopiaButton>

                </form>
            </ValidationObserver>
        </div>
        <div v-else>
            <div class="max-w-md mx-auto">
                <h3 class="header-text text-left lg:text-center mt-10">Login</h3>
                <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
                    <form class="form" @submit.prevent="handleSubmit(handleLogin)">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <SfInput
                                data-cy="login-input_email"
                                v-model="loginForm.email"
                                :valid="!errors[0]"
                                :errorMessage="errors[0]"
                                name="email"
                                label="Your mobile number or email address"
                                class="form__element mb-8"
                            />
                        </ValidationProvider>
    
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <SfInput
                                data-cy="login-input_password"
                                v-model="loginForm.password"
                                :valid="!errors[0]"
                                :errorMessage="errors[0]"
                                name="password"
                                label="Password"
                                type="password"
                                class="form__element mb-4"
                            />
                        </ValidationProvider>
                        
                        <div class="flex justify-between pb-10">
                            <SfCheckbox
                                data-cy="login-checkbox-remember-me"
                                v-model="rememberMe"
                                name="remember-me"
                                label="Remember me"
                                class="form__element"
                            />
                            <a class="forgot-password" @click="isResetPassword = !isResetPassword">
                                {{ $t('I forgot my password') }}
                            </a>
                        </div>
    
                        <CopiaButton
                            data-cy="login-btn_submit"
                            type="submit"
                            class="sf-button--full-width"
                            :disabled="loading"
                        >
                            <SfLoader :class="{ loader: loading }" :loading="loading">
                                <div>{{ $t('Log into your account') }}</div>
                            </SfLoader>
                        </CopiaButton>
    
                    </form>
                </ValidationObserver>
            </div>
    
            <hr class="my-10" />
    
            <div class="max-w-md mx-auto">
                <CopiaButton type="submit" class="sf-button--full-width" color="Grey" outline
                    @click="handleToggleToGuest"
                >
                    <SfLoader :class="{ loader: loading }" :loading="loading">
                        <div>{{ $t('GUEST CHECKOUT') }}</div>
                    </SfLoader>
                </CopiaButton>
    
                <CopiaButton type="submit" class="sf-button--full-width mt-4" color="Grey"
                    @click="isCreateAccount = !isCreateAccount"
                >
                    <SfLoader :class="{ loader: loading }" :loading="loading">
                        <div>{{ $t('CREATE NEW ACCOUNT') }}</div>
                    </SfLoader>
                </CopiaButton>
    
            </div>
        </div>
        <div class="bottom">
            <h5 class="text-left lg:text-center">Enjoy these perks with your free account!</h5>
            <div class="flex justify-center flex-col lg:flex-row">
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
</template>

<script>
import { ref, reactive, watch, defineComponent } from '@nuxtjs/composition-api';
import { useUiNotification } from '~/composables';
import { useCheckout } from '~/composables';
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
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { usePassword } from '@vue-storefront/odoo';
import { useUser } from '~/composables';
import { onSSR } from '@vue-storefront/core';

export default defineComponent({
    name: 'checkoutLogin',
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
    setup(props, { root }) {
        const { send } = useUiNotification();
        const {
            user,
            login,
            register,
            loading,
            error,
            isAuthenticated,
            load: userLoad
        } = useUser();
        const {
            errors: resetPasswordErrors,
            sendResetPassword
        } = usePassword()
        const {
            order,
            isGuest,
            setAddress,
            toggleToGuest
        } = useCheckout();

        const loginForm = reactive({
            email: '',
            password: ''
        });
        const registerForm = reactive({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
        const resetPasswrodForm = reactive({
            email: ''
        });
        const isCreateAccount = ref(false);
        const isResetPassword = ref(false);
        const showPassword = ref(false);
        const rememberMe = ref(false);

        const handleLogin = async () => {
            await login({
                user: {
                    username: loginForm.email,
                    password: loginForm.password
                }
            });

            if (error.value.login) {
                send({ message: error?.value?.login?.message, type: 'danger' });
                return;
            }
        };

        const handleRegister = async () => {
            await register({
                user: registerForm, customQuery: { signUpUser: 'customSignUpUserMutation' },
            });

            if (error.value.register)
                send({ message: error?.value?.register?.message, type: 'danger' });
        }

        const handleResetPassword = async () => {
            await sendResetPassword({
                email: resetPasswrodForm.email
            });

            if (resetPasswordErrors.value) {
                console.log('resetPasswordErrors:', resetPasswordErrors.value);
            }
        }

        const handleToggleToGuest = () => {
            root.$router.push('/checkout/guest');
            toggleToGuest();
        }

        watch (
            () => isAuthenticated.value,
            async (newVal) => {
                if (newVal) {
                    console.log('user-2:', user.value);
                    const firstName = user.value.firstName;
                    const lastName = user.value.lastName;
                    const emailPhone = user.value.phone || user.value.email;
                    await setAddress({
                        customer: {
                            firstName,
                            lastName,
                            emailPhone,
                        }
                    });
                    root.$router.push('/checkout/delivery');
                }
            }
        )

        if (isAuthenticated.value) {
            if (!order.value) {
                // If setAddress has not been sent already...
                (async () => {
                    console.log('user-1:', user);
                    const firstName = user.value.firstName;
                    const lastName = user.value.lastName;
                    const emailPhone = user.value.phone || user.value.email;

                    await setAddress({
                        customer: {
                            firstName,
                            lastName,
                            emailPhone
                        }
                    });

                    root.$router.push('/checkout/delivery');
                })();
            } else {
                root.$router.push('/checkout/delivery');
            }
        }

        onSSR(async () => {
            await userLoad();
        })

        return {
            rememberMe,
            isCreateAccount,
            isResetPassword,
            showPassword,
            loginForm,
            registerForm,
            resetPasswrodForm,
            loading,
            handleLogin,
            handleRegister,
            handleResetPassword,
            handleToggleToGuest,
        }
    }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/checkout/login.scss';
</style>
