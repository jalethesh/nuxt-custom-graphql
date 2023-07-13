<template>
  <SfModal
    :visible="isLoginModalOpen"
    class="modal login-modal"
    @close="() => {toggleLoginModal(); (welcomeCopia = false); (resetSent = false)}"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="isLogin ? 'Log in' : 'Sign in'"
        @click:close="() => {toggleLoginModal(); (welcomeCopia = false); (resetSent = false)}"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="isLogin">
        <div v-show="isForgottenPassword">
          <p class="sign-title">Reset your password.</p>
          <p class="reset-pass-text">
            {{
              $t(
                'Enter the mobile number or email address associated with your account, and we will send you a link to reset your password.'
              )
            }}
          </p>
          <div v-if="resetSent" class="reset-sent">
            <SfIcon
              icon="check"
              size="lg"
              color="white"
              viewBox="0 0 18 16"
            />
            <p>Email sent. Check your email to set a new password.</p>
          </div>
        </div>
        <div v-show="!isForgottenPassword">
          <div v-if="otpverify">
            <p class="sign-title">OTP Verification</p>
            <p class="reset-pass-text mb-0">
              {{ $t(`We sent a text message to +${form.phonenumber}.`) }}
            </p>
            <p class="reset-pass-text mt-0">
              {{ $t('Please enter the OTP code.') }}
            </p>
          </div>
          <div v-else>
            <p class="sign-title">
              Log into <br />
              your Copia account!
            </p>
            <p class="reset-pass-text">
              {{
                $t(
                  'View orders and update your details. Make your checkout fast and easy!'
                )
              }}
            </p>
          </div>
        </div>
        <div v-show="otp">
          <div v-show="otpverify">
            <ValidationObserver>
              <form class="form">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <div class="flex justify-around">
                    <SfInput
                      data-cy="login-input_phone"
                      v-model="form.verificationCode"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                      name="verifyCode"
                      class="form__element verify-form"
                    />
                    <SfInput
                      data-cy="login-input_phone"
                      v-model="form.verificationCode"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                      name="verifyCode"
                      class="form__element verify-form"
                    />
                    <SfInput
                      data-cy="login-input_phone"
                      v-model="form.verificationCode"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                      name="verifyCode"
                      class="form__element verify-form"
                    />
                    <SfInput
                      data-cy="login-input_phone"
                      v-model="form.verificationCode"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                      name="verifyCode"
                      class="form__element verify-form"
                    />
                    <SfInput
                      data-cy="login-input_phone"
                      v-model="form.verificationCode"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                      name="verifyCode"
                      class="form__element verify-form"
                    />
                    <SfInput
                      data-cy="login-input_phone"
                      v-model="form.verificationCode"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                      name="verifyCode"
                      class="form__element verify-form"
                    />
                  </div>
                </ValidationProvider>
                <p class="reset-pass-text mb-2 mt-6">
                  {{ $t('Didn’t received the OTP code?') }}
                </p>
                <div class="flex justify-center">
                  <SfButton
                    data-cy="login-btn_forgot-password"
                    class="sf-button--text color-primary forgot-password mb-10"
                  >
                    {{ $t('Resend') }}
                  </SfButton>
                </div>
                <SfButton
                  data-cy="login-btn_submit"
                  type="submit"
                  class="sf-button--full-width form__button bg-secondary-yellow bg-secondary-button"
                  :disabled="loading"
                >
                  <SfLoader :class="{ loader: loading }" :loading="loading">
                    <div>
                      {{ $t('verify & proceed') }}
                    </div>
                  </SfLoader>
                </SfButton>
              </form>
            </ValidationObserver>
          </div>
          <div v-show="!otpverify">
            <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
              <form
                class="form"
                @submit.prevent="handleSubmit(handlePhoneLogin)"
              >
                <div class="chapter-navigation">
                  <p class="navigator-title1" @click="otp = true">
                    Mobile number
                  </p>
                  <p class="navigator-title2" @click="otp = false">
                    Email address
                  </p>
                </div>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <SfInput
                    data-cy="login-input_phone"
                    v-model="form.phonenumber"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    name="phonenumber"
                    label="Your mobile number"
                    class="form__element"
                  />
                </ValidationProvider>
                <SfButton
                  data-cy="login-btn_submit"
                  type="submit"
                  class="sf-button--full-width form__button bg-secondary-yellow bg-secondary-button"
                  :disabled="loading"
                  @click="otpverify = true"
                >
                  <SfLoader :class="{ loader: loading }" :loading="loading">
                    <div>
                      {{ $t('log in into your account') }}
                    </div>
                  </SfLoader>
                </SfButton>
                <SfButton
                  data-cy="login-btn_submit"
                  class="sf-button--full-width sf-button--se sf-button--outline form__button mt-4"
                  @click="displayChoosedTrue(() => (isCreateAccount = true))"
                >
                  <div>
                    {{ $t('create new account') }}
                  </div>
                </SfButton>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <div v-show="!otp">
          <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
            <form
              class="form"
              @submit.prevent="
                handleSubmit(
                  isForgottenPassword ? handlePasswordRecovery : handleLogin
                )
              "
            >
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_email"
                  v-model="form.email"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  label="Your mobile number or email address"
                  class="form__element"
                />
              </ValidationProvider>
              <template v-if="!isForgottenPassword">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <SfInput
                    data-cy="login-input_password"
                    v-model="form.password"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    name="password"
                    type:icon="text"
                    label="Your password"
                    @click:icon="
                      {
                        showPassword = !showPassword;
                      }
                    "
                    :type="showPassword ? 'text' : 'password'"
                    class="form__element relative"
                  >
                    <template #icon>
                      <img
                        v-if="showPassword"
                        :src="'./icons/show-password.svg'"
                        class="absolute top-3 right-0 cursor-pointer"
                        @click="
                          {
                            showPassword = false;
                          }
                        "
                      />
                      <img
                        v-else
                        :src="'./icons/hidden-password.svg'"
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
                <div class="action">
                  <SfCheckbox
                    data-cy="login-checkbox-remember-me"
                    v-model="rememberMe"
                    name="remember-me"
                    label="Remember me"
                    class="form__element checkbox"
                  />
                  <SfButton
                    data-cy="login-btn_forgot-password"
                    class="sf-button--text color-primary forgot-password"
                    @click="isForgottenPassword = !isForgottenPassword"
                  >
                    {{
                      isForgottenPassword
                        ? $t('log in into your account')
                        : $t('I forgot my password?')
                    }}
                  </SfButton>
                </div>
              </template>
              <div v-if="isForgottenPassword && resetSent" >
                <SfButton
                  data-cy="login-btn_submit"
                  type="submit"
                  class="sf-button--full-width sf-button--se sf-button--outline form__button reset-sent-button"
                  disabled
                >
                  Reset your password
                </SfButton>
              </div>
              <div v-else>
                <SfButton
                  data-cy="login-btn_submit"
                  type="submit"
                  class="sf-button--full-width form__button bg-secondary-yellow bg-secondary-button"
                  :disabled="loading"
                >
                  <SfLoader :class="{ loader: loading }" :loading="loading">
                    <div>
                      {{
                        isForgottenPassword
                          ? $t('Reset your password')
                          : $t('log in into your account')
                      }}
                    </div>
                  </SfLoader>
                </SfButton>
                <SfButton
                  data-cy="login-btn_submit"
                  class="sf-button--full-width sf-button--se sf-button--outline form__button mt-4"
                  @click="
                    isForgottenPassword
                      ? displayChoosedTrue(() => (isLogin = true))
                      : displayChoosedTrue(() => (isCreateAccount = true))
                  "
                >
                  <div>
                    {{
                      isForgottenPassword
                        ? $t('Log in into your account')
                        : $t('create new account')
                    }}
                  </div>
                </SfButton>
              </div>
            </form>
          </ValidationObserver>
        </div>

        <div class="bottom" v-show="!isForgottenPassword && !otpverify">
          <p class="bottom-enjoy">Enjoy these perks with your free account!</p>
          <div class="block lg:flex justify-around">
            <div class="flex additional-account">
              <SfIcon
                icon="clock"
                size="sm"
                viewBox="0 0 12 12"
                :coverage="1"
              />
              <p>Faster checkout</p>
            </div>
            <div class="flex additional-account">
              <SfIcon
                icon="heart"
                size="sm"
                viewBox="0 0 12 12"
                :coverage="1"
              />
              <p>Manage your favorites</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="form">
        <div v-if="welcomeCopia && user">
          <p class="sign-title">
            Welcome to Copia!
          </p>
          <p class="reset-pass-text mt-3">
            {{
              $t(
                'Your Copia account has been successfully created.'
              )
            }}
          </p>
          <SfButton
            data-cy="login-btn_submit"
            class="sf-button--full-width form__button bg-secondary-yellow bg-secondary-button"
            @click="displayChoosedTrue(() => {(isLogin = true); (welcomeCopia= false)})"
          >
            {{
            $t('log in into your account')
            }}
          </SfButton>
        </div>
        <div v-else>
          <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
            <form
              class="form"
              @submit.prevent="handleSubmit(handleRegister)"
              autocomplete="off"
            >
              <div>
                <p class="sign-title">Create your new Copia account!</p>
                <p class="reset-pass-text">
                  {{
                    $t(
                      'Find your favorite products and brands. Add favorites and make your checkout fast and easy!'
                    )
                  }}
                </p>
              </div>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_name"
                  v-model="form.firstName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="first name"
                  label="Your first name"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_name"
                  v-model="form.lastName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="last name"
                  label="Your last name"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_email"
                  v-model="form.email"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="Your mobile number or email address"
                  label="Your mobile number or email address"
                  class="form__element"
                />
              </ValidationProvider>

              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_password"
                  v-model="form.password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  label="Password"
                  :icon="{ icon: 'show_password' }"
                  @click:icon="
                    {
                      showPassword = !showPassword;
                    }
                  "
                  :type="showPassword ? 'text' : 'password'"
                  class="form__element"
                >
                  <template #icon>
                    <img
                      v-if="showPassword"
                      :src="'./icons/show-password.svg'"
                      class="absolute top-3 right-0 cursor-pointer"
                      @click="
                        {
                          showPassword = false;
                        }
                      "
                    />
                    <img
                      v-else
                      :src="'./icons/hidden-password.svg'"
                      class="absolute top-3 right-0 cursor-pointer"
                      @click="
                        {
                          showPassword = true;
                        }
                      "
                    /> </template
                ></SfInput>
              </ValidationProvider>
              <ValidationProvider
                :rules="{ required: { allowFalse: false } }"
                v-slot="{ errors }"
              >
                <div class="term-declare">
                  <SfCheckbox
                    v-model="createAccount"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    name="create-account"
                    class="form__element"
                  />
                  <p>
                    I declare that I have read and agree to the
                    <span>Privacy Policy</span> and
                    <span>Terms of Use.</span>
                  </p>
                </div>
              </ValidationProvider>

              <SfButton
                data-cy="login-btn_submit"
                type="submit"
                class="sf-button--full-width form__button bg-secondary-yellow bg-secondary-button"
                :disabled="loading"
              >
                <SfLoader :class="{ loader: loading }" :loading="loading">
                  <div>{{ $t('Create new account') }}</div>
                </SfLoader>
              </SfButton>
              <SfButton
                data-cy="login-btn_submit"
                class="sf-button--full-width sf-button--outline sf-button--se form__button mt-4"
                @click="displayChoosedTrue(() => (isLogin = true))"
              >
                <div>
                  {{ $t('login into your account') }}
                </div>
              </SfButton>
            </form>
          </ValidationObserver>
          <div class="bottom">
            <p class="bottom-enjoy">Enjoy these perks with your free account!</p>
            <div class="block lg:flex justify-around">
              <div class="flex additional-account">
                <SfIcon
                  icon="clock"
                  size="sm"
                  viewBox="0 0 12 12"
                  :coverage="1"
                />
                <p>Faster checkout</p>
              </div>
              <div class="flex additional-account">
                <SfIcon
                  icon="heart"
                  size="sm"
                  viewBox="0 0 12 12"
                  :coverage="1"
                />
                <p>Manage your favorites</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref, watch } from '@vue/composition-api';
