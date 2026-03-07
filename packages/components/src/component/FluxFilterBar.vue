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
                                    @click="open()"/>
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
    import { computed, unref } from "vue";
    import { FilterBadge, VNodeRenderer } from '$flux/component/primitive';
    import FluxFilterBase from './FluxFilterBase.vue';
    import FluxFilterWindow from './FluxFilterWindow.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxMenu from '$flux/component/FluxMenu.vue';
    import FluxOverflowBar from './FluxOverflowBar.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSeparator from '$flux/component/FluxSeparator.vue';
    import $style from '$flux/css/component/Filter.module.scss';

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
        default?(): any;
    }>();

    const isFiltered = computed(() => Object.entries(unref(modelValue)).filter(([, val]) => Boolean(val)).length > 0);

    function reset(name: string): void {
        emit('reset', name);
    }
</script>
