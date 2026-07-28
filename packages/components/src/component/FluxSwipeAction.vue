<template>
    <button
        :class="clsx(COLOR_CLASS[color], !label && $style.isIconOnly, isPrimary && $style.isPrimary)"
        data-flux-swipe-action
        :data-flux-swipe-primary="isPrimary ? '' : undefined"
        type="button"
        :disabled="disabled"
        @click="$emit('click', $event)">
        <FluxIcon
            :name="icon"
            :size="18"/>

        <span
            v-if="label"
            :class="$style.swipeActionLabel">
            {{ label }}
        </span>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { useDisabledInjection } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/SwipeActions.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly icon: FluxIconName;
        readonly isPrimary?: boolean;
        readonly label?: string;
    }>();

    const COLOR_CLASS: Readonly<Record<FluxColor, string>> = Object.freeze({
        gray: $style.swipeActionGray,
        primary: $style.swipeActionPrimary,
        danger: $style.swipeActionDanger,
        info: $style.swipeActionInfo,
        success: $style.swipeActionSuccess,
        warning: $style.swipeActionWarning
    });

    const disabled = useDisabledInjection();
</script>
