import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';

export type FluxFilterDefinitionFactory<TProps = any, TValue extends FluxFilterValue = FluxFilterValue> =
    (props: TProps) => FluxFilterDefinition<TValue>;

export default function defineFilter<TProps, TValue extends FluxFilterValue = FluxFilterValue>(
    factory: FluxFilterDefinitionFactory<TProps, TValue>
): FluxFilterDefinitionFactory<TProps, TValue> {
    return factory;
}
