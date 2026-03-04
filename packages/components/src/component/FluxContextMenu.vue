<template>
    <div
        :class="$style.contextMenu"
        @contextmenu.prevent="onContextMenu">
        <slot v-bind="{close}"/>

        <dialog
            ref="dialog"
            :class="$style.contextMenuDialog"
            :style="{
                '--pane-x': `${paneX}px`,
                '--pane-y': `${paneY}px`
            }"
            @click="onDialogBackdropClick"
            @keydown.prevent.esc="close">
            <FluxPane
                v-if="isOpen"
                ref="pane"
                :class="clsx(
                    $style.contextMenuPane,
                    isClosing && $style.isClosing,
                    isOpening && $style.isOpening
                )">
                <slot
                    name="menu"
                    v-bind="{close}"/>
            </FluxPane>
        </dialog>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement } from '@flux-ui/internals';
    import type { Ref } from 'vue';
    import { clsx } from 'clsx';
    import { computed, provide, ref, unref, useTemplateRef, watch } from 'vue';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxPane from './FluxPane.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    const {
        isDebug = false
    } = defineProps<{
        readonly isDebug?: boolean;
    }>();

    defineSlots<{
        default(props: {
            close(): void;
        }): any;

        menu(props: {
            close(): void;
        }): any;
    }>();

    const dialogRef = useTemplateRef('dialog');
    const paneRef = useTemplateRef('pane');

    const isClosing = ref(false);
    const isOpening = ref(false);
    const isOpen = ref(false);
    const paneX = ref(0);
    const paneY = ref(0);

    const isDebugRef = computed(() => !!isDebug);

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

    function open(x: number, y: number): void {
        if (unref(isOpen)) {
            isOpening.value = false;
            isClosing.value = false;

            requestAnimationFrame(() => {
                const pane = unrefTemplateElement(paneRef);

                if (!pane) {
                    return;
                }

                const {width, height} = pane.getBoundingClientRect();
                paneX.value = Math.max(12, Math.min(innerWidth - width - 12, x));
                paneY.value = Math.max(12, Math.min(innerHeight - height - 12, y));
            });

            return;
        }

        isOpen.value = true;
        paneX.value = x;
        paneY.value = y;

        requestAnimationFrame(() => {
            const pane = unrefTemplateElement(paneRef);

            if (!pane) {
                return;
            }

            pane.addEventListener('animationend', () => {
                isOpening.value = false;
            }, {once: true});

            isOpening.value = true;

            const {width, height} = pane.getBoundingClientRect();
            paneX.value = Math.max(12, Math.min(innerWidth - width - 12, x));
            paneY.value = Math.max(12, Math.min(innerHeight - height - 12, y));
        });
    }

    function onContextMenu(evt: MouseEvent): void {
        open(evt.clientX, evt.clientY);
    }

    function onDialogBackdropClick(evt: Event): void {
        const target = evt.target as HTMLElement;

        if (target.tagName !== 'DIALOG') {
            return;
        }

        close();
    }

    watch(isOpen, (isNowOpen, _, onCleanup) => {
        const dialog = unref(dialogRef)!;

        if (isNowOpen && !dialog.open) {
            dialog.showModal();

            const onScroll = () => close();
            window.addEventListener('scroll', onScroll, {passive: true, capture: true});
            onCleanup(() => window.removeEventListener('scroll', onScroll, {capture: true}));
        } else if (!isNowOpen && dialog.open) {
            dialog.close();
        }
    });

    provide(FluxContextMenuInjectionKey, {
        isDebug: isDebugRef,
        isOpen,
        dialog: dialogRef as Ref<HTMLElement | null>,
        close
    });

    defineExpose({
        close,
        open
    });
</script>
