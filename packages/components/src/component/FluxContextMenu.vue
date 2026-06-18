<template>
    <div
        :class="$style.contextMenu"
        @contextmenu="onContextMenu"
        @pointerdown="onPointerDown">
        <slot/>

        <Teleport to="body">
            <FluxFadeTransition>
                <AnchorPopup
                    v-if="isOpen"
                    ref="popup"
                    :anchor="virtualAnchor"
                    :class="$style.contextMenuPopup"
                    clamp-to-viewport
                    :margin="2"
                    :position="position"
                    role="menu">
                    <slot
                        name="menu"
                        v-bind="{close}"/>
                </AnchorPopup>
            </FluxFadeTransition>
        </Teleport>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { isSSR, useEventListener, useFocusTrap } from '@flux-ui/internals';
    import { computed, type ComponentPublicInstance, onUnmounted, provide, reactive, ref, toRef, useTemplateRef, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useMenuFlyoutProvider } from '~flux/components/composable/private';
    import { FluxMenuPersistentInjectionKey } from '~flux/components/data';
    import { FluxFadeTransition } from '~flux/components/transition';
    import { AnchorPopup } from '~flux/components/component/primitive';
    import $style from '~flux/components/css/component/ContextMenu.module.scss';

    const {
        debugCone = false,
        disabled: componentDisabled,
        isPersistent,
        position = 'bottom-left'
    } = defineProps<{
        readonly debugCone?: boolean;
        readonly disabled?: boolean;
        readonly isPersistent?: boolean;
        readonly position?:
            | 'top' | 'top-left' | 'top-right'
            | 'left' | 'left-top' | 'left-bottom'
            | 'right' | 'right-top' | 'right-bottom'
            | 'bottom' | 'bottom-left' | 'bottom-right';
    }>();

    const emit = defineEmits<{
        open: [MouseEvent];
        close: [];
    }>();

    defineSlots<{
        default(): VNode[];
        menu(props: {close(): void}): VNode[];
    }>();

    // A touch long-press opens the menu after this delay, as long as the finger stays within
    // MOVE_TOLERANCE pixels — moving further means the user is scrolling, not pressing.
    const LONG_PRESS_DURATION = 500;
    const MOVE_TOLERANCE = 10;

    const disabled = useDisabled(toRef(() => componentDisabled));
    const popupRef = useTemplateRef<ComponentPublicInstance>('popup');

    const isOpen = ref(false);
    const cursor = reactive({x: 0, y: 0});
    const lastPointerType = ref('');

    let pressTimer = 0;
    let pressX = 0;
    let pressY = 0;
    const virtualAnchor = {
        $el: {
            getBoundingClientRect: () => new DOMRect(cursor.x, cursor.y, 0, 0)
        }
    } as unknown as ComponentPublicInstance;

    const menuFlyout = useMenuFlyoutProvider({
        debugCone: toRef(() => debugCone),
        onCloseAll: () => close()
    });

    provide(FluxMenuPersistentInjectionKey, toRef(() => isPersistent ?? false));

    useFocusTrap(popupRef, {
        disable: computed(() => menuFlyout.keyboardStack.value.length > 0)
    });

    function onContextMenu(evt: MouseEvent): void {
        if (disabled.value) {
            return;
        }

        evt.preventDefault();

        // On touch the menu is opened by the long-press in onPointerDown. The native contextmenu event
        // that some platforms (e.g. Android) still emit after a long-press must not open a second menu.
        if (lastPointerType.value === 'touch') {
            return;
        }

        cursor.x = evt.clientX;
        cursor.y = evt.clientY;
        isOpen.value = true;

        emit('open', evt);
    }

    function cancelLongPress(): void {
        if (pressTimer !== 0) {
            clearTimeout(pressTimer);
            pressTimer = 0;
        }

        document.removeEventListener('pointermove', onLongPressMove, {capture: true});
        document.removeEventListener('pointerup', cancelLongPress, {capture: true});
        document.removeEventListener('pointercancel', cancelLongPress, {capture: true});
    }

    function onLongPressMove(evt: PointerEvent): void {
        if (Math.abs(evt.clientX - pressX) > MOVE_TOLERANCE || Math.abs(evt.clientY - pressY) > MOVE_TOLERANCE) {
            cancelLongPress();
        }
    }

    function onPointerDown(evt: PointerEvent): void {
        lastPointerType.value = evt.pointerType;

        if (disabled.value || evt.pointerType !== 'touch') {
            return;
        }

        cancelLongPress();

        pressX = evt.clientX;
        pressY = evt.clientY;

        document.addEventListener('pointermove', onLongPressMove, {capture: true, passive: true});
        document.addEventListener('pointerup', cancelLongPress, {capture: true, passive: true});
        document.addEventListener('pointercancel', cancelLongPress, {capture: true, passive: true});

        pressTimer = window.setTimeout(() => {
            pressTimer = 0;
            cancelLongPress();

            cursor.x = pressX;
            cursor.y = pressY;
            isOpen.value = true;

            emit('open', evt);
        }, LONG_PRESS_DURATION);
    }

    onUnmounted(cancelLongPress);

    function close(): void {
        if (!isOpen.value) {
            return;
        }

        isOpen.value = false;
        emit('close');
    }

    function isInsideMenu(target: Node | null): boolean {
        const root = (popupRef.value?.$el ?? null) as HTMLElement | null;

        return (!!root && !!target && root.contains(target)) || menuFlyout.isInsidePopups(target);
    }

    if (!isSSR) {
        useEventListener(ref(window), 'pointerdown', (evt: PointerEvent) => {
            if (isOpen.value && !isInsideMenu(evt.target as Node | null)) {
                close();
            }
        }, {capture: true});

        useEventListener(ref(window), 'keydown', (evt: KeyboardEvent) => {
            if (isOpen.value && evt.key === 'Escape') {
                close();
            }
        });

        // Scroll closes the menu, except when scrolling inside the menu itself (the popup has its own
        // overflow), so a long list can be scrolled without dismissing the menu.
        useEventListener(ref(window), 'scroll', (evt: Event) => {
            if (isOpen.value && !isInsideMenu(evt.target as Node | null)) {
                close();
            }
        }, {capture: true});
    }
</script>
