<template>
    <div
        :class="clsx(
            $style.info,
            color === 'gray' && $style.infoGray,
            color === 'primary' && $style.infoPrimary,
            color === 'danger' && $style.infoDanger,
            color === 'info' && $style.infoInfo,
            color === 'success' && $style.infoSuccess,
            color === 'warning' && $style.infoWarning
        )">
        <FluxIcon
            v-if="icon"
            :class="$style.infoIcon"
            :name="icon"/>

        <div :class="$style.infoBody">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Info.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
