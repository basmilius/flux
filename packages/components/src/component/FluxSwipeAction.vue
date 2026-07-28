<template>
    <button
        :class="COLOR_CLASS[color]"
        data-flux-swipe-action
        type="button"
        :disabled="disabled"
        @click="$emit('click', $event)">
        <FluxIcon
            :name="icon"
            :size="18"/>

        <span :class="$style.swipeActionLabel">
            {{ label }}
        </span>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
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
        readonly label: string;
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