import { useUiNotification } from '~/composables';

import {
  SfModal,
  SfInput,
  SfIcon,
  SfButton,
  SfCheckbox,
  SfLoader,
  SfAlert,
  SfBar,
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, usePassword } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('required', {
  ...required,
  message: 'This field is required',
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfIcon,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar,
  },
  setup() {
    const { isLoginModalOpen, toggleLoginModal, toggleWelcomeToCopia, isWelcomeToCopia } = useUiState();
    const { send } = useUiNotification();
    const form = ref({});

    const showPassword = ref(false);
    const isLogin = ref(true);
    const isForgottenPassword = ref(false);
    const isCreateAccount = ref(true);
    const otp = ref(false);
    const otpverify = ref(false);
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const welcomeCopia = ref(false);
    const resetSent = ref(false);
    const { register, login, loading, error, user } = useUser();
    const {
      sendResetPassword,
      errors: errorPassword,
      resetPasswordErrors,
    } = usePassword();

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetPasswordErrors();
        otp.value = false;
        otpverify.value = false;
      }
    });
    watch(
      () => form.value.email,
      () => {
        if (form.value.email?.length >= 3 && otp.value === false) {
          if (!isNaN(form.value.email)) {
            otp.value = true;
          }
        }
      }
    );

    const handleForm = (fn, params, customQuery) => async () => {
      await fn({ user: params, customQuery: customQuery });
      if (error.value.login) {
        send({ message: error?.value?.login?.message, type: 'danger' });
        return;
      }
      if (error.value.register) {
        send({ message: error?.value?.register?.message, type: 'danger' });
        return;
      }
      if (isForgottenPassword.value) {
        // send({
        //   message: `Thanks! If there is an account registered with the ${form.value.email} email, you will find message with a password reset link in your inbox. If the message is not arriving in your inbox, try another email address you might’ve used to register.`,
        //   type: 'info',
        // });
        resetSent.value = true;
        return;

      }

      if (user.value !== undefined && welcomeCopia.value === false) {
        toggleLoginModal();
      }
    };

    const displayChoosedTrue = async (fn) => {
      isLogin.value = false;
      isForgottenPassword.value = false;
      isCreateAccount.value = false;
      fn();
    };

    const showIsForgottenPassword = () => {
      isForgottenPassword.value = true;
      isLogin.value = true;
    };


    const handleRegister = async () => {
      welcomeCopia.value = true;
      handleForm(register, form.value , { signUpUser: 'customSignUpUserMutation' })();
      if(!isWelcomeToCopia.value)
      {
        toggleWelcomeToCopia();
      }
    };

    const handleLogin = async () =>{
      if(isWelcomeToCopia.value)
        {
          toggleWelcomeToCopia();
        }
        handleForm(login, {
          username: form.value.email,
          password: form.value.password,
        })();
    }
    const handlePhoneLogin = async () => {
      console.log('phone verify');
    };
    const handlePasswordRecovery = async () =>{
      await sendResetPassword({email: form.value.email})
      resetSent.value = true;
    }

    return {
      form,
      showPassword,
      loading,
      errorPassword,
      isLogin,
      error,
      otp,
      otpverify,
      handlePasswordRecovery,
      createAccount,
      isForgottenPassword,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handlePhoneLogin,
      handleRegister,
      displayChoosedTrue,
      isCreateAccount,
      showIsForgottenPassword,
      welcomeCopia,
      user,
      resetSent
    };
  },
};
</script>

