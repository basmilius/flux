<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuCollapsible
                href="#reports"
                icon-leading="chart-line"
                label="Reports">
                <FluxMenuItem
                    href="#reports/monthly"
                    label="Monthly"
                    type="link"/>

                <FluxMenuItem
                    href="#reports/quarterly"
                    label="Quarterly"
                    type="link"/>
            </FluxMenuCollapsible>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuCollapsible, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
