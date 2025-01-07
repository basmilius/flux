<template>
    <div
        :class="clsx(
            contentPlacement === 'start' && $style.dividerContentStart,
            contentPlacement === 'center' && $style.dividerContentCenter,
            contentPlacement === 'end' && $style.dividerContentEnd
        )"
        role="separator"
        aria-orientation="horizontal">
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
    import { clsx } from 'clsx';
    import $style from '@/css/component/Divider.module.scss';

    const {
        contentPlacement = 'center'
    } = defineProps<{
        readonly contentPlacement?: 'start' | 'center' | 'end';
    }>();

    const slots = defineSlots<{
        default?(): any;
    }>();
</script>
