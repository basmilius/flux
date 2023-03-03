<template>
    <flux-stack
        :axis="axis"
        :gap="gap">
        <slot/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '.';

    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
    }

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal',
        gap: 9
    });
</script>
