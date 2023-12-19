import type { VNode } from 'vue';

export default function (component: ExtendedVNode): string {
    let name = 'FluxUnknown';

    if (component.type && component.type.__name) {
        name = component.type.__name;
    }

    return name;
}

type ExtendedVNode = {
    readonly type: VNode['type'] & {
        readonly __name?: string;
    };
}
