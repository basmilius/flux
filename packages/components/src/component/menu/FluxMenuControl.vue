<template>
    <div
        :class="clsx($style.menuControl, isFill && $style.menuControlFill, isDisabled && $style.menuControlDisabled)"
        data-flux-menu-pane
        role="group"
        :aria-labelledby="hasLabel ? labelId : undefined"
        @keydown="onMenuPaneKeydown">
        <FluxIcon
            v-if="iconLeading"
            :class="$style.menuControlIcon"
            :name="iconLeading"/>

        <span
            v-if="hasLabel"
            :id="labelId"
            :class="$style.menuControlLabel">
            <slot name="label">{{ label }}</slot>
        </span>

        <div :class="$style.menuControlContent">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, provide, toRef, useId, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { onMenuPaneKeydown } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey } from '~flux/components/data';
    import FluxIcon from '../FluxIcon.vue';
    import $style from '~flux/components/css/component/Menu.module.scss';

    const {
        disabled: componentDisabled,
        label
    } = defineProps<{
        readonly disabled?: boolean;
        readonly iconLeading?: FluxIconName;
        readonly isFill?: boolean;
        readonly label?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        label?(): VNode[];
    }>();

    const labelId = useId();
    const isDisabled = useDisabled(toRef(() => componentDisabled));

    const hasLabel = computed(() => !!label || !!slots.label);

    provide(FluxDisabledInjectionKey, isDisabled);
</script>
