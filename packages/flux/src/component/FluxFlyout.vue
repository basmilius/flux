<template>
    <div
        ref="mountRef"
        class="flux-flyout"
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
            ref="dialogRef"
            class="flux-flyout-dialog"
            @cancel.prevent="close"
            @click="onDialogBackdropClick">
            <FluxPane
                v-if="isOpen"
                ref="paneRef"
                class="flux-flyout-pane"
                :class="{
                    'is-auto-width': isAutoWidth,
                    'is-closing': isClosing,
                    'is-opening': isOpening
                }"
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
    import { provide, ref, toRefs, unref, watch } from 'vue';
    import { useFocusTrap } from '@/composable';
    import { FluxFlyoutInjectionKey } from '@/data';
    import { unrefElement } from '@/util';
    import FluxPane from './FluxPane.vue';

    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly isAutoWidth?: boolean;
        readonly margin?: number;
        readonly width?: number | string;
    }

    const props = withDefaults(defineProps<Props>(), {
        axis: 'vertical',
        margin: 9
    });

    const {axis, margin} = toRefs(props);

    const dialogRef = ref<HTMLDialogElement>();
    const mountRef = ref<HTMLDivElement>();
    const paneRef = ref<HTMLDivElement>();

    const isClosing = ref(false);
    const isOpening = ref(false);
    const isOpen = ref(false);
    const openerWidth = ref(0);
    const openerHeight = ref(0);
    const paneX = ref(0);
    const paneY = ref(0);
    const paneMarginX = ref(0);
    const paneMarginY = ref(0);

    useFocusTrap(paneRef);

    function close(): void {
        const pane = unrefElement(paneRef);

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
            const pane = unrefElement(paneRef)!;

            pane.addEventListener('animationend', () => {
                isOpening.value = false;
            }, {once: true});

            isOpening.value = true;
        });

        requestAnimationFrame(reposition);
    }

    function reposition(): void {
        const mount = unref(mountRef)!;
        const pane = unrefElement(paneRef)!;
        const {top, left, width, height} = mount.children[0].getBoundingClientRect();
        const {width: paneWidth, height: paneHeight} = pane.getBoundingClientRect();

        let x, y, mx = 0, my = 0;

        if (unref(axis) === 'horizontal') {
            x = left + width;
            y = top + height / 2 - paneHeight / 2;
            mx = unref(margin);

            if (x + paneWidth > innerWidth - 30) {
                x = left - paneWidth;
                mx = -mx;
            }
        } else {
            x = left + width / 2 - paneWidth / 2;
            y = top + height;
            my = unref(margin);

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

<style lang="scss">
    .flux-flyout {
        display: contents;

        &-dialog {
            top: var(--pane-y);
            left: var(--pane-x);
            margin: 0;
            padding: 12px;
            background: unset;
            border: 0;

            &::backdrop {
                background: unset;
            }
        }

        &-pane {
            max-height: calc(100dvh - 120px);
            box-shadow: var(--shadow-md);
            overflow: auto;
            transform: translate3d(var(--pane-mx), var(--pane-my), 0);

            &.is-auto-width {
                width: var(--opener-width);
            }

            &.is-closing {
                animation: flux-flyout-close 210ms var(--swift-out) both;
            }

            &.is-opening {
                animation: flux-flyout-open 210ms var(--deceleration-curve) both;
            }
        }
    }

    @keyframes flux-flyout-close {
        to {
            opacity: 0;
        }
    }

    @keyframes flux-flyout-open {
        from {
            opacity: 0;
            transform: translate3d(0, 0, 0)
        }
    }

    @keyframes flux-flyout-mobile-close {
        to {
            opacity: 0;
            transform: translate3d(0, 100%, 0)
        }
    }

    @keyframes flux-flyout-mobile-open {
        from {
            opacity: 0;
            transform: translate3d(0, 100%, 0)
        }
    }
</style>
