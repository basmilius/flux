<template>
    <div
        :class="clsx(
            $style.statisticsChange,
            color === 'gray' && $style.isGray,
            color === 'primary' && $style.isPrimary,
            color === 'danger' && $style.isDanger,
            color === 'info' && $style.isInfo,
            color === 'success' && $style.isSuccess,
            color === 'warning' && $style.isWarning
        )"
        role="presentation">
        <FluxIcon
            v-if="icon"
            :class="$style.statisticsChangeIcon"
            :name="icon"/>

        <span :class="$style.statisticsChangeValue">
            {{ value }}
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import $style from '$fluxStatistics/css/Change.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly value: string | number;
    }>();
</script>
