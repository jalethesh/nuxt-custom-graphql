<template>
  <div id="reset-password" class="max-w-md mx-auto">
    <h2 class="text-left lg:text-center mt-20">Your new password</h2>
    <p class="text-left lg:text-center my-5"> Almost done! Just enter your new password below. </p>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="mt-10" @submit.prevent="handleSubmit(handleResetPassword)">
        <ValidationProvider rules="required" vid="password" v-slot="{ errors }">
          <SfInput
            v-model="form.newPassword"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            name="newPassword"
            label="Your password"
            :icon="{ icon: 'show_password', size: '18px' }"
            :type="showNewPassword ? 'text' : 'password'"
            class="my-3"
            hasShowPassword
          >
            <template #icon>
              <img
                v-if="showNewPassword"
                :src="'/icons/show-password.svg'"
                class="absolute top-3 right-0 cursor-pointer"
                @click="
                  {
                    showNewPassword = false;
                  }
                "
              />
              <img
                v-else
                :src="'/icons/hidden-password.svg'"
                class="absolute top-3 right-0 cursor-pointer"
                @click="
                  {
                    showNewPassword = true;
                  }
                "
              />
            </template>
          </SfInput>
        </ValidationProvider>
        <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }">
          <SfInput
            v-model="form.confirmPassword"
            name="confirmPassword"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            label="Repeat your password"
            :icon="{ icon: 'show_password', size: '18px' }"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="my-3"
          >
            <template #icon>
              <img
                v-if="showConfirmPassword"
                :src="'/icons/show-password.svg'"
                class="absolute top-3 right-0 cursor-pointer"
                @click="
                  {
                    showConfirmPassword = false;
                  }
                "
              />
              <img
                v-else
                :src="'/icons/hidden-password.svg'"
                class="absolute top-3 right-0 cursor-pointer"
                @click="
                  {
                    showConfirmPassword = true;
                  }
                "
              />
            </template>
          </SfInput>
        </ValidationProvider>
        <div class="reset-error" v-if="!!errorMsg">
          <SfIcon
            icon="error"
            size="lg"
            color="white"
            viewBox="0 0 18 16"
            />
          <p > {{ errorMsg }} </p>  
        </div>        
        <CopiaButton
          class="sf-button--full-width mt-10"
          type="submit"
        >
          {{ $t('Reset your password') }}
        </CopiaButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { ref, reactive } from '@vue/composition-api';
import {
  SfInput,
  SfIcon
} from "@storefront-ui/vue";
import { required, confirmed } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';
import { usePassword } from '@vue-storefront/odoo';

extend('required', {
  ...required,
  message: 'This field is required.',
});

extend('confirmed', {
  ...confirmed,
  message: 'Password mismatches.',
});

export default defineComponent({
  components: {
    ValidationObserver,
    ValidationProvider,
    SfInput,
    SfIcon,
    CopiaButton
  },
  setup(props, { root }) {
    const errorMsg = ref('');
    const {
      resetPassword,
    } = usePassword();
    const form = reactive({
      newPassword: '',
      confirmPassword: ''
    });
    const showNewPassword = ref(false);
    const showConfirmPassword = ref(false);

    const handleResetPassword = () => {
      const token = root.$route.query['token'];

      resetPassword({ password: form.newPassword, token })
        .then((response) => {
          console.log('response:', response);
          if (!response.message) 
            root.$router.push('/');
          else {
            errorMsg.value = response.graphQLErrors[0].message;
          }
        })
    }

    return {
      form,
      errorMsg,
      showNewPassword,
      showConfirmPassword,
      handleResetPassword
    }
  },
})
</script>
<style lang="scss" scoped>
.reset-error{
  display: flex;
  padding: 16px;
  background: var(--_c-copia-primary-red);
  box-shadow: 4px 4px 20px rgba(29, 31, 34, 0.1);
  border-radius: 5px;
  p{
    margin-left: 10px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: white;
    @include for-mobile{
      margin-left: 4px;
      font-weight: 700;
      font-size: 16px;
    }
  }
}

::v-deep {
  .sf-input {
    & input{
      padding-bottom: 0;
      outline: none !important;
      &:focus ~ * {
        --input-label-color: var(--_c-copia-primary-black);
        --icon-color: var(--_c-copia-primary-black);
      }
      &:-webkit-autofill ~ * {
        --input-label-color: var(--_c-copia-primary-black);
      }
    }
    &__label {
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--semibold);
      &::after {
        color: var(--_c-copia-secondary-red);
      }
    }
  }
}
</style>
