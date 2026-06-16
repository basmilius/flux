<template>
    <div
        :class="$style.contextMenu"
        @contextmenu="onContextMenu">
        <slot/>

        <Teleport to="body">
            <FluxFadeTransition>
                <AnchorPopup
                    v-if="isOpen"
                    ref="popup"
                    :anchor="virtualAnchor"
                    :class="$style.contextMenuPopup"
                    :margin="2"
                    :position="position"
                    role="menu"
                    @click="close()">
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
    import { useClickOutside } from '@basmilius/common';
    import { isSSR, useEventListener, useFocusTrap } from '@flux-ui/internals';
    import { type ComponentPublicInstance, reactive, ref, toRef, useTemplateRef, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { FluxFadeTransition } from '~flux/components/transition';
    import { AnchorPopup } from '~flux/components/component/primitive';
    import $style from '~flux/components/css/component/ContextMenu.module.scss';

    const {
        disabled: componentDisabled,
        position = 'bottom-left'
    } = defineProps<{
        readonly disabled?: boolean;
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

    const disabled = useDisabled(toRef(() => componentDisabled));
    const popupRef = useTemplateRef<ComponentPublicInstance>('popup');

    const isOpen = ref(false);
    const cursor = reactive({x: 0, y: 0});
    const virtualAnchor = {
        $el: {
            getBoundingClientRect: () => new DOMRect(cursor.x, cursor.y, 0, 0)
        }
    } as unknown as ComponentPublicInstance;

    useFocusTrap(popupRef);

    function onContextMenu(evt: MouseEvent): void {
        if (disabled.value) {
            return;
        }

        evt.preventDefault();

        cursor.x = evt.clientX;
        cursor.y = evt.clientY;
        isOpen.value = true;

        emit('open', evt);
    }

    function close(): void {
        if (!isOpen.value) {
            return;
        }

        isOpen.value = false;
        emit('close');
    }

    if (!isSSR) {
        useClickOutside(popupRef, isOpen, () => close());

        useEventListener(ref(window), 'keydown', (evt: KeyboardEvent) => {
            if (isOpen.value && evt.key === 'Escape') {
                close();
            }
        });

        useEventListener(ref(window), 'scroll', () => {
            if (isOpen.value) {
                close();
            }
        }, {capture: true});
    }
</script>
