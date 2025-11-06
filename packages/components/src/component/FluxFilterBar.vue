<template>
    <FluxFilterBase
        v-model="modelValue"
        :resettable="resettable"
        @reset="reset">
        <template #filters>
            <slot/>
        </template>

        <template #default="{ filters, menuItems }">
            <div :class="$style.filterBar">
                <FluxFormInput
                    v-model="modelSearch"
                    :class="$style.filterBarSearch"
                    icon-leading="magnifying-glass"
                    :placeholder="searchPlaceholder"
                    type="search"/>

                <FluxOverflowBar alignment="end">
                    <div/>

                    <template #overflow="{items}">
                        <FluxFlyout>
                            <template #opener="{open}">
                                <FluxSecondaryButton
                                    icon-leading="sliders-simple"
                                    label="Filter"
                                    @click="open()"/>
                            </template>

                            <pre>{{ items }}</pre>

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
