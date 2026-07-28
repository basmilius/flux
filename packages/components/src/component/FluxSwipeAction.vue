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
    import { warn } from '@flux-ui/internals';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { useAttrs } from 'vue';
    import { useDisabledInjection } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/SwipeActions.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        color = 'gray',
        label
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

    const attrs = useAttrs();
    const disabled = useDisabledInjection();

    // The icon is aria-hidden, so an action without a label has no accessible name of its
    // own and a screen reader announces nothing but "button".
    if (import.meta.env.DEV && !label && !attrs['aria-label'] && !attrs['aria-labelledby']) {
        warn('FluxSwipeAction', 'an icon-only action needs an aria-label or aria-labelledby, otherwise it has no accessible name.');
    }
</script>
