<template>
    <div
        ref="mount"
        :class="$style.contextMenu"
        @contextmenu.prevent="onContextMenu">
        <slot/>

        <dialog
            ref="dialog"
            :class="$style.contextMenuDialog"
            :style="{
                '--x': `${x - 24}px`,
                '--y': `${y - 24}px`
            }"
            @click="onDialogBackdropClick"
            @keydown.prevent.esc="close">
            <FluxPane
                v-if="isOpen"
                ref="pane"
                :class="[
                    $style.contextMenuPane,
                    isClosing && $style.isClosing,
                    isOpening && $style.isOpening
                ]">
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
    import { provide, ref, unref, useTemplateRef, watch } from 'vue';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxPane from './FluxPane.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    const {
        isDebug = false
    } = defineProps<{
        readonly isDebug?: boolean;
    }>();

    defineSlots<{
        default(): any;

        menu(props: {
            close(): void;
        }): any;
    }>();

    const dialogRef = useTemplateRef('dialog');
    const paneRef = useTemplateRef('pane');

    const isClosing = ref(false);
    const isOpening = ref(false);
    const isOpen = ref(false);
    const x = ref(0);
    const y = ref(0);

    const isDebugRef = ref(isDebug);

    watch(() => isDebug, v => isDebugRef.value = v);

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

    function open(clientX: number, clientY: number): void {
        isOpen.value = true;
        x.value = clientX;
        y.value = clientY;

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

            if (clientX + width > innerWidth - 30) {
                x.value = clientX - width;
            }

            if (clientY + height > innerHeight - 30) {
                y.value = clientY - height;
            }
        });
    }

    function onContextMenu(evt: MouseEvent): void {
        if (unref(isOpen)) {
            close();
            requestAnimationFrame(() => open(evt.clientX, evt.clientY));
        } else {
            open(evt.clientX, evt.clientY);
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
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    });

    provide(FluxContextMenuInjectionKey, {
        close,
        isDebug: isDebugRef
    });

    defineExpose({
        close,
        open
    });
</script>
