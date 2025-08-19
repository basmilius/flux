<template>
    <div
        ref="mount"
        :class="$style.flyout"
        :style="{
            '--opener-width': `${openerWidth}px`,
            '--pane-mx': `${paneMarginX}px`,
            '--pane-my': `${paneMarginY}px`,
            '--pane-x': `${paneX - 12}px`,
            '--pane-y': `${paneY - 12}px`
        }">
        <slot
            name="opener"
            v-bind="{close, open, toggle}"/>

        <dialog
            ref="dialog"
            :class="$style.flyoutDialog"
            @click="onDialogBackdropClick"
            @keydown.prevent.esc="close">
            <FluxPane
                v-if="isOpen"
                ref="pane"
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
    import { unrefTemplateElement, useEventListener, useFocusTrap } from '@flux-ui/internals';
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { provide, ref, unref, useTemplateRef, watch } from 'vue';
    import { FluxFlyoutInjectionKey } from '$flux/data';
    import FluxPane from './FluxPane.vue';
    import $style from '$flux/css/component/Flyout.module.scss';

    const {
        direction = 'vertical',
        margin = 9
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly isAutoWidth?: boolean;
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
        }): any;

        opener(props: {
            close(): void;
            open(): void;
            toggle(): void;
        }): any;
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

    useEventListener(ref(window), 'resize', () => unref(isOpen) && reposition());
    useFocusTrap(paneRef);

    function close(): void {
        const pane = unrefTemplateElement(paneRef);

        if (!pane) {
            return;
        }

        pane.addEventListener('animationend', () => {
            isClosing.value = false;
            isOpen.value = false;
        }, {once: true});

        isClosing.value = true;
    }

    function open(): void {
        const mount = unref(mountRef)!;
        const {width, height} = mount.children[0].getBoundingClientRect();

        isOpen.value = true;
        openerWidth.value = width;
        openerHeight.value = height;

        requestAnimationFrame(() => {
            const pane = unrefTemplateElement(paneRef)!;

            pane.addEventListener('animationend', () => {
                isOpening.value = false;
            }, {once: true});

            isOpening.value = true;
        });

        requestAnimationFrame(reposition);
    }

    function reposition(): void {
        const mount = unref(mountRef)!;
        const pane = unrefTemplateElement(paneRef)!;
        const {top, left, width, height} = mount.children[0].getBoundingClientRect();
        const {width: paneWidth, height: paneHeight} = pane.getBoundingClientRect();

        let x, y, mx = 0, my = 0;

        if (direction === 'horizontal') {
            x = left + width;
            y = top + height / 2 - paneHeight / 2;
            mx = margin;

            if (x + paneWidth > innerWidth - 30) {
                x = left - paneWidth;
                mx = -mx;
            }
        } else {
            x = left + width / 2 - paneWidth / 2;
            y = top + height;
            my = margin;

            if (y + paneHeight > innerHeight - 30) {
                y = top - paneHeight;
                my = -my;
            }
        }

        paneX.value = Math.max(30, Math.min(innerWidth - paneWidth - 30, x));
        paneY.value = Math.max(30, Math.min(innerHeight - paneHeight - 30, y));
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

            window.addEventListener('scroll', reposition, {passive: true});
            onCleanup(() => window.removeEventListener('scroll', reposition));
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    });

    provide(FluxFlyoutInjectionKey, {
        isClosing,
        isOpen,
        isOpening
    });

    defineExpose({
        close,
        open,
        toggle
    });
</script>
