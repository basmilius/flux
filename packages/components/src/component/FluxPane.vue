<template>
    <div :class="CLASS_MAP[variant]">
        <slot/>

        <FluxFadeTransition>
            <slot
                v-if="isLoading"
                name="loader">
                <div :class="$style.paneLoader">
                    <FluxSpinner/>
                </div>
            </slot>
        </FluxFadeTransition>

        <div
            v-if="tag"
            :class="$style.paneTag">
            {{ tag }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Pane.module.scss';

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
    }>();

    defineSlots<{
        default(): VNode[];
        loader(): VNode[];
    }>();
</script>
