<template>
    <Component
        :is="tag ?? 'div'"
        :class="$style.gridColumn"
        :style="{
            '--xs': xs ?? 12,
            '--sm': sm ?? xs ?? 12,
            '--md': md ?? sm ?? xs ?? 12,
            '--lg': lg ?? md ?? sm ?? xs ?? 12,
            '--xl': xl ?? lg ?? md ?? sm ?? xs ?? 12
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Grid.module.scss';

    defineProps<{
        readonly xs?: number;
        readonly sm?: number;
        readonly md?: number;
        readonly lg?: number;
        readonly xl?: number;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
