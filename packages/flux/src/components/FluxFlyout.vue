<template>
    <div
        ref="mountRef"
        class="flux-flyout">
        <slot
            name="opener"
            v-bind="{close, open, toggle}"/>

        <dialog
            ref="dialogRef"
            class="flux-flyout-dialog"
            @cancel.prevent="close"
            @click="onDialogBackdropClick">
            <flux-pane
                ref="paneRef"
                class="flux-flyout-pane"
                :class="{
                    'is-auto-width': isAutoWidth,
                    'is-closing': isClosing,
                    'is-opening': isOpening
                }">
                <slot v-bind="{close, paneX, paneY, openerWidth, openerHeight}"/>
            </flux-pane>
        </dialog>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ref, toRefs, unref, watch } from 'vue-demi';
    import { unrefElement } from '../composables';
    import { FluxPane } from '.';

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

    function close(): void {
        const pane = unrefElement(paneRef)!;

        pane.addEventListener('animationend', () => {
            isClosing.value = false;
            isOpen.value = false;
        }, {once: true});

        isClosing.value = true;
    }

    function open(): void {
        const mount = unref(mountRef)!;
        const pane = unrefElement(paneRef)!;
        const {top, left, width, height} = mount.children[0].getBoundingClientRect();

        isOpen.value = true;
        openerWidth.value = width;
        openerHeight.value = height;

        pane.addEventListener('animationend', () => {
            isOpening.value = false;
        }, {once: true});

        isOpening.value = true;

        requestAnimationFrame(() => {
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
        });
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

    watch(isOpen, isOpen => {
        const dialog = unref(dialogRef)!;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    });
</script>

<style lang="scss">
    .flux-flyout {
        display: contents;

        &-dialog {
            top: calc(v-bind(paneY) * 1px - 12px);
            left: calc(v-bind(paneX) * 1px - 12px);
            margin: 0;
            padding: 12px;
            background: unset;
            border: 0;

            &::backdrop {
                background: unset;
            }
        }

        &-pane {
            max-height: 100%;
            width: calc(v-bind(width) * 1px);
            overflow: auto;
            translate: calc(v-bind(paneMarginX) * 1px) calc(v-bind(paneMarginY) * 1px);

            &.is-auto-width {
                width: calc(v-bind(openerWidth) * 1px);
            }

            &.is-closing {
                animation: flux-flyout-close 210ms var(--swift-out) both;
            }

            &.is-opening {
                animation: flux-flyout-open 210ms var(--deceleration-curve) both;
            }
        }

        //@include media-breakpoint-down(md) {
        //    &-dialog {
        //        top: unset;
        //        left: 0;
        //        right: 0;
        //        bottom: 0;
        //        padding: 0;
        //        max-width: unset;
        //        width: 100%;
        //    }
        //
        //    &-pane.flux-pane {
        //        width: unset;
        //        border-left: 0;
        //        border-right: 0;
        //        border-bottom: 0;
        //        border-radius: 0;
        //        translate: 0 0;
        //
        //        &.is-closing {
        //            animation: flux-flyout-mobile-close 300ms var(--swift-out) both;
        //        }
        //
        //        &.is-opening {
        //            animation: flux-flyout-mobile-open 300ms var(--deceleration-curve) both;
        //        }
        //    }
        //}
    }

    @keyframes flux-flyout-close {
        to {
            opacity: 0;
        }
    }

    @keyframes flux-flyout-open {
        from {
            opacity: 0;
            translate: 0 0;
        }
    }

    @keyframes flux-flyout-mobile-close {
        to {
            opacity: 0;
            translate: 0 100%;
        }
    }

    @keyframes flux-flyout-mobile-open {
        from {
            opacity: 0;
            translate: 0 100%;
        }
    }
</style>
