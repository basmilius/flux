<template>
    <div
        ref="mount"
        :class="$style.flyout"
        :style="{
            '--opener-width': `${openerWidth}px`,
            '--pane-mx': `${paneMarginX}px`,
            '--pane-my': `${paneMarginY}px`,
            '--pane-x': `${paneX - 30}px`,
            '--pane-y': `${paneY - 30}px`
        }">
        <slot
            name="opener"
            v-bind="{close, open, toggle, isOpen: isOpen || isOpening || isClosing}"/>

        <dialog
            ref="dialog"
            :aria-label="label"
            :class="$style.flyoutDialog"
            @click="onDialogBackdropClick">
            <FluxPane
                v-if="isOpen"
                ref="pane"
                :aria-label="label"
                role="dialog"
                :class="clsx(
                    $style.flyoutPane,
                    isAutoWidth && $style.isAutoWidth,
                    isClosing && $style.isClosing,
                    isOpening && $style.isOpening
                )"
                :style="{
                    width: `${width}px`
                }">
                <slot v-bind="{close, paneX, paneY, openerWidth, openerHeight}"/>
            </FluxPane>
        </dialog>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useHotKey } from '@basmilius/common';
    import { isSSR, unrefTemplateElement, useEventListener, useFocusTrap } from '@flux-ui/internals';
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { onUnmounted, provide, ref, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { FluxFlyoutInjectionKey } from '~flux/components/data';
    import FluxPane from './FluxPane.vue';
    import $style from '~flux/components/css/component/Flyout.module.scss';

    const emit = defineEmits<{
        close: [];
        open: [];
    }>();

    const {
        direction = 'vertical',
        margin = 9
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly isAutoWidth?: boolean;
        readonly label?: string;
        readonly margin?: number;
        readonly width?: number | string;
    }>();

    defineSlots<{
        default(props: {
            close(): void;

            readonly paneX: number;
            readonly paneY: number;
            readonly openerWidth: number;
            readonly openerHeight: number;
        }): VNode[];

        opener(props: {
            close(): void;
            open(): void;
            toggle(): void;

            readonly isOpen: boolean;
        }): VNode[];
    }>();

    const dialogRef = useTemplateRef('dialog');
    const mountRef = useTemplateRef('mount');
    const paneRef = useTemplateRef('pane');

    const isClosing = ref(false);
    const isOpening = ref(false);
    const isOpen = ref(false);
    const openerWidth = ref(0);
    const openerHeight = ref(0);
    const paneX = ref(0);
    const paneY = ref(0);
    const paneMarginX = ref(0);
    const paneMarginY = ref(0);

    !isSSR && useEventListener(ref(window), 'resize', () => unref(isOpen) && reposition());
    useFocusTrap(paneRef);

    useHotKey('esc', () => close(), {
        enabled: isOpen,
        target: dialogRef
    });

    let closeAnimationEndListener: ((evt: AnimationEvent) => void) | null = null;
    let openAnimationEndListener: ((evt: AnimationEvent) => void) | null = null;

    onUnmounted(() => {
        const pane = unrefTemplateElement(paneRef);

        if (!pane) {
            return;
        }

        if (closeAnimationEndListener) {
            pane.removeEventListener('animationend', closeAnimationEndListener);
            closeAnimationEndListener = null;
        }

        if (openAnimationEndListener) {
            pane.removeEventListener('animationend', openAnimationEndListener);
            openAnimationEndListener = null;
        }
    });

    function close(): void {
        const pane = unrefTemplateElement(paneRef);

        if (!pane || unref(isClosing)) {
            return;
        }

        if (openAnimationEndListener) {
            pane.removeEventListener('animationend', openAnimationEndListener);
            openAnimationEndListener = null;
            isOpening.value = false;
        }

        const listener = (evt: AnimationEvent): void => {
            if (evt.target !== pane) {
                return;
            }

            pane.removeEventListener('animationend', listener);

            if (closeAnimationEndListener === listener) {
                closeAnimationEndListener = null;
            }

            isClosing.value = false;
            isOpen.value = false;
        };

        closeAnimationEndListener = listener;
        pane.addEventListener('animationend', listener);

        isClosing.value = true;
    }

    function open(): void {
        const mount = unref(mountRef)!;
        const {width, height} = mount.children[0].getBoundingClientRect();

        const existingPane = unrefTemplateElement(paneRef);

        if (existingPane && closeAnimationEndListener) {
            existingPane.removeEventListener('animationend', closeAnimationEndListener);
            closeAnimationEndListener = null;
        }

        isClosing.value = false;
        isOpen.value = true;
        openerWidth.value = width;
        openerHeight.value = height;

        requestAnimationFrame(() => {
            const pane = unrefTemplateElement(paneRef)!;

            if (openAnimationEndListener) {
                pane.removeEventListener('animationend', openAnimationEndListener);
            }

            const listener = (evt: AnimationEvent): void => {
                if (evt.target !== pane) {
                    return;
                }

                pane.removeEventListener('animationend', listener);

                if (openAnimationEndListener === listener) {
                    openAnimationEndListener = null;
                }

                isOpening.value = false;
            };

            openAnimationEndListener = listener;
            pane.addEventListener('animationend', listener);

            isOpening.value = true;
        });

        requestAnimationFrame(reposition);
    }

    function reposition(): void {
        const mount = unref(mountRef)!;
        const pane = unrefTemplateElement(paneRef)!;
        const {top, left, width, height} = mount.children[0].getBoundingClientRect();
        const {width: paneWidth, height: paneHeight} = pane.getBoundingClientRect();

        let x: number, y: number, mx = 0, my = 0;

        if (direction === 'horizontal') {
            x = left + width;
            y = top + height / 2 - paneHeight / 2;
            mx = margin;

            if (x + paneWidth > innerWidth - 12) {
                x = left - paneWidth;
                mx = -mx;
            }
        } else {
            x = left + width / 2 - paneWidth / 2;
            y = top + height;
            my = margin;

            if (y + paneHeight > innerHeight - 12) {
                y = top - paneHeight;
                my = -my;
            }
        }

        paneX.value = Math.max(12, Math.min(innerWidth - paneWidth - 12, x));
        paneY.value = Math.max(12, Math.min(innerHeight - paneHeight - 12, y));
        paneMarginX.value = mx;
        paneMarginY.value = my;
    }

    function toggle(): void {
        if (isOpen.value) {
            close();
        } else {
            open();
        }
    }

    function onDialogBackdropClick(evt: Event): void {
        const target = evt.target as HTMLElement;

        if (target.tagName !== 'DIALOG') {
            return;
        }

        close();
    }

    watch(isOpen, (isOpen, _, onCleanup) => {
        const dialog = unref(dialogRef)!;

        if (isOpen && !dialog.open) {
            dialog.showModal();
            emit('open');

            window.addEventListener('scroll', reposition, {passive: true});
            onCleanup(() => window.removeEventListener('scroll', reposition));
        } else if (!isOpen && dialog.open) {
            dialog.close();
            emit('close');
        }
    });

    provide(FluxFlyoutInjectionKey, {
        isClosing,
        isOpen,
        isOpening,
        close
    });

    defineExpose({
        close,
        open,
        toggle,
        isOpen
    });
</script>
