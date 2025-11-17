<template>
    <FluxGrid
        :columns="5">
        <FluxGridColumn
            :xs="1"
            v-for="(pane, index) in panes"
            v-show="!pane.isHidden"
            :key="index">
            <FluxPane>
                <FluxRemove
                    :is-hidden="index === 0"
                    @click="pane.isHidden = true"/>
                <FluxPaneBody style="display: flex; justify-content: center;">
                    {{ pane.title }}
                </FluxPaneBody>
            </FluxPane>
        </FluxGridColumn>
    </FluxGrid>
</template>

<script
    setup
    lang="ts">
    import { FluxGrid, FluxGridColumn, FluxPane, FluxPaneBody, FluxRemove } from '@flux-ui/components';
    import { ref } from 'vue';

    const panes = ref([
        { title: 'Pane 1', isHidden: false },
        { title: 'Pane 2', isHidden: false },
        { title: 'Pane 3', isHidden: false },
        { title: 'Pane 4', isHidden: false },
        { title: 'Pane 5', isHidden: false }
    ]);
</script>
