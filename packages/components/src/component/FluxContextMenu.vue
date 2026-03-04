<template>
    <div
        :class="$style.contextMenuTrigger"
        @contextmenu.prevent="onContextMenu">
        <slot/>
    </div>

    <Teleport to="body">
        <div
            v-if="isOpen"
            ref="container"
            :class="$style.contextMenu"
            :style="{
                '--x': `${x}px`,
                '--y': `${y}px`,
                '--width': width ? `${width}px` : undefined
            }">
            <FluxPane
                ref="pane"
                :class="[
                    $style.contextMenuPane,
                    isClosing && $style.isClosing,
                    isOpening && $style.isOpening
                ]">
                <FluxMenu>
                    <slot name="menu" v-bind="{close}"/>
                </FluxMenu>
            </FluxPane>
        </div>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { isSSR, unrefTemplateElement } from '@flux-ui/internals';
    import { onMounted, onUnmounted, provide, ref, toRef, unref, useTemplateRef } from 'vue';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxMenu from './FluxMenu.vue';
    import FluxPane from './FluxPane.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    const {
        isDebug = false,
        width
    } = defineProps<{
        readonly isDebug?: boolean;
        readonly width?: number;
    }>();

    defineSlots<{
        default(): any;
        menu(props: {
            close(): void;
        }): any;
    }>();

    const containerRef = useTemplateRef('container');
    const paneRef = useTemplateRef('pane');

    const isClosing = ref(false);
    const isOpen = ref(false);
    const isOpening = ref(false);
    const x = ref(0);
    const y = ref(0);

    if (!isSSR) {
        onMounted(() => {
            document.addEventListener('mousedown', onMouseDown, {capture: true});
            document.addEventListener('keydown', onKeyDown, {capture: true});
        });

        onUnmounted(() => {
            document.removeEventListener('mousedown', onMouseDown, {capture: true});
            document.removeEventListener('keydown', onKeyDown, {capture: true});
        });
    }

    function close(): void {
        if (!unref(isOpen) || unref(isClosing)) {
            return;
        }

        const pane = unrefTemplateElement(paneRef);

        if (!pane) {
            isOpen.value = false;
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

            const container = unrefTemplateElement(containerRef);

            if (!container) {
                return;
            }

            const {width: containerWidth, height: containerHeight} = container.getBoundingClientRect();
            let ox = clientX;
            let oy = clientY;

            if (ox + containerWidth > innerWidth - 12) {
                ox = innerWidth - containerWidth - 12;
            }

            if (oy + containerHeight > innerHeight - 12) {
                oy = innerHeight - containerHeight - 12;
            }

            x.value = Math.max(12, ox);
            y.value = Math.max(12, oy);
        });
    }

    function onContextMenu(evt: MouseEvent): void {
        if (unref(isOpen)) {
            isClosing.value = false;
            isOpen.value = false;
        }

        open(evt.clientX, evt.clientY);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'Escape' && unref(isOpen)) {
            close();
        }
    }

    function onMouseDown(evt: MouseEvent): void {
        if (!unref(isOpen)) {
            return;
        }

        const container = unrefTemplateElement(containerRef);

        if (!container || !container.contains(evt.target as Node)) {
            close();
        }
    }

    provide(FluxContextMenuInjectionKey, {
        close,
        isDebug: toRef(() => isDebug)
    });

    defineExpose({close, open});
</script>
