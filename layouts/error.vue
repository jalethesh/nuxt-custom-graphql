<template>
  <div id="error">
    <SfImage class="image" src="/error/error.svg" alt="leaves" />
    <h1 class="text-sf-c-primary font-black font-montserrat text-center">
      {{ error.statusCode === 404 ? 'Page not found' : 'An error occured' }}
    </h1>
    <p class="text-sf-c-gray text-sm font-montserrat text-center">
      {{ error.statusCode === 404
          ? 'We are sorry that we can’t find the page, please go back or try again'
          : 'Please go back or try again'
      }}
    </p>
    <div class="actions">
      <SfButton link="/" class="sf-button--full-width actions__button">
        Return home
      </SfButton>
      <SfButton class="sf-button--full-width actions__button block md:hidden" @click="$router.go(-1)">
        Back
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfButton, SfImage, SfHeading } from "@storefront-ui/vue";

export default {
  name: "ErrorLayout",

  props: ["error"],

  components: { SfButton, SfImage, SfHeading },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

#error {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 var(--spacer-sm);

  @include for-desktop {
    max-width: 77.5rem;
  }
}

.image {
  --image-width: 15rem;
  padding: var(--spacer-xl) 0;

  @include for-desktop {
    --image-width: 25.75rem;
  }
}

h1 {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 20px;

  @include for-desktop {
    font-size: 56px;
    line-height: 65px;
    margin-bottom: 20px;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  margin: var(--spacer-xl) 0 0 0;

  &__button {
    --button-width: 100%;
    --button-background: var(--_c-copia-secondary-yellow);
    color: var(--c-black);

    &:first-child:hover {
      color: var(--c-white);
    }

    &:last-child {
      margin: var(--spacer-sm) 0;
      --button-border-color: var(--c-black);
      --button-background: transparent;
      --button-border-width: 2px;
    }
  }

  @include for-desktop {
    margin: var(--spacer-lg) 0 0 0;

    &__button {
      --button-width: 11rem;
    }
  }
}
</style>
