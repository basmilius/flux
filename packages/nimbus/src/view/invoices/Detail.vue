<template>
    <FluxApplicationContent
        v-if="invoice"
        layout="default">
        <FluxFlex
            direction="vertical"
            :gap="18">
            <FluxBreadcrumb>
                <FluxBreadcrumbItem
                    icon="file-invoice-dollar"
                    label="Invoices"
                    :to="{name: 'invoices'}"/>
                <FluxBreadcrumbItem :label="invoice.number"/>
            </FluxBreadcrumb>

            <FluxTagStack v-if="invoice.tags.length > 0">
                <FluxTag
                    v-for="tag of invoice.tags"
                    :key="tag"
                    color="info"
                    :label="tag"/>
            </FluxTagStack>

            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxLayerPane>
                            <FluxPaneHeader
                                icon="receipt"
                                :title="`Invoice ${invoice.number}`">
                                <template #after>
                                    <StatusBadge :meta="INVOICE_STATUS[invoice.status]"/>
                                </template>
                            </FluxPaneHeader>

                            <FluxPane>
                                <FluxTable>
                                    <template #header>
                                        <FluxTableHeader>Description</FluxTableHeader>
                                        <FluxTableHeader is-shrinking>Qty</FluxTableHeader>
                                        <FluxTableHeader is-shrinking>Rate</FluxTableHeader>
                                        <FluxTableHeader is-shrinking>Amount</FluxTableHeader>
                                    </template>

                                    <FluxTableRow
                                        v-for="(line, index) of invoice.lines"
                                        :key="index">
                                        <FluxTableCell>{{ line.description }}</FluxTableCell>
                                        <FluxTableCell>{{ line.quantity }}</FluxTableCell>
                                        <FluxTableCell>{{ formatCurrency(line.rate) }}</FluxTableCell>
                                        <FluxTableCell>
                                            <FluxText tabular>{{ formatCurrency(line.quantity * line.rate) }}</FluxText>
                                        </FluxTableCell>
                                    </FluxTableRow>
                                </FluxTable>
                            </FluxPane>

                            <FluxPane>
                                <FluxPaneBody>
                                    <div class="summary">
                                        <div class="summary-row">
                                            <span>Subtotal</span>
                                            <FluxText tabular>{{ formatCurrency(subtotal) }}</FluxText>
                                        </div>
                                        <div class="summary-row">
                                            <span>VAT (21%)</span>
                                            <FluxText tabular>{{ formatCurrency(vat) }}</FluxText>
                                        </div>
                                        <div class="summary-row summary-total">
                                            <strong>Total</strong>
                                            <FluxText
                                                tabular
                                                tag="strong">{{ formatCurrency(total) }}</FluxText>
                                        </div>
                                    </div>
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxLayerPane>

                        <FluxNotice
                            v-if="invoice.notes"
                            icon="circle-info"
                            :message="invoice.notes"/>
                    </FluxFlex>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="4"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="circle-info"
                            title="Details"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxFlex
                                    direction="vertical"
                                    :gap="15">
                                    <FluxDescriptionList>
                                        <FluxDescriptionItem
                                            icon="handshake"
                                            label="Client">
                                            <FluxLink
                                                v-if="client"
                                                type="route"
                                                :to="{name: 'client', params: {id: client.id}}">
                                                {{ client.name }}
                                            </FluxLink>
                                            <span v-else>—</span>
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="diagram-project"
                                            label="Project">
                                            <FluxLink
                                                v-if="project"
                                                type="route"
                                                :to="{name: 'project', params: {id: project.id}}">
                                                {{ project.name }}
                                            </FluxLink>
                                            <span v-else>—</span>
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="calendar"
                                            label="Issued">
                                            {{ invoice.issueDate.toFormat('LLL d, yyyy') }}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="flag"
                                            label="Due">
                                            {{ invoice.dueDate.toFormat('LLL d, yyyy') }}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            v-if="invoice.paidAt"
                                            icon="circle-check"
                                            label="Paid">
                                            {{ invoice.paidAt.toFormat('LLL d, yyyy') }}
                                        </FluxDescriptionItem>
                                    </FluxDescriptionList>

                                    <FluxInfoStack>
                                        <FluxInfo icon="clock">Payment due within 30 days of the issue date.</FluxInfo>
                                        <FluxInfo icon="circle-info">A 2% late fee applies for each month overdue.</FluxInfo>
                                    </FluxInfoStack>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxFlex>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBreadcrumb, FluxBreadcrumbItem, FluxDescriptionItem, FluxDescriptionList, FluxFlex, FluxGrid, FluxGridColumn, FluxInfo, FluxInfoStack, FluxLayerPane, FluxLink, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTag, FluxTagStack, FluxText } from '@flux-ui/components';
    import { computed, watch } from 'vue';
    import { onBeforeRouteLeave, useRoute } from 'vue-router';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { invoiceTotal, useClientsStore, useInvoicesStore, useProjectsStore, useUiStore } from '@/store';
    import { formatCurrency, INVOICE_STATUS } from '@/util';

    const route = useRoute();
    const {getInvoice} = useInvoicesStore();
    const {getClient} = useClientsStore();
    const {getProject} = useProjectsStore();
    const {setIcon, setTitle} = useUiStore();

    const invoice = computed(() => getInvoice(String(route.params.id)));
    const client = computed(() => invoice.value ? getClient(invoice.value.clientId) : undefined);
    const project = computed(() => invoice.value?.projectId ? getProject(invoice.value.projectId) : undefined);

    const subtotal = computed(() => invoice.value ? invoiceTotal(invoice.value) : 0);
    const vat = computed(() => Math.round(subtotal.value * 0.21));
    const total = computed(() => subtotal.value + vat.value);

    watch(invoice, current => {
        if (current) {
            setIcon('file-invoice-dollar');
            setTitle(current.number);
        }
    }, {immediate: true});

    onBeforeRouteLeave(() => {
        setIcon();
        setTitle();
    });
</script>

<style scoped>
    .summary {
        display: flex;
        flex-flow: column;
        gap: 6px;
        margin-left: auto;
        width: min(280px, 100%);
    }

    .summary-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }

    .summary-total {
        padding-top: 9px;
        border-top: 1px solid var(--surface-stroke);
    }
</style>
