<template>
    <div class="flux-spacing"/>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue-demi';

    const spacings = [
        0,
        3,
        6,
        9,
        12,
        15,
        18,
        24,
        30,
        36,
        42,
        48,
        54,
        60,
        72,
        84,
        90,
        120
    ] as const;

    export interface Props {
        readonly size: keyof typeof spacings;
    }

    const props = defineProps<Props>();

    const size = computed(() => spacings[props.size]);
</script>

<style lang="scss">
    .flux-spacing {
        flex: 0 0 calc(v-bind(size) * 1px);
    }
</style>
