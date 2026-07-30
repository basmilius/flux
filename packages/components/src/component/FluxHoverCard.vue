<template>
    <span
        ref="anchor"
        :class="$style.hoverCard"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave">
        <slot
            name="opener"
            v-bind="{close, open, isOpen}"/>

        <FluxFadeTransition @enter="onEnter">
            <AnchorPopup
                v-if="isOpen"
                :id="cardId"
                ref="popup"
                :anchor="anchorRef"
                :class="$style.hoverCardPopup"
                clamp-to-viewport
                :direction="direction"
                :margin="margin"
                :position="position"
                popover="manual"
                :role="label ? 'group' : undefined"
                :aria-label="label">
                <slot v-bind="{close}"/>
            </AnchorPopup>
        </FluxFadeTransition>
    </span>
</template>

<script
    lang="ts"
    setup>
    import { useEventListener } from '@basmilius/common';
    import { isHtmlElement } from '@basmilius/utils';
    import { getFocusableElements, isSSR } from '@flux-ui/internals';
    import type { FluxDirection } from '@flux-ui/types';
    import { computed, onUnmounted, ref, toRef, useId, useTemplateRef, type VNode, watch } from 'vue';
    import { AnchorPopup } from '~flux/components/component/primitive';
    import { useDisabled } from '~flux/components/composable';
    import { FluxFadeTransition } from '~flux/components/transition';
    import $style from '~flux/components/css/component/HoverCard.module.scss';

    const emit = defineEmits<{
        close: [];
        open: [];
    }>();

    const {
        closeDelay = 150,
        direction = 'vertical',
        disabled: componentDisabled,
        margin = 9,
        openDelay = 500
    } = defineProps<{
        readonly closeDelay?: number;
        readonly direction?: FluxDirection;
        readonly disabled?: boolean;
        readonly label?: string;
        readonly margin?: number;
        readonly openDelay?: number;
        readonly position?:
            | 'top' | 'top-left' | 'top-right'
            | 'left' | 'left-top' | 'left-bottom'
            | 'right' | 'right-top' | 'right-bottom'
            | 'bottom' | 'bottom-left' | 'bottom-right';
    }>();

    defineSlots<{
        default(props: { close(): void }): VNode[];

        opener(props: {
            close(): void;
            open(): void;

            readonly isOpen: boolean;
        }): VNode[];
    }>();

    const anchorRef = useTemplateRef<HTMLElement>('anchor');
    const popupRef = useTemplateRef<InstanceType<typeof AnchorPopup>>('popup');

    const cardId = useId();

    const isOpen = ref(false);

    const disabled = useDisabled(toRef(() => componentDisabled));
    const dismissTarget = computed(() => isOpen.value ? window : null);

    let closeTimer = 0;
    let openTimer = 0;
    let isPointerInside = false;
    let openerElement: HTMLElement | null = null;
    let describedElement: HTMLElement | null = null;

    watch(disabled, value => value && close());

    watch(isOpen, value => {
        describedElement?.removeAttribute('aria-describedby');
        describedElement = value ? resolveOpener() : null;
        describedElement?.setAttribute('aria-describedby', cardId);
    });

    onUnmounted(clearTimers);

    function close(): void {
        clearTimers();

        if (!isOpen.value) {
            return;
        }

        isOpen.value = false;
        emit('close');
    }

    function open(): void {
        clearTimers();

        if (isOpen.value || disabled.value) {
            return;
        }

        isOpen.value = true;
        emit('open');
    }

    function clearTimers(): void {
        clearTimeout(closeTimer);
        clearTimeout(openTimer);
        closeTimer = 0;
        openTimer = 0;
    }

    function hasFocusInside(): boolean {
        return !!anchorRef.value?.contains(document.activeElement);
    }

    function isInsideCard(node: Node | null): boolean {
        const popup = popupElement();

        return !!node && !!popup && popup.contains(node);
    }

    function resolveOpener(): HTMLElement | null {
        const anchor = anchorRef.value;

        if (openerElement) {
            return openerElement;
        }

        return anchor ? getFocusableElements(anchor).find(element => !isInsideCard(element)) ?? anchor : null;
    }

    function popupElement(): HTMLElement | null {
        return (popupRef.value?.$el ?? null) as HTMLElement | null;
    }

    function onEnter(element: Element): void {
        if (!isHtmlElement(element)) {
            return;
        }

        element.showPopover();
        popupRef.value?.reposition();
    }

    function onFocusIn(evt: FocusEvent): void {
        const target = evt.target;

        if (!isHtmlElement(target) || isInsideCard(target)) {
            return;
        }

        openerElement = target;

        if (target.matches(':focus-visible')) {
            open();
        }
    }

    function onFocusOut(evt: FocusEvent): void {
        const next = evt.relatedTarget as Node | null;

        if (isPointerInside || anchorRef.value?.contains(next)) {
            return;
        }

        close();
    }

    function onPointerEnter(evt: PointerEvent): void {
        if (evt.pointerType === 'touch') {
            return;
        }

        isPointerInside = true;
        clearTimeout(closeTimer);
        closeTimer = 0;

        if (isOpen.value || disabled.value) {
            return;
        }

        openTimer = window.setTimeout(open, openDelay);
    }

    function onPointerLeave(evt: PointerEvent): void {
        if (evt.pointerType === 'touch') {
            return;
        }

        isPointerInside = false;
        clearTimeout(openTimer);
        openTimer = 0;

        if (!isOpen.value || hasFocusInside()) {
            return;
        }

        closeTimer = window.setTimeout(close, closeDelay);
    }

    if (!isSSR) {
        useEventListener(dismissTarget, 'keydown', (evt: KeyboardEvent) => {
            if (evt.key !== 'Escape') {
                return;
            }

            if (isInsideCard(document.activeElement)) {
                openerElement?.focus();
            }

            close();
        });
    }

    defineExpose({
        close,
        open,
        isOpen
    });
</script>
