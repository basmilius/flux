<template>
    <FluxPane>
        <FluxPaneHeader
            icon="receipt"
            subtitle="INV-2026-0184 · € 2,460.00 · Due 14 October"
            title="Maintenance invoice">
            <template #after>
                <FluxBadge
                    :color="isApproved ? 'success' : 'warning'"
                    :label="isApproved ? 'Approved' : 'Awaiting approval'"/>
            </template>
        </FluxPaneHeader>

        <FluxPaneBody>
            <FluxFlex
                align="center"
                :gap="18">
                <FluxProgressRing
                    v-slot="{progress}"
                    :color="isApproved ? 'success' : 'primary'"
                    label="Approval checklist"
                    :size="72"
                    :value="isApproved ? 1 : 0.75">
                    <FluxText
                        size="small"
                        :weight="600">
                        {{ progress }}
                    </FluxText>
                </FluxProgressRing>

                <FluxFlex
                    direction="vertical"
                    :gap="3">
                    <FluxText :weight="600">{{ isApproved ? '4 of 4 checks complete' : '3 of 4 checks complete' }}</FluxText>
                    <FluxText
                        color="muted"
                        size="small">
                        Purchase order, delivery and amount verified.
                    </FluxText>

                    <FluxHoverCard label="Supplier contact">
                        <template #opener>
                            <FluxSecondaryButton
                                icon-leading="building"
                                label="Noord Services"/>
                        </template>

                        <FluxText :weight="600">Noord Services</FluxText>
                        <FluxText
                            color="muted"
                            size="small">
                            Anouk Vermeer · Account manager
                        </FluxText>
                        <FluxLink
                            href="mailto:anouk@example.com"
                            label="anouk@example.com"/>
                        <FluxText size="small">Supplier since 2021 · Payment term 14 days</FluxText>
                    </FluxHoverCard>
                </FluxFlex>
            </FluxFlex>
        </FluxPaneBody>

        <FluxPaneBody>
            <FluxDescriptionList title="Delivery note">
                <FluxDescriptionItem
                    is-stacked
                    label="Inspection report">
                    <FluxReadMore :lines="2">
                        The team replaced twelve emergency light fittings in the north hall and tested the battery backup after installation. Two damaged mounting brackets were replaced under the existing service agreement at no extra charge. All fittings passed the ninety-minute discharge test. The old units have been collected for recycling, and the inspection report is attached to the work order. The next scheduled inspection is in March 2027.
                    </FluxReadMore>
                </FluxDescriptionItem>
            </FluxDescriptionList>
        </FluxPaneBody>

        <FluxPaneBody>
            <FluxActivityFeed>
                <FluxActivityFeedItem
                    actor="Anouk Vermeer"
                    avatar-fallback-initials="AV"
                    date-time="2026-10-01T09:12:00+02:00"
                    when="09:12">
                    submitted the invoice.
                </FluxActivityFeedItem>
                <FluxActivityFeedItem
                    actor="Koen Doorn"
                    avatar-fallback-initials="KD"
                    date-time="2026-10-01T10:04:00+02:00"
                    when="10:04">
                    verified the delivery.
                    <template #details>All twelve fittings match purchase order PO-0982.</template>
                </FluxActivityFeedItem>
                <FluxActivityFeedItem
                    v-if="isApproved"
                    color="success"
                    icon="circle-check"
                    when="Just now">
                    You approved the invoice for payment.
                </FluxActivityFeedItem>
            </FluxActivityFeed>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSecondaryButton
                v-if="isApproved"
                icon-leading="rotate-left"
                label="Reset example"
                @click="isApproved = false"/>
            <FluxSpacer/>
            <FluxPopConfirm
                confirm-label="Approve invoice"
                icon="circle-check"
                message="Approve € 2,460.00 for payment to Noord Services?"
                title="Approve payment"
                @confirm="approve">
                <template #opener="{toggle}">
                    <FluxPrimaryButton
                        :disabled="isApproved"
                        icon-leading="circle-check"
                        :label="isApproved ? 'Approved' : 'Approve payment'"
                        @click="toggle"/>
                </template>
            </FluxPopConfirm>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxActivityFeed, FluxActivityFeedItem, FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxFlex, FluxHoverCard, FluxLink, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPopConfirm, FluxPrimaryButton, FluxProgressRing, FluxReadMore, FluxSecondaryButton, FluxSpacer, FluxText, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const isApproved = ref(false);

    function approve(): void {
        isApproved.value = true;
        showSnackbar({color: 'success', icon: 'circle-check', message: 'Invoice INV-2026-0184 approved for payment.'});
    }
</script>
