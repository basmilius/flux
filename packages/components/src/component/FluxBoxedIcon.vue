<template>
    <div
        :class="clsx(
            !color && $style.iconBoxedDefault,
            color === 'gray' && $style.iconBoxedGray,
            color === 'primary' && $style.iconBoxedPrimary,
            color === 'danger' && $style.iconBoxedDanger,
            color === 'info' && $style.iconBoxedInfo,
            color === 'success' && $style.iconBoxedSuccess,
            color === 'warning' && $style.iconBoxedWarning,
        )"
        :style="{
            fontSize: size && `${size}px`
        }">
        <FluxIcon :name="name"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Icon.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly color?: FluxColor;
        readonly name: FluxIconName;
        readonly size?: number;
    }>();
</script>
