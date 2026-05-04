import type { FluxFilterOptionHeader, FluxFilterOptionItem, FluxFilterSpec, FluxFilterValueSingle } from '@flux-ui/types';
import type { FluxTranslate } from '~flux/components/data';

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}

export function pickFilterCommon<T extends FluxFilterSpec>(props: T): FluxFilterSpec {
    return {
        name: props.name,
        label: props.label,
        icon: props.icon,
        disabled: props.disabled,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onClear: props.onClear
    };
}

export function generateMultiOptionsLabel(translate: FluxTranslate, options: FluxFilterOptionItem[], values: FluxFilterValueSingle[]): string | null {
    const selected = options.filter(o => values.includes(o.value)).length;

    if (selected <= 0) {
        return null;
    }

    if (selected === 1) {
        return options.find(o => values.includes(o.value))!.label;
    }

    return translate('flux.nSelected', {
        n: selected
    });
}
