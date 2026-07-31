<template>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuSubHeader label="Columns"/>

            <FluxMenuGroup>
                <FluxMenuCheckbox
                    v-for="column of columns"
                    :key="column.label"
                    v-model="column.isVisible"
                    :label="column.label"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuCheckbox, FluxMenuGroup, FluxMenuSubHeader, FluxPane } from '@flux-ui/components';
    import { reactive } from 'vue';

    const columns = reactive([
        {label: 'Name', isVisible: true},
        {label: 'Status', isVisible: true},
        {label: 'Owner', isVisible: false},
        {label: 'Last modified', isVisible: true}
    ]);
</script>
