<template>
    <div
        :class="$style.statisticsGrid"
        :style="{
            '--gap': gap && `${gap}px`,
            '--xs': xs ?? 1,
            '--sm': sm ?? xs ?? 1,
            '--md': md ?? sm ?? xs ?? 2,
            '--lg': lg ?? md ?? sm ?? xs ?? 3,
            '--xl': xl ?? lg ?? md ?? sm ?? xs ?? 4
        }">
        <div :class="$style.statisticsGridContent">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxStatistics/css/Grid.module.scss';

    defineProps<{
        readonly gap?: number;
        readonly xs?: number;
        readonly sm?: number;
        readonly md?: number;
        readonly lg?: number;
        readonly xl?: number;
    }>();
</script>
