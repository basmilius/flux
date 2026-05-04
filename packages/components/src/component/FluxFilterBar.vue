<template>
    <FluxFilterBase
        v-model="modelValue"
        :resettable="resettable"
        @reset="reset">
        <template #filters>
            <slot/>
        </template>

        <template #default="{ buttons, filters, menuItems }">
            <div :class="$style.filterBar">
                <FluxFormInput
                    v-if="isSearchable"
                    v-model="modelSearch"
                    :class="$style.filterBarSearch"
                    icon-leading="magnifying-glass"
                    :placeholder="searchPlaceholder"
                    type="search"/>

                <FluxOverflowBar alignment="end">
                    <template
                        v-for="button of buttons"
                        :key="button.name">
                        <FluxFlyout>
                            <template #opener="{open}">
                                <FluxSecondaryButton
                                    v-if="modelValue[button.name]"
                                    :class="$style.filterButton"
                                    :disabled="button.disabled"
                                    :icon-leading="button.icon"
                                    :label="button.label"
                                    @click="open()">
                                    <template #after>
                                        <FilterBadge
                                            :item="button"
                                            :value="modelValue[button.name]"/>
                                    </template>
                                </FluxSecondaryButton>
                            </template>

                            <div :class="$style.filter">
                                <FluxMenu>
                                    <VNodeRenderer :vnode="filters[button.name]"/>
                                </FluxMenu>
                            </div>
                        </FluxFlyout>
                    </template>

                    <template #overflow>
                        <FluxSeparator
                            v-if="isFiltered"
                            direction="vertical"
                            style="margin-top: 9px; margin-bottom: 9px"/>

                        <FluxFlyout>
                            <template #opener="{open}">
                                <FluxSecondaryButton
                                    icon-leading="sliders-simple"
                                    label="Filter"
                                    @click="open()">
                                    <template
                                        v-if="filterCount > 0"
                                        #after>
                                        <FluxBadge :label="String(filterCount)"/>
                                    </template>
                                </FluxSecondaryButton>
                            </template>

                            <FluxFilterWindow
                                :filters="filters"
                                :menu-items="menuItems"
                                :resettable="resettable"
                                @reset="reset"/>
                        </FluxFlyout>
                    </template>
                </FluxOverflowBar>
            </div>
        </template>
    </FluxFilterBase>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterState } from '@flux-ui/types';
    import { computed, unref, type VNode } from 'vue';
    import { FilterBadge, VNodeRenderer } from '~flux/components/component/primitive';
    import FluxBadge from './FluxBadge.vue';
    import FluxFilterBase from './FluxFilterBase.vue';
    import FluxFilterWindow from './FluxFilterWindow.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxOverflowBar from './FluxOverflowBar.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSeparator from './FluxSeparator.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

    const emit = defineEmits<{
        reset: [string];
    }>();

    const modelSearch = defineModel<string>('search', {
        default: ''
    });

    const modelValue = defineModel<FluxFilterState>({
        required: true
    });

    defineProps<{
        readonly isSearchable?: boolean;
        readonly resettable?: string[];
        readonly searchPlaceholder?: string;
    }>();

    defineSlots<{
        default?(): VNode[];
    }>();

    const filterCount = computed(() => Object.entries(unref(modelValue))
        .filter(([, val]) => {
            if (val === null || val === undefined) {
                return false;
            }

            if (Array.isArray(val)) {
                return val.length > 0;
            }

            return true;
        }).length);

    const isFiltered = computed(() => unref(filterCount) > 0);

    function reset(name: string): void {
        emit('reset', name);
    }
</script>
