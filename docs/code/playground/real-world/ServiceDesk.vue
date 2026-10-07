<template>
    <FluxPane>
        <FluxPaneHeader
            icon="clipboard"
            subtitle="North depot · Facilities team"
            title="Incoming work">
            <template #after>
                <FluxBadge :label="`${requests.length} open`"/>
            </template>
        </FluxPaneHeader>

        <FluxPaneBody :class="$style.serviceDeskFrame">
            <FluxItemStack aria-live="polite">
                <FluxItem
                    v-for="request of requests"
                    :key="request.id">
                    <FluxItemMedia is-center>
                        <FluxIcon
                            :name="request.icon"
                            :size="18"/>
                    </FluxItemMedia>

                    <FluxItemContent>
                        <FluxText :weight="600">{{ request.title }}</FluxText>
                        <FluxText
                            color="muted"
                            size="small">
                            {{ request.reference }} · {{ request.location }}
                        </FluxText>
                    </FluxItemContent>

                    <FluxItemActions>
                        <FluxBadge
                            :color="request.color"
                            :label="request.kind"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>

            <FluxSpeedDial label="Create work">
                <FluxSpeedDialAction
                    icon="file-plus"
                    label="New request"
                    @click="addRequest('request')"/>
                <FluxSpeedDialAction
                    icon="triangle-exclamation"
                    label="Report incident"
                    @click="addRequest('incident')"/>
                <FluxSpeedDialAction
                    icon="calendar"
                    label="Plan site visit"
                    @click="addRequest('visit')"/>
            </FluxSpeedDial>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSpeedDial, FluxSpeedDialAction, FluxText, showSnackbar } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { ref } from 'vue';

    type RequestKind = 'request' | 'incident' | 'visit';
    type WorkRequest = {
        readonly id: number;
        readonly reference: string;
        readonly title: string;
        readonly location: string;
        readonly kind: string;
        readonly icon: FluxIconName;
        readonly color: FluxColor;
    };

    const REQUEST_TYPES: Record<RequestKind, Pick<WorkRequest, 'title' | 'kind' | 'icon' | 'color'>> = {
        request: {title: 'Replace the reception door closer', kind: 'Request', icon: 'screwdriver-wrench', color: 'info'},
        incident: {title: 'Water leak in the loading bay', kind: 'Incident', icon: 'triangle-exclamation', color: 'danger'},
        visit: {title: 'Inspect emergency lighting', kind: 'Site visit', icon: 'calendar', color: 'gray'}
    };

    const requests = ref<WorkRequest[]>([
        {id: 2481, reference: 'WO-2481', title: 'Replace lighting in the north hall', location: 'North hall', kind: 'Request', icon: 'screwdriver-wrench', color: 'info'},
        {id: 2482, reference: 'WO-2482', title: 'Loading gate does not close', location: 'Gate 4', kind: 'Incident', icon: 'triangle-exclamation', color: 'danger'},
        {id: 2483, reference: 'WO-2483', title: 'Quarterly safety inspection', location: 'Warehouse', kind: 'Site visit', icon: 'calendar', color: 'gray'}
    ]);

    let nextId = 2484;

    function addRequest(kind: RequestKind): void {
        const id = nextId++;
        const request = {...REQUEST_TYPES[kind], id, reference: `WO-${id}`, location: 'North depot'};
        requests.value.unshift(request);

        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: `${request.reference} added to the queue.`
        });
    }
</script>

<style
    lang="scss"
    module>
    .serviceDeskFrame {
        position: relative;
        min-height: 345px;
        padding-bottom: 96px;
        // Anchor the fixed dial to this example instead of the viewport.
        transform: translate(0);
    }
</style>
