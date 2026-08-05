<template>
    <div :style="{flex: `0 0 ${SPACINGS[size]}px`}"/>
</template>

<script
    lang="ts"
    setup>
    defineProps<{
        readonly size: Enumerate<typeof SPACINGS['length']>;
    }>();

    const SPACINGS = [
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

    type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
        ? Acc[number]
        : Enumerate<N, [...Acc, Acc['length']]>;
</script>
