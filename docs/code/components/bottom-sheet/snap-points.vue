<template>
    <FluxSecondaryButton
        icon-leading="location-dot"
        label="Nearby stations"
        @click="isSheetOpened = true"/>

    <FluxBottomSheet
        is-closeable
        :snap-points="[.4, .9]"
        @close="isSheetOpened = false">
        <FluxPane v-if="isSheetOpened">
            <FluxPaneHeader
                subtitle="Within 500 meters"
                title="Nearby stations"/>

            <FluxItemStack>
                <FluxItem
                    v-for="station of stations"
                    :key="station.name">
                    <FluxItemContent>
                        <strong>{{ station.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ station.distance }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxBadge :label="station.bikes"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </FluxBottomSheet>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBottomSheet, FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxPane, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const stations = [
        {name: 'Central Square', distance: '80 m', bikes: '12 bikes'},
        {name: 'Harbor Front', distance: '210 m', bikes: '4 bikes'},
        {name: 'Museum Park', distance: '340 m', bikes: '9 bikes'},
        {name: 'Old Town Gate', distance: '390 m', bikes: '2 bikes'},
        {name: 'Riverside', distance: '460 m', bikes: '15 bikes'},
        {name: 'North Terminal', distance: '480 m', bikes: '7 bikes'}
    ];

    const isSheetOpened = ref(false);
</script>
