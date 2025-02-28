<template>
    <div
        :class="$style.gridColumn"
        :style="{
            '--xs': xs ?? 12,
            '--sm': sm ?? xs ?? 12,
            '--md': md ?? sm ?? xs ?? 12,
            '--lg': lg ?? md ?? sm ?? xs ?? 12,
            '--xl': xl ?? lg ?? md ?? sm ?? xs ?? 12
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Grid.module.scss';

    defineProps<{
        readonly xs?: number;
        readonly sm?: number;
        readonly md?: number;
        readonly lg?: number;
        readonly xl?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
