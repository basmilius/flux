<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        color="primary"
                        name="folder"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent>
                    <strong>Quarterly report</strong>
                    <span style="font-size: .875rem; opacity: .6">Financial overview for Q1 2026, including revenue and forecasts.</span>

                    <div style="display: flex; gap: 6px; margin-top: 6px">
                        <FluxBadge label="PDF"/>
                        <FluxBadge
                            color="info"
                            label="Shared"/>
                    </div>
                </FluxItemContent>
            </FluxItem>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBoxedIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxPane } from '@flux-ui/components';
</script>
