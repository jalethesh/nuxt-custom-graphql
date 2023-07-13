<template>
<div class="notification" :class="type">
  <SfIcon
    :icon="icon"
    size="lg"
    color="white"
    viewBox="0 0 18 16"
  />
  <p>{{ message }}</p>
</div>  
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { SfIcon } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfIcon
  },
  props: {
    type: {
      type: String,
      default: 'success'
    },
    message: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const icon = ref('');
    if (props.type === 'success') {
      icon.value = "check"
    } else if (props.type === 'error') {
      icon.value = "error"
    }
    return {
      icon
    }
  },
})
</script>


<style lang="scss" scoped>
.notification {
  display: flex;
  padding: 16px;
  &.success {
    background: #71B232;
  }
  &.error {
    background: var(--_c-copia-primary-red);
  }
  box-shadow: 4px 4px 20px rgba(29, 31, 34, 0.1);
  border-radius: 5px;
  @include for-desktop{
    padding-right: 0;
  }
  p{
    margin-left: 10px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-sm);
    color: white;
    margin-top: 4px;
    @include for-mobile{
      margin-left: 4px;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
