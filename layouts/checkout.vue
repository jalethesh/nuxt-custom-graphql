<template>
    <div>
        <AppHeaderCheckout />
        <div id="layout" class="lg:py-36 py-0 pt-14">
            <nuxt :key="$route.fullPath" />
        </div>
    </div>
</template>

<script>
import AppHeaderCheckout from "~/components/Checkout/AppHeaderCheckout.vue";
export default {
    components: { AppHeaderCheckout }
}
</script>

<style lang="scss" scoped>
</style>