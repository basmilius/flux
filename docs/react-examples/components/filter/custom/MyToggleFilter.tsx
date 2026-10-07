import {defineFilter, FluxMenuGroup, FluxMenuItem, pickFilterCommon, useFilterInjection, type FluxFilterSpec} from '@flux-ui/react';

export default function MyToggleFilter({name}: FluxFilterSpec) {
    const {back, state, setValue} = useFilterInjection();
    function select(value: boolean) {setValue(name, value); back();}
    return <FluxMenuGroup>
        <FluxMenuItem isSelectable isSelected={state[name] === true} label="Enabled" onClick={() => select(true)} />
        <FluxMenuItem isSelectable isSelected={state[name] === false} label="Disabled" onClick={() => select(false)} />
    </FluxMenuGroup>;
}

MyToggleFilter.filterDefinition = defineFilter<FluxFilterSpec>(props => ({
    ...pickFilterCommon(props),
    type: 'toggle',
    async getValueLabel(value) {return value === true ? 'Enabled' : value === false ? 'Disabled' : null;}
}));
