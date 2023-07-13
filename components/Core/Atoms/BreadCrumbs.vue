<template>
    <nav id="breadcrumbs" aria-label="breadcrumb">
        <ol class="breadcrumbs__list">
            <li
                class="breadcrumbs__list-item"
                v-for="(bread, i) in crumbs"
                :key="i"
                :aria-current="false"
            >
                <router-link :to="bread.link">
                    <span>{{ bread.text }}</span>
                </router-link>
            </li>

            <li class="breadcrumbs__list-item breadcrumbs__list-item--last">
                <span>{{ currentPage.text }}</span>
            </li>
        </ol>
    </nav>
</template>

<script>
import { computed } from "@nuxtjs/composition-api"
export default {
    props: {
        breadCrumbs: {
            type: Array,
            default: ()=>([])
        }
    },
    setup(props) {
        const crumbs = computed(() => props.breadCrumbs.slice(0, props.breadCrumbs.length - 1));

        const currentPage = computed(() => props.breadCrumbs?.[props.breadCrumbs?.length -1]);

        return {
            currentPage,
            crumbs
        }
    }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
  text-transform: capitalize;
}


.breadcrumbs__list {
  display: flex;
  font-family: var(--font-family--primary);
  font-size: 14px;
  color: #72757e;
  margin: 40px 0 24px;
  font-weight: 600;
}

.breadcrumbs__list .breadcrumbs__list-item:not(:last-child)::after {
  content: url("/icons/breadcrumb-arrow-right.svg");
  margin-left: 20px;
  margin-right: 20px;
}

.breadcrumbs__list-item--last {
  color: #e81e2b;
}
</style>