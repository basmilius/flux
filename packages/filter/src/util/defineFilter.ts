import type { FluxTranslate } from '@flux-ui/internals';
import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';

export type FluxFilterDefinitionContext = {
    readonly translate: FluxTranslate;
};

export type FluxFilterDefinitionFactory<TProps = any, TValue extends FluxFilterValue = FluxFilterValue> =
    (props: TProps, context: FluxFilterDefinitionContext) => FluxFilterDefinition<TValue>;

export default function defineFilter<TProps, TValue extends FluxFilterValue = FluxFilterValue>(
    factory: FluxFilterDefinitionFactory<TProps, TValue>
): FluxFilterDefinitionFactory<TProps, TValue> {
    return factory;
}
