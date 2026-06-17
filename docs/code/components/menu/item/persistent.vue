<template>
    <FluxFlyout>
        <template #opener="{ open }">
            <FluxSecondaryButton
                icon-leading="filter"
                :label="active.length ? `Filters (${active.length})` : 'Filters'"
                @click="open()"/>
        </template>

        <FluxMenu style="width: 220px">
            <FluxMenuGroup>
                <template v-for="filter of FILTERS">
                    <FluxMenuItem
                        is-persistent
                        is-selectable
                        :is-selected="active.includes(filter)"
                        :label="filter"
                        @click="toggle(filter)"/>
                </template>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="check"
                    label="Done"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const FILTERS = ['In stock', 'On sale', 'Featured'];

    const active = ref<string[]>([]);

    function toggle(filter: string): void {
        if (active.value.includes(filter)) {
            active.value = active.value.filter(value => value !== filter);
        } else {
            active.value = [...active.value, filter];
        }
    }
</script>
