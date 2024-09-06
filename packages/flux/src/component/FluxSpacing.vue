<template>
    <div :style="{flex: `0 0 ${spacings[size]}px`}"/>
</template>

<script
    lang="ts"
    setup>
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

    defineProps<{
        readonly size: keyof typeof spacings;
    }>();
</script>
