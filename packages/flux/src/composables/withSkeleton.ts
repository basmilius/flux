import type { Component } from 'vue-demi';
import { defineComponent } from 'vue-demi';
import { render } from '../utils';
import { useSkeletonsInjection } from './useSkeletonsInjection';

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
