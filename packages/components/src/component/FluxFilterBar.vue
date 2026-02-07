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
                        <FluxSecondaryButton
                            v-if="modelValue[button.name]"
                            :icon-leading="button.icon"
                            :label="button.label"/>
                    </template>

                    <template #overflow>
                        <FluxSpacing
                            v-if="buttons"
                            :size="2"/>

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
    import FluxFilterBase from './FluxFilterBase.vue';
    import FluxFilterWindow from './FluxFilterWindow.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxOverflowBar from './FluxOverflowBar.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '$flux/css/component/Filter.module.scss';
    import FluxSpacing from '$flux/component/FluxSpacing.vue';

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

    function reset(name: string): void {
        emit('reset', name);
    }
</script>
