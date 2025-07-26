import { flattenVNodeTree, useFocusTrap } from '@flux-ui/internals';
import type { Component, RenderFunction, SetupContext, Slots, VNode } from 'vue';
import { Comment, getCurrentInstance, h, onUnmounted, ref, Teleport, watch } from 'vue';
import { registerDialog, useFluxStore } from '$flux/data';

type Emit = SetupContext<['close']>['emit'];
type Props = {
    readonly isCloseable?: boolean;
    readonly viewKey?: string;
};

export default function (attrs: object, props: Props, emit: Emit, slots: Slots, className: string, transition: Component): RenderFunction {
    const instance = getCurrentInstance();
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
                unregister = registerDialog();
                zIndex = dialogCount + 1000;
            }

            content = h('div', {
                key: props.viewKey,
                ref: dialogRef,
                class: className,
                style: {zIndex},
                tabindex: 0
            }, children);
        } else {
            unregister?.();
            unregister = null;
        }

        return h(Teleport, {defer: true, disabled: !content, to: instance?.appContext.app._container}, [
            h(transition, attrs, {
                default: () => content
            })
        ]);
    };
}
