<template>
    <FluxStack
        :axis="axis"
        :gap="gap"
        :is-fill="isFill">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';

    export type Props = {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
        readonly isFill?: boolean;
    };

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal',
        gap: 9
    });
</script>
