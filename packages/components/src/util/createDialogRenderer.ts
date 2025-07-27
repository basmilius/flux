import { flattenVNodeTree, useFocusTrap } from '@flux-ui/internals';
import type { Component, RenderFunction, SetupContext, Slots, VNode } from 'vue';
import { Comment, h, onUnmounted, ref, Teleport, watch } from 'vue';
import { registerDialog, useFluxStore } from '$flux/data';
import $style from '$flux/css/component/Overlay.module.scss';

type Emit = SetupContext<['close']>['emit'];
type Props = {
    readonly isCloseable?: boolean;
    readonly viewKey?: string;
};

const TARGET_SELECTOR = `.${$style.overlayProvider.replaceAll(' ', '.')}`;

export default function (attrs: object, props: Props, emit: Emit, slots: Slots, className: string, transition: Component): RenderFunction {
    let unregister: Function | null = null;
    let zIndex = 0;

    const dialogRef = ref<HTMLElement>();

    useFocusTrap(dialogRef);

    onUnmounted(() => {
        unregister?.();
    });

    watch(dialogRef, (dialog, _, onCleanup) => {
        if (!dialog) {
            return;
        }

        dialog.addEventListener('keydown', onKeyDown, {passive: true});
        dialog.focus();

        onCleanup(() => {
            dialog.removeEventListener('keydown', onKeyDown);
        });
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Escape' || !unregister || !props.isCloseable) {
            return;
        }

        emit('close');
    }

    return () => {
        const {dialogCount} = useFluxStore();

        const children = flattenVNodeTree(slots.default?.() ?? []);
        const isVisible = children.length > 0 && children.some(child => child.type !== Comment);
        let content: VNode | undefined;

        if (isVisible) {
            if (!unregister) {
                [zIndex, unregister] = registerDialog();
            }

            content = h('div', {
                key: props.viewKey,
                ref: dialogRef,
                class: [className, zIndex === dialogCount && $style.isCurrent],
                style: {
                    zIndex: zIndex + 1000
                },
                tabindex: 0
            }, children);
        } else {
            unregister?.();
            unregister = null;
        }

        return h(Teleport, {defer: true, disabled: !content, to: TARGET_SELECTOR}, [
            h(transition, attrs, {
                default: () => content
            })
        ]);
    };
}
