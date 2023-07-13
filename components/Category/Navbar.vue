<template>
    <div class="navbar section mt-10">
        <div class="navbar__aside desktop-only">
            <LazyHydrate never>
                <SfHeading :level="3" :title="$t('Categories')" class="navbar__title" />
            </LazyHydrate>
        </div>

        <div class="navbar__main">
            <LazyHydrate on-interaction>
                <SfButton
                    v-if="hasAttributes"
                    class="sf-button--text navbar__filters-button"
                    data-cy="category-btn_filters"
                    aria-label="Filters"
                    @click="toggleFilterSidebar"
                >
                    <SfIcon
                        size="24px"
                        color="dark-secondary"
                        icon="filter2"
                        class="navbar__filters-icon"
                        data-cy="category-icon_"
                    />
                    {{ $t("Filters") }}
                </SfButton>
            </LazyHydrate>

            <div class="navbar__sort desktop-only">
                <span class="navbar__label">{{ $t("Sort by") }}:</span>
                <LazyHydrate on-interaction>
                    <SfSelect
                        :value="sortBy.selected"
                        placeholder="Select sorting"
                        data-cy="category-select_sortBy"
                        class="navbar__select"
                        @input="changeSorting"
                    >
                        <SfSelectOption
                            v-for="(option, index) in sortBy.options"
                            :key="index"
                            :value="option.value"
                            class="sort-by__option"
                        >{{ option.attrName }}</SfSelectOption>
                    </SfSelect>
                </LazyHydrate>
            </div>

            <div class="navbar__counter">
                <span class="navbar__label desktop-only">{{ $t("Products found") }}:</span>
                <span class="desktop-only navbar__label">{{ pagination.totalItems }}</span>
                <span
                    class="navbar__label smartphone-only"
                >{{ pagination.totalItems }} {{ $t("Items") }}</span>
            </div>

            <div class="navbar__view">
                <span class="navbar__label desktop-only mr-4">{{ $t("View:") }}</span>
                <SfIcon
                    data-cy="category-icon_grid-view"
                    class="navbar__view-icon"
                    :color="isCategoryGridView ? 'green' : 'dark-secondary'"
                    icon="tiles"
                    size="14px"
                    role="button"
                    aria-label="Change to grid view"
                    :aria-pressed="isCategoryGridView"
                    @click="changeToCategoryGridView"
                />
                <SfIcon
                    data-cy="category-icon_list-view"
                    class="navbar__view-icon"
                    :color="!isCategoryGridView ? 'green' : 'dark-secondary'"
                    icon="list"
                    size="14px"
                    role="button"
                    aria-label="Change to list view"
                    :aria-pressed="!isCategoryGridView"
                    @click="changeToCategoryListView"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {
    SfButton,
    SfIcon,
    SfHeading,
    SfSelect
} from "@storefront-ui/vue";
import { computed } from '@nuxtjs/composition-api';
import { useUiHelpers, useUiState } from "~/composables";
import LazyHydrate from "vue-lazy-hydration";
import {
    facetGetters
} from "@vue-storefront/odoo";
export default {
    components: {
        SfIcon,
        SfSelect,
        SfButton,
        SfHeading,
        LazyHydrate
    },
    props: {
        pagination: {
            type: Object,
            required: true
        },
        hasAttributes: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { root }) {

        const { query } = root.$router.history.current;

        const { changeSorting } = useUiHelpers();
        const { toggleFilterSidebar, isCategoryGridView, changeToCategoryGridView, changeToCategoryListView } = useUiState();

        const sortBy = computed(() => facetGetters.getSortOptions({ input: { sort: query?.sort } }) || "");

        return {
            sortBy,
            changeSorting,
            toggleFilterSidebar,
            isCategoryGridView,
            changeToCategoryGridView,
            changeToCategoryListView
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    position: relative;
    display: flex;
    border: 1px solid var(--c-light);
    border-width: 0 0 1px 0;
    @include for-desktop {
        border-width: 1px 0 1px 0;
    }
    &.section {
        padding: var(--spacer-sm);
        @include for-desktop {
            padding: 0;
        }
    }
    &__aside,
    &__main {
        display: flex;
        align-items: center;
        padding: var(--spacer-sm) 0;
    }
    &__aside {
        flex: 0 0 15%;
        padding: var(--spacer-sm) var(--spacer-sm);
        border: 1px solid var(--c-light);
        border-width: 0 1px 0 0;
    }
    &__main {
        flex: 1;
        padding: 0;
        justify-content: space-between;
        @include for-desktop {
            padding: var(--spacer-xs) var(--spacer-xl);
        }
    }
    &__title {
        --heading-title-font-weight: 800;
        --heading-title-font-size: 24px;
        --heading-title-line-height: 32px;
        --font-family: var(--font-family--primary);
    }
    &__filters-icon {
        margin: 0 0 0 var(--spacer-xs);
        order: 1;
        @include for-desktop {
            margin: 0 var(--spacer-xs) 0 0;
            order: 0;
        }
    }
    &__filters-button {
        display: flex;
        align-items: center;
        --button-font-size: 16px;
        --button-text-decoration: none;
        --button-color: var(--_c-copia-secondary-black);
        --button-font-weight: bold;
        @include for-mobile {
            --button-font-weight: var(--font-weight--medium);
            order: 2;
        }
        svg {
            fill: var(--c-text-muted);
            transition: fill 150ms ease;
        }
        &:hover {
            svg {
                fill: var(--c-primary);
            }
        }
    }
    &__label {
        font-family: var(--font-family--primary);
        font-weight: 700;
        color: var(--_c-copia-secondary-black);
        font-size: 16px;
        line-height: 24px;
        @include for-desktop {
            color: var(--c-link);
            margin: 0 var(--spacer-2xs) 0 0;
        }
    }
    &__select {
        --select-width: 180px;
        --select-padding: 0;
        --select-height: auto;
        --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
        --select-margin: 0;
        --select-option-font-size: var(--font-size-sm);
        --select-error-message-height: 0;
        ::v-deep .sf-select__dropdown {
            font-size: 16px;
            font-family: var(--font-family--primary);
            font-weight: 700;
            color: var(--_c-copia-secondary-black);
            margin: 0;
        }
        ::v-deep .sf-select__placeholder {
            --select-option-font-size: var(--font-size-sm);
        }
    }
    &__sort {
        display: flex;
        align-items: center;
        margin: 0 auto 0 var(--spacer-2xl);
    }
    &__counter {
        font-family: var(--font-family--secondary);
        order: 1;
        @include for-desktop {
            margin: auto 0 auto auto;
            order: 0;
        }
    }
    &__view {
        display: flex;
        align-items: center;
        order: 0;
        @include for-desktop {
            margin: 0 0 0 var(--spacer-2xl);
            order: 0;
        }
        &-icon {
            cursor: pointer;
            margin: 0 var(--spacer-base) 0 0;
            &:last-child {
                margin: 0;
            }
        }
        &-label {
            margin: 0 var(--spacer-sm) 0 0;
            font: var(--font-weight--normal) var(--font-size--base) / 1.6
                var(--font-family--secondary);
            text-decoration: none;
            color: var(--c-link);
        }
    }
}

::v-deep .sf-heading__title {
    color: var(--_c-copia-secondary-black);
}
</style>