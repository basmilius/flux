import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
import type { FluxFilterTranslate } from '~flux/filter/data';

export type FluxFilterDefinitionContext = {
    readonly translate: FluxFilterTranslate;
};

export type FluxFilterDefinitionFactory<TProps = any, TValue extends FluxFilterValue = FluxFilterValue> =
    (props: TProps, context: FluxFilterDefinitionContext) => FluxFilterDefinition<TValue>;

export default function defineFilter<TProps, TValue extends FluxFilterValue = FluxFilterValue>(
    factory: FluxFilterDefinitionFactory<TProps, TValue>
): FluxFilterDefinitionFactory<TProps, TValue> {
    return factory;
}
