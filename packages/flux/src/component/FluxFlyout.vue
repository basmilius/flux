<template>
    <div
        ref="mountRef"
        :class="styles.flyout"
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
            :class="styles.flyoutDialog"
            @cancel.prevent="close"
            @click="onDialogBackdropClick">
            <FluxPane
                v-if="isOpen"
                ref="paneRef"
                :class="clsx(
                    styles.flyoutPane,
                    isAutoWidth && styles.isAutoWidth,
                    isClosing && styles.isClosing,
                    isOpening && styles.isOpening
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
    import { clsx } from 'clsx';
    import { provide, ref, toRefs, unref, watch } from 'vue';
    import { useFocusTrap } from '@/composable';
    import { FluxFlyoutInjectionKey } from '@/data';
    import { unrefElement } from '@/util';
    import FluxPane from './FluxPane.vue';
    import styles from '@/css/component/Flyout.module.scss';

    export type Props = {
        readonly axis?: 'horizontal' | 'vertical';
        readonly isAutoWidth?: boolean;
        readonly margin?: number;
        readonly width?: number | string;
    };

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
