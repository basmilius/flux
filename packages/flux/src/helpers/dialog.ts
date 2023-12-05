import type { Component, RenderFunction, Slots } from 'vue';
import { Comment, h, onMounted, onUnmounted, SetupContext, Teleport, VNode } from 'vue';
import { registerDialog } from '@/data';
import { flattenVNodeTree } from '@/utils';

type _Emit = SetupContext<['close']>['emit'];
type _Props = {
    readonly isCloseable?: boolean;
};

export function createDialogRenderer(attrs: object, props: _Props, emit: _Emit, slots: Slots, className: string | (() => string), transition: Component, to: string = 'body'): RenderFunction {
    let unregister: Function | null = null;

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
        const children = flattenVNodeTree(slots.default?.() ?? []);
        const isVisible = children.length > 0 && children.some(child => child.type !== Comment);
        const content: VNode[] = [];

        if (isVisible) {
            content.push(h('div', {
                class: typeof className === 'function' ? className() : className
            }, children));

            if (!unregister) {
                unregister = registerDialog();
            }
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
