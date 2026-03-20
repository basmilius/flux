<template>
    <div
        :class="clsx(
            contentPlacement === 'start' && $style.dividerContentStart,
            contentPlacement === 'center' && $style.dividerContentCenter,
            contentPlacement === 'end' && $style.dividerContentEnd
        )"
        role="separator"
        :aria-orientation="direction">
        <div
            v-if="slots.default"
            :class="$style.dividerContent">
            <slot/>
        </div>

        <hr
            v-else
            :class="$style.dividerLine">
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import $style from '$flux/css/component/Divider.module.scss';

    const {
        contentPlacement = 'center',
        direction = 'horizontal'
    } = defineProps<{
        readonly contentPlacement?: 'start' | 'center' | 'end';
        readonly direction?: FluxDirection;
    }>();

    const slots = defineSlots<{
        default?(): any;
    }>();
</script>
