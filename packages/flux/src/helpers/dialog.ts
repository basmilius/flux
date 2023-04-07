import type { Component, RenderFunction, Slots } from 'vue-demi';
import { h, VNode } from 'vue-demi';
import { FluxTeleport } from '../components';
import { flattenVNodeTree, render } from '../utils';

export function createDialogRenderer(slots: Slots, className: string, transitionComponent: Component, teleportTo: string = '[data-flux-root]'): RenderFunction {
    return () => {
        const children = flattenVNodeTree(slots.default?.() ?? []);
        const isVisible = children.length > 0 && children.some(child => typeof child.type !== 'symbol');
        const content: VNode[] = [];

        if (isVisible) {
            content.push(h('div', {
                class: className
            }, children));
        }

        return render(FluxTeleport, {
            props: {
                to: teleportTo
            },
            slots: {
                default: () => render(transitionComponent, {
                    slots: {
                        default: () => content
                    }
                })
            }
        });
    };
}