<style lang="scss" scoped>
.verify-form {
  width: 27px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
}
.chapter-navigation {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 37px;
}
.navigator-title1 {
  cursor: pointer;
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid #1d1f22;
  color: #1d1f22;
  padding: 11px 32px;
}
.navigator-title2 {
  cursor: pointer;
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid #f1f2f3;
  padding: 11px 32px;
  color: #8d8f9a;
}
.term-declare {
  display: flex;
  margin-bottom: 24px;
  p {
    font-weight: 400;
    margin-top: -5px;
    margin-left: 5px;
    span {
      color: #0468db;
      cursor: pointer;
    }
  }
}
.sf-modal__bar {
  font-size: 16px;
  font-weight: 500;
}
.additional-account {
  align-items: center;
  @include for-mobile {
    margin-top: 24px;
  }
  p {
    font-size: 14px;
    font-weight: 700;
    margin-left: 12px;
    margin-top: 3px;
    color: #1d1f22;
    font-family: 'Montserrat';
  }
}
.modal::v-deep .sf-modal {
  &__container {
    @include for-desktop {
      width: 610px !important;
    }
    .sf-modal__content {
      padding: 40px 79px;
      @include for-mobile {
        padding: 40px 16px;
      }
    }
  }
}

.sf-button--outline {
  border: 0;
  background: #f1f2f3;
  color: #1d1f22;
  font-family: 'Lato';
  font-size: 16px;
  font-weight: 700;
  border-radius: 6px;
}
.bg-secondary-button {
  color: #1d1f22;
  font-family: 'Lato';
  font-size: 16px;
  font-weight: 700;
  border-radius: 6px;
  // --button-background: #ffe583;
}

.sign-title {
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  @include for-mobile {
    font-size: 24px;
    text-align: left;
  }
}
.reset-pass-text {
  margin-bottom: var(--spacer-xl);
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-top: 20px;
  @include for-mobile {
    text-align: left;
  }
}
.reset-sent{
  display: flex;
  padding: 16px;
  background: #71B232;
  box-shadow: 4px 4px 20px rgba(29, 31, 34, 0.1);
  border-radius: 5px;
  @include for-desktop{
    padding-right: 0;
  }
  p{
    margin-left: 10px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: white;
    margin-top: 4px;
    @include for-mobile{
      margin-left: 4px;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
.reset-sent-button{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #E0E0E1;
}
.forgot-password {
  color: #0468db;
  background: white;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Montserrat';
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-md) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}

.bottom {
  @include for-desktop {
    text-align: center;
  }
  .bottom-enjoy {
    font-size: 16px;
    font-weight: 400;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 700;
    font-family: 'Montserrat';
    color: #43464e;
  }
}
::v-deep .sf-loader{
  height: 19px;
  .sf-loader__overlay{
    background: #FECB06;
  }}
</style>
<style lang="scss">
.login-modal {
  --c-primary: #d12727;
  --c-primary-variant: #ffe583;
}
</style>
