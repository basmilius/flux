<template>
    <div
        :class="direction === 'horizontal' ? $style.separatorHorizontal : $style.separatorVertical"
        role="separator"
        :aria-orientation="direction"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection } from '@flux-ui/types';
    import $style from '$flux/css/component/Divider.module.scss';

    const {
        direction = 'horizontal'
    } = defineProps<{
        readonly direction?: FluxDirection;
    }>();
</script>
