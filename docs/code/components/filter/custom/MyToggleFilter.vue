<template>
    <FluxMenuGroup>
        <FluxMenuItem
            is-selectable
            :is-selected="state[name] === true"
            label="Enabled"
            @click="onSelect(true)"/>

        <FluxMenuItem
            is-selectable
            :is-selected="state[name] === false"
            label="Disabled"
            @click="onSelect(false)"/>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import { defineFilter, FluxMenuGroup, FluxMenuItem, pickFilterCommon, useFilterInjection } from '@flux-ui/components';
    import type { FluxFilterSpec } from '@flux-ui/types';

    type Props = FluxFilterSpec;

    defineFilter<Props>(p => ({
        ...pickFilterCommon(p),
        type: 'toggle',
        async getValueLabel(value) {
            if (value === true) {
                return 'Enabled';
            }

            if (value === false) {
                return 'Disabled';
            }

            return null;
        }
    }));

    const {
        name
    } = defineProps<Props>();

    const {back, state, setValue} = useFilterInjection();

    function onSelect(value: boolean): void {
        setValue(name, value);
        back();
    }
</script>
