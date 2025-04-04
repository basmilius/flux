<template>
    <FluxPressable
        :component-type="type"
        :class="CLASS_MAP[variant]"
        type="button"
        :tabindex="tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to">
        <slot/>

        <slot
            v-if="isLoading"
            name="loader">
            <div :class="$style.paneLoader">
                <FluxSpinner/>
            </div>
        </slot>

        <div
            v-if="tag"
            :class="$style.paneTag">
            {{ tag }}
        </div>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { FluxPressableType, FluxTo } from '$flux/types';
    import FluxPressable from './FluxPressable.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Pane.module.scss';

    const CLASS_MAP = {
        default: $style.paneDefault,
        flat: $style.paneFlat,
        well: $style.paneWell
    } as const;

    const {
        variant = 'default'
    } = defineProps<{
        readonly isLoading?: boolean;
        readonly tag?: string;
        readonly variant?: 'default' | 'flat' | 'well';
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): any;
        loader(): any;
    }>();
</script>
