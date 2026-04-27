<template>
    <Preview>
        <FluxPane style="width: min(100%, 540px)">
            <FluxTable>
                <template #header>
                    <FluxTableRow>
                        <FluxTableHeader>Name</FluxTableHeader>
                        <FluxTableHeader>Status</FluxTableHeader>
                    </FluxTableRow>
                </template>

                <FluxTableBar>
                    <FluxStack
                        direction="horizontal"
                        :gap="9"
                        is-centered>
                        <FluxIcon name="circle-info"/>
                        <span>3 items match the current filter.</span>
                    </FluxStack>
                </FluxTableBar>

                <FluxTableRow>
                    <FluxTableCell>Project Aurora</FluxTableCell>
                    <FluxTableCell><FluxBadge
                        color="success"
                        label="Active"/></FluxTableCell>
                </FluxTableRow>

                <FluxTableRow>
                    <FluxTableCell>Project Borealis</FluxTableCell>
                    <FluxTableCell><FluxBadge
                        color="success"
                        label="Active"/></FluxTableCell>
                </FluxTableRow>

                <FluxTableRow>
                    <FluxTableCell>Project Cinder</FluxTableCell>
                    <FluxTableCell><FluxBadge
                        color="warning"
                        label="Paused"/></FluxTableCell>
                </FluxTableRow>
            </FluxTable>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxIcon, FluxPane, FluxStack, FluxTable, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
