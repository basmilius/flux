<template>
    <Component
        :is="tag ?? 'div'"
        :class="{
            [styles.stackHorizontal]: axis === 'horizontal',
            [styles.stackVertical]: axis === 'vertical',
            [styles.stackCentered]: isCentered,
            [styles.stackFill]: isFill,
            [styles.stackWrapping]: isWrapping
        }"
        :style="{
            '--gap': `${gap}px`
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
        readonly isCentered?: boolean;
        readonly isFill?: boolean;
        readonly isGrowing?: boolean;
        readonly isWrapping?: boolean;
        readonly tag?: keyof HTMLElementTagNameMap;
    }

    withDefaults(defineProps<Props>(), {
        axis: 'vertical',
        gap: 30
    });
</script>
