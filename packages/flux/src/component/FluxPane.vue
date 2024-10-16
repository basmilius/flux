<template>
    <div :class="CLASS_MAP[variant]">
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
    </div>
</template>

<script
    lang="ts"
    setup>
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '@/css/component/Pane.module.scss';

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
        default(): any;
        loader(): any;
    }>();
</script>
