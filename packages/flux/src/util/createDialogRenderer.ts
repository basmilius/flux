import { flattenVNodeTree } from '@basmilius/flux-internals';
import type { Component, RenderFunction, Slots } from 'vue';
import { Comment, h, onMounted, onUnmounted, SetupContext, Teleport, VNode } from 'vue';
import { registerDialog, useFluxStore } from '@/data';

type Emit = SetupContext<['close']>['emit'];
type Props = {
    readonly isCloseable?: boolean;
    readonly viewKey?: string;
};

export default function (attrs: object, props: Props, emit: Emit, slots: Slots, className: string, transition: Component, to: string = 'body'): RenderFunction {
    let unregister: Function | null = null;
    let zIndex = 0;

    onMounted(() => {
        window.addEventListener('keydown', onKeyDown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', onKeyDown);
        unregister?.();
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Escape' || !unregister || !props.isCloseable) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();
        emit('close');
    }

    return () => {
        const {dialogCount} = useFluxStore();

        const children = flattenVNodeTree(slots.default?.() ?? []);
        const isVisible = children.length > 0 && children.some(child => child.type !== Comment);
        const content: VNode[] = [];

        if (isVisible) {
            if (!unregister) {
                unregister = registerDialog();
                zIndex = dialogCount + 1000;
            }

            content.push(h('div', {
                key: props.viewKey,
                class: className,
                style: {zIndex}
            }, children));
        } else {
            unregister?.();
            unregister = null;
        }

        return h(Teleport, {disabled: content.length === 0, to}, [
            h(transition, attrs, {
                default: () => content
            })
        ]);
    };
}
