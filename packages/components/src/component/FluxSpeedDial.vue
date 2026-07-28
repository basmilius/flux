<template>
    <div
        ref="element"
        :class="clsx(
            $style.speedDial,
            position === 'start' ? $style.isCornerStart : $style.isCornerEnd,
            DIRECTION_CLASS[direction],
            isOpen && $style.isOpen
        )"
        @keydown="onKeyDown">
        <slot
            v-bind="{cssClass: $style.speedDialOpener, isOpen, toggle}"
            name="opener">
            <FluxPrimaryButton
                :class="$style.speedDialOpener"
                :icon-leading="isOpen ? iconOpen : icon"
                size="large"
                :aria-label="label"
                aria-haspopup="menu"
                :aria-expanded="isOpen"
                :aria-controls="actionsId"
                @click="toggle"/>
        </slot>

        <div
            ref="actions"
            :class="$style.speedDialActions"
            :id="actionsId"
            role="menu"
            :aria-label="label"
            @click="close">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    export type FluxSpeedDialDirection = 'up' | 'down' | 'start' | 'end';
</script>

<script
    lang="ts"
    setup>
    import { useClickOutside } from '@basmilius/common';
    import { getFocusableElements, unrefTemplateElement, useFocusZone } from '@flux-ui/internals';
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { nextTick, unref, useId, useTemplateRef, type VNode, watch } from 'vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import $style from '~flux/components/css/component/SpeedDial.module.scss';

    const isOpen = defineModel<boolean>('isOpen', {
        default: false
    });

    const {
        direction = 'up',
        icon = 'plus',
        iconOpen = 'xmark',
        position = 'end'
    } = defineProps<{
        readonly direction?: FluxSpeedDialDirection;
        readonly icon?: FluxIconName;
        readonly iconOpen?: FluxIconName;
        readonly label: string;
        readonly position?: 'start' | 'end';
    }>();

    defineSlots<{
        default(): VNode[];

        opener?(props: {
            readonly cssClass: string;
            readonly isOpen: boolean;
            toggle(): void;
        }): VNode[];
    }>();

    const DIRECTION_CLASS: Readonly<Record<FluxSpeedDialDirection, string>> = Object.freeze({
        up: $style.isUp,
        down: $style.isDown,
        start: $style.isStart,
        end: $style.isEnd
    });

    const elementRef = useTemplateRef('element');
    const actionsRef = useTemplateRef('actions');
    const actionsId = useId();

    useFocusZone(actionsRef);
    useClickOutside(elementRef, isOpen, close);

    watch(isOpen, async opened => {
        const element = unrefTemplateElement(elementRef);

        if (!element?.contains(document.activeElement)) {
            return;
        }

        await nextTick();

        const actions = unrefTemplateElement(actionsRef);

        if (opened && actions) {
            getFocusableElements(actions)[0]?.focus();
            return;
        }

        // The opener is rendered before the actions, so it is the first focusable
        // element of the dial.
        getFocusableElements(element)[0]?.focus();
    });

    function close(): void {
        isOpen.value = false;
    }

    function toggle(): void {
        isOpen.value = !unref(isOpen);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Escape' || !unref(isOpen)) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();
        close();
    }

    defineExpose({
        isOpen,
        close,
        toggle
    });
</script>
