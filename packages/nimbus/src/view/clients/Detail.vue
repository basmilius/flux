<template>
    <FluxApplicationContent
        v-if="client"
        layout="default">
        <FluxFlex
            direction="vertical"
            :gap="18">
            <FluxBreadcrumb>
                <FluxBreadcrumbItem
                    icon="handshake"
                    label="Clients"
                    :to="{name: 'clients'}"/>
                <FluxBreadcrumbItem :label="client.name"/>
            </FluxBreadcrumb>

            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxLayerPane>
                            <FluxPaneHeader
                                icon="diagram-project"
                                title="Projects">
                                <template #after>
                                    <FluxText
                                        color="muted"
                                        size="small">{{ clientProjects.length }} total</FluxText>
                                </template>
                            </FluxPaneHeader>

                            <template v-if="clientProjects.length > 0">
                                <FluxClickablePane
                                    v-for="project of clientProjects"
                                    :key="project.id"
                                    type="route"
                                    variant="flat"
                                    :to="{name: 'project', params: {id: project.id}}">
                                    <FluxItem>
                                        <FluxItemMedia
                                            is-center
                                            :size="40">
                                            <FluxBoxedIcon
                                                :color="project.color"
                                                :name="project.icon"
                                                :size="40"/>
                                        </FluxItemMedia>
                                        <FluxItemContent is-center>
                                            <strong>{{ project.name }}</strong>
                                            <span>{{ project.progress }}% complete</span>
                                        </FluxItemContent>
                                        <FluxItemActions is-center>
                                            <StatusBadge :meta="PROJECT_STATUS[project.status]"/>
                                        </FluxItemActions>
                                    </FluxItem>
                                </FluxClickablePane>
                            </template>

                            <FluxPane v-else>
                                <FluxPaneBody>
                                    <FluxFlex
                                        align="center"
                                        direction="vertical"
                                        :gap="12">
                                        <FluxPlaceholder
                                            icon="diagram-project"
                                            message="This client has no projects yet."
                                            title="No projects"
                                            variant="small"/>
                                        <FluxPrimaryLinkButton
                                            icon-leading="circle-plus"
                                            label="New project"
                                            type="route"
                                            :to="{name: 'project-new'}"/>
                                    </FluxFlex>
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxLayerPane>

                        <FluxLayerPane>
                            <FluxPaneHeader
                                icon="file-invoice-dollar"
                                title="Invoices"/>
                            <FluxPane>
                                <FluxItemStack v-if="clientInvoices.length > 0">
                                    <FluxItem
                                        v-for="invoice of clientInvoices"
                                        :key="invoice.id">
                                        <FluxItemMedia
                                            is-center
                                            :size="36">
                                            <FluxBoxedIcon
                                                :color="INVOICE_STATUS[invoice.status].color"
                                                name="receipt"
                                                :size="36"/>
                                        </FluxItemMedia>
                                        <FluxItemContent is-center>
                                            <strong>{{ invoice.number }}</strong>
                                            <span>Due {{ invoice.dueDate.toFormat('LLL d, yyyy') }}</span>
                                        </FluxItemContent>
                                        <FluxItemActions is-center>
                                            <FluxText
                                                tabular
                                                :weight="500">{{ formatCurrency(invoiceTotal(invoice)) }}</FluxText>
                                            <StatusBadge :meta="INVOICE_STATUS[invoice.status]"/>
                                            <FluxAction
                                                icon="arrow-right"
                                                type="route"
                                                :to="{name: 'invoice', params: {id: invoice.id}}"/>
                                        </FluxItemActions>
                                    </FluxItem>
                                </FluxItemStack>
                                <FluxPaneBody v-else>
                                    <FluxText
                                        color="muted"
                                        size="small"
                                        tag="div">No invoices for this client.</FluxText>
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxLayerPane>
                    </FluxFlex>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="4"
                    :xs="12">
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxLayerPane>
                            <FluxItem class="card-header">
                                <FluxItemMedia
                                    is-center
                                    :size="48">
                                    <FluxBoxedIcon
                                        :color="client.color"
                                        name="building"
                                        :size="48"/>
                                </FluxItemMedia>
                                <FluxItemContent is-center>
                                    <strong>{{ client.name }}</strong>
                                    <span>{{ client.contactName }}</span>
                                </FluxItemContent>
                                <FluxItemActions is-center>
                                    <StatusBadge :meta="CLIENT_STATUS[client.status]"/>
                                </FluxItemActions>
                            </FluxItem>

                            <FluxPane>
                                <FluxPaneBody>
                                    <FluxDescriptionList>
                                        <FluxDescriptionItem
                                            icon="at"
                                            label="Email">
                                            <FluxLink
                                                type="link"
                                                :href="`mailto:${client.email}`">{{ client.email }}</FluxLink>
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="phone"
                                            label="Phone">
                                            {{ client.phone }}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="location-dot"
                                            label="Location">
                                            {{ client.city }}, {{ client.country }}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="tag"
                                            label="Industry">
                                            {{ client.industry }}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon="calendar"
                                            label="Client since">
                                            {{ client.since.toFormat('LLLL yyyy') }}
                                        </FluxDescriptionItem>
                                    </FluxDescriptionList>
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxLayerPane>

                        <FluxLayerPane>
                            <FluxPaneHeader
                                icon="bolt"
                                title="Quick actions"/>
                            <FluxActionPane pane-variant="well">
                                <FluxActionStack>
                                    <FluxTooltip content="New project">
                                        <FluxAction
                                            icon="diagram-project"
                                            type="route"
                                            :to="{name: 'project-new'}"/>
                                    </FluxTooltip>
                                    <FluxTooltip content="New invoice">
                                        <FluxAction
                                            icon="file-invoice-dollar"
                                            type="route"
                                            :to="{name: 'invoice-new'}"/>
                                    </FluxTooltip>
                                    <FluxTooltip content="Email client">
                                        <FluxAction
                                            icon="envelope"
                                            type="link"
                                            :href="`mailto:${client.email}`"/>
                                    </FluxTooltip>
                                </FluxActionStack>
                            </FluxActionPane>
                        </FluxLayerPane>
                    </FluxFlex>
                </FluxGridColumn>
            </FluxGrid>
        </FluxFlex>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxAction, FluxActionPane, FluxActionStack, FluxBoxedIcon, FluxBreadcrumb, FluxBreadcrumbItem, FluxClickablePane, FluxDescriptionItem, FluxDescriptionList, FluxFlex, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxLink, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPlaceholder, FluxPrimaryLinkButton, FluxText, FluxTooltip } from '@flux-ui/components';
    import { computed, watch } from 'vue';
    import { onBeforeRouteLeave, useRoute } from 'vue-router';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { invoiceTotal, useClientsStore, useInvoicesStore, useUiStore } from '@/store';
    import { CLIENT_STATUS, formatCurrency, INVOICE_STATUS, PROJECT_STATUS } from '@/util';

    const route = useRoute();
    const {getClient, projectsForClient} = useClientsStore();
    const {invoicesForClient} = useInvoicesStore();
    const {setIcon, setTitle} = useUiStore();

    const client = computed(() => getClient(String(route.params.id)));
    const clientProjects = computed(() => client.value ? projectsForClient(client.value.id) : []);
    const clientInvoices = computed(() => client.value ? invoicesForClient(client.value.id) : []);

    watch(client, current => {
        if (current) {
            setIcon('handshake');
            setTitle(current.name);
        }
    }, {immediate: true});

    onBeforeRouteLeave(() => {
        setIcon();
        setTitle();
    });
</script>

<style scoped>
    .card-header {
        padding: 15px 18px;
    }
</style>
