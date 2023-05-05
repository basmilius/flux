<template>
    <flux-stack
        :axis="axis"
        :gap="gap"
        :is-fill="isFill">
        <slot/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';

    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
        readonly isFill?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal',
        gap: 9
    });
</script>
