import type { Component, RenderFunction, Slots } from 'vue-demi';
import { h, onMounted, onUnmounted, SetupContext, VNode } from 'vue-demi';
import { FluxTeleport } from '../components';
import { useFluxStore } from '../data';
import { flattenVNodeTree, render } from '../utils';

type _Emit = SetupContext<['close']>['emit'];
type _Props = {
    readonly isCloseable?: boolean;
};

export function createDialogRenderer(props: _Props, emit: _Emit, slots: Slots, className: string | (() => string), transition: Component, teleportTo: string = '[data-flux-root]'): RenderFunction {
    const {registerDialog} = useFluxStore();
    let unregister: Function | null = null;

    onMounted(() => {
        window.addEventListener('keydown', onKeyDown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', onKeyDown);
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
        const isVisible = children.length > 0 && children.some(child => typeof child.type !== 'symbol');
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

        return render(FluxTeleport, {
            props: {
                to: teleportTo
            },
            slots: {
                default: () => render(transition, {
                    slots: {
                        default: () => content
                    }
                })
            }
        });
    };
}
