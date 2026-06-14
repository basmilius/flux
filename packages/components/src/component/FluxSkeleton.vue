<template>
    <component
        :is="is"
        :class="clsx(
            $style.skeleton,
            variant === 'circle' && $style.isCircle,
            variant === 'rectangle' && $style.isRectangle,
            variant === 'rounded' && $style.isRounded,
            variant === 'text' && $style.isText
        )"
        :style="style"
        aria-hidden="true"/>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, type CSSProperties } from 'vue';
    import $style from '~flux/components/css/component/Skeleton.module.scss';

    const {
        height,
        is = 'div',
        variant = 'text',
        width
    } = defineProps<{
        readonly height?: string | number;
        readonly is?: string;
        readonly variant?: 'text' | 'circle' | 'rectangle' | 'rounded';
        readonly width?: string | number;
    }>();

    const style = computed<CSSProperties>(() => ({
        height: toSize(height),
        width: toSize(width)
    }));

    function toSize(value: string | number | undefined): string | undefined {
        if (value === undefined) {
            return undefined;
        }

        return typeof value === 'number' ? `${value}px` : value;
    }
</script>
