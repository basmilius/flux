<template>
    <FluxPane>
        <FluxPaneHeader
            icon="box"
            subtitle="Acme Workshop · Ordered 29 September 2026"
            title="Order #SO-1048"/>

        <FluxPaneBody>
            <FluxDescriptionList direction="horizontal">
                <FluxDescriptionItem label="Total">€ 1,240.00</FluxDescriptionItem>
                <FluxDescriptionItem label="Items">8 items</FluxDescriptionItem>
                <FluxDescriptionItem label="Status">
                    <FluxBadge
                        :color="isDispatched ? 'success' : 'warning'"
                        :label="isDispatched ? 'Dispatched' : 'Ready to ship'"/>
                </FluxDescriptionItem>
            </FluxDescriptionList>
        </FluxPaneBody>

        <FluxPaneBody>
            <FluxDescriptionList
                :label-width="150"
                title="Fulfilment">
                <FluxDescriptionItem
                    icon="building"
                    label="Customer">
                    Acme Workshop
                </FluxDescriptionItem>
                <FluxDescriptionItem
                    icon="file-lines"
                    label="Reference">
                    PO-2026-0912
                </FluxDescriptionItem>
                <FluxDescriptionItem
                    icon="truck"
                    label="Shipping">
                    Express · Delivery on 2 October
                </FluxDescriptionItem>
                <FluxDescriptionItem
                    icon="user"
                    label="Contact">
                    <FluxLink
                        href="mailto:orders@example.com"
                        label="orders@example.com"/>
                </FluxDescriptionItem>
            </FluxDescriptionList>
        </FluxPaneBody>

        <FluxPaneBody>
            <FluxDescriptionList title="Delivery">
                <FluxDescriptionItem
                    icon="location-dot"
                    is-stacked
                    label="Address">
                    <FluxFlex
                        direction="vertical"
                        :gap="0">
                        <FluxText>Acme Workshop, receiving desk</FluxText>
                        <FluxText>Industrieweg 24, 3542 AD Utrecht</FluxText>
                    </FluxFlex>
                </FluxDescriptionItem>
                <FluxDescriptionItem
                    icon="clock"
                    label="Receiving hours">
                    08:00–16:30
                </FluxDescriptionItem>
                <FluxDescriptionItem
                    icon="file-lines"
                    is-stacked
                    label="Delivery instructions">
                    Use gate 2 and call the receiving desk before unloading. The forklift is available until 16:00.
                </FluxDescriptionItem>
            </FluxDescriptionList>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSpacer/>
            <FluxPrimaryButton
                :disabled="isDispatched"
                icon-leading="truck"
                :label="isDispatched ? 'Dispatched' : 'Mark as dispatched'"
                @click="dispatch"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxFlex, FluxLink, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSpacer, FluxText, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const isDispatched = ref(false);

    function dispatch(): void {
        isDispatched.value = true;
        showSnackbar({color: 'success', icon: 'circle-check', message: 'Order SO-1048 marked as dispatched.'});
    }
</script>
