<template>
    <FluxApplicationContent
        v-if="invoice"
        layout="default">
        <FluxBreadcrumb class="crumbs">
            <FluxBreadcrumbItem
                icon="file-invoice-dollar"
                label="Invoices"
                :to="{name: 'invoices'}"/>
            <FluxBreadcrumbItem :label="invoice.number"/>
        </FluxBreadcrumb>

        <FluxTagStack
            v-if="invoice.tags.length > 0"
            class="tags">
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
                                    <span class="amount">{{ formatCurrency(line.quantity * line.rate) }}</span>
                                </FluxTableCell>
                            </FluxTableRow>
                        </FluxTable>
                    </FluxPane>

                    <FluxPane>
                        <FluxPaneBody>
                            <div class="summary">
                                <div class="summary-row">
                                    <span>Subtotal</span>
                                    <span class="amount">{{ formatCurrency(subtotal) }}</span>
                                </div>
                                <div class="summary-row">
                                    <span>VAT (21%)</span>
                                    <span class="amount">{{ formatCurrency(vat) }}</span>
                                </div>
                                <div class="summary-row summary-total">
                                    <strong>Total</strong>
                                    <strong class="amount">{{ formatCurrency(total) }}</strong>
                                </div>
                            </div>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxLayerPane>

                <FluxNotice
                    v-if="invoice.notes"
                    class="block"
                    icon="circle-info"
                    :message="invoice.notes"/>
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
                            <FluxDescriptionList>
                                <FluxDescriptionItem
                                    icon="handshake"
                                    label="Client">
                                    <RouterLink
                                        v-if="client"
                                        class="link"
                                        :to="{name: 'client', params: {id: client.id}}">
                                        {{ client.name }}
                                    </RouterLink>
                                    <span v-else>—</span>
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="diagram-project"
                                    label="Project">
                                    <RouterLink
                                        v-if="project"
                                        class="link"
                                        :to="{name: 'project', params: {id: project.id}}">
                                        {{ project.name }}
                                    </RouterLink>
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

                            <FluxInfoStack class="info">
                                <FluxInfo icon="clock">Payment due within 30 days of the issue date.</FluxInfo>
                                <FluxInfo icon="circle-info">A 2% late fee applies for each month overdue.</FluxInfo>
                            </FluxInfoStack>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxLayerPane>
            </FluxGridColumn>
        </FluxGrid>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBreadcrumb, FluxBreadcrumbItem, FluxDescriptionItem, FluxDescriptionList, FluxGrid, FluxGridColumn, FluxInfo, FluxInfoStack, FluxLayerPane, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTag, FluxTagStack } from '@flux-ui/components';
    import { computed, watch } from 'vue';
    import { onBeforeRouteLeave, RouterLink, useRoute } from 'vue-router';
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
    .crumbs {
        margin-bottom: 18px;
    }

    .tags {
        margin-bottom: 18px;
    }

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

    .info {
        margin-top: 15px;
    }

    .block {
        margin-top: 18px;
    }

    .link {
        color: var(--primary-500);
        text-decoration: none;
    }

    .amount {
        font-variant-numeric: tabular-nums;
    }
</style>
