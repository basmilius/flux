import type { Component } from 'vue-demi';
import { defineComponent } from 'vue-demi';
import { useSkeletonsInjection } from '../composables';
import { render } from '../utils';

export function withSkeleton<TComponent extends Component>(component: TComponent): TComponent {
    return defineComponent(() => {
        const {isEnabled} = useSkeletonsInjection();

        return () => render(component, {
            attrs: {
                class: isEnabled.value ? 'is-skeleton' : undefined
            }
        });
    }) as TComponent;
}
