<template>
    <FluxFilterBase
        v-model="modelValue"
        @clear="onClear"
        @reset="onReset">
        <template #filters>
            <slot/>
        </template>

        <template #default="{ buttons, filters, menuItems, clear, reset }">
            <div :class="$style.filterBar">
                <slot name="start"/>

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
                                    v-if="isFilterActive(modelValue[button.name])"
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

                            <template #default="{close}">
                                <div :class="$style.filter">
                                    <FluxMenu is-persistent>
                                        <VNodeRenderer :vnode="filters[button.name]"/>

                                        <FluxSeparator/>

                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                v-if="isResettable(button, modelValue[button.name])"
                                                :class="$style.filterAction"
                                                icon-leading="rotate-left"
                                                :label="translate('flux.filterReset')"
                                                @click="onResetClick(close, reset, button.name)"/>

                                            <FluxMenuItem
                                                icon-leading="trash"
                                                is-destructive
                                                :label="translate('flux.filterRemove')"
                                                @click="onClearClick(close, clear, button.name)"/>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </div>
                            </template>
                        </FluxFlyout>
                    </template>

                    <template #overflow>
                        <FluxSeparator
                            v-if="countActiveFilters(buttons) > 0"
                            direction="vertical"
                            style="margin-top: 9px; margin-bottom: 9px"/>

                        <FluxFlyout>
                            <template #opener="{open}">
                                <FluxSecondaryButton
                                    icon-leading="sliders-simple"
                                    :label="translate('flux.filter')"
                                    @click="open()">
                                    <template
                                        v-if="countActiveFilters(buttons) > 0"
                                        #after>
                                        <FluxBadge :label="String(countActiveFilters(buttons))"/>
                                    </template>
                                </FluxSecondaryButton>
                            </template>

                            <FluxFilterWindow
                                :filters="filters"
                                :menu-items="menuItems"/>
                        </FluxFlyout>
                    </template>
                </FluxOverflowBar>

                <slot name="end"/>
            </div>
        </template>
    </FluxFilterBase>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterDefinition, FluxFilterState, FluxFilterValue } from '@flux-ui/types';
    import { unref, type VNode } from 'vue';
    import { FilterBadge, VNodeRenderer } from '~flux/components/component/primitive';
    import { useTranslate } from '~flux/components/composable/private';
    import { isResettable } from '~flux/components/util';
    import FluxBadge from './FluxBadge.vue';
    import FluxFilterBase from './FluxFilterBase.vue';
    import FluxFilterWindow from './FluxFilterWindow.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxOverflowBar from './FluxOverflowBar.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSeparator from './FluxSeparator.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

    const emit = defineEmits<{
        clear: [string];
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
        readonly searchPlaceholder?: string;
    }>();

    defineSlots<{
        default?(): VNode[];
        start?(): VNode[];
        end?(): VNode[];
    }>();

    const translate = useTranslate();

    function isFilterActive(value: FluxFilterValue | null | undefined): boolean {
        if (value === null || value === undefined) {
            return false;
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        return true;
    }

    function countActiveFilters(buttons: Record<string, FluxFilterDefinition>): number {
        const state = unref(modelValue);

        return Object.keys(buttons).filter(name => isFilterActive(state[name])).length;
    }

    function onClear(name: string): void {
        emit('clear', name);
    }

    function onReset(name: string): void {
        emit('reset', name);
    }

    function onClearClick(close: () => void, clear: (name: string) => void, name: string): void {
        close();
        clear(name);
    }

    function onResetClick(close: () => void, reset: (name: string) => void, name: string): void {
        close();
        reset(name);
    }
</script>
