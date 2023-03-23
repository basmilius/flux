<template>
    <transition :mode="mode" name="flux-fade">
        <slot/>
    </transition>
</template>

<script lang="ts" setup>
    export interface Props {
        readonly mode: 'out-in' | 'in-out';
    }

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>

<style lang="scss">
    .flux-fade-enter-active,
    .flux-fade-leave-active {
        transition: opacity 150ms var(--swift-out);
    }

    .flux-fade-enter-from,
    .flux-fade-leave-to {
        opacity: 0;
    }
</style>
