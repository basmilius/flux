<template>
    <FluxOverlay
        is-closeable
        size="large"
        @close="goBack">
        <FluxPane>
            <FluxPaneHeader
                icon="receipt"
                :subtitle="isEdit ? 'Update the invoice details' : 'Draft a new invoice'"
                :title="isEdit ? `Edit ${existing?.number}` : 'New invoice'"/>

            <FluxPaneBody>
                <FluxForm @submit="save">
                    <FluxFormSection title="Details">
                        <FluxFormRow>
                            <FluxFormField label="Client">
                                <FluxFormSelectAsync
                                    v-model="form.clientId"
                                    :fetch-options="fetchClientOptions"
                                    :fetch-relevant="fetchRelevantClients"
                                    :fetch-search="fetchSearchClients"
                                    placeholder="Search a client…"/>
                            </FluxFormField>
                            <FluxFormField label="Project">
                                <FluxFormSelect
                                    v-model="form.projectId"
                                    :options="projectOptions"
                                    placeholder="Optional"/>
                            </FluxFormField>
                        </FluxFormRow>

                        <FluxFormRow>
                            <FluxFormField label="Issue date">
                                <FluxFormDateInput v-model="form.issueDate"/>
                            </FluxFormField>
                            <FluxFormField label="Due date">
                                <FluxFormDateInput
                                    v-model="form.dueDate"
                                    :min="form.issueDate ?? undefined"/>
                            </FluxFormField>
                            <FluxFormField label="Status">
                                <FluxFormSelect
                                    v-model="form.status"
                                    :options="statusOptions"/>
                            </FluxFormField>
                        </FluxFormRow>
                    </FluxFormSection>

                    <FluxFormSection title="Line items">
                        <FluxFlex
                            direction="vertical"
                            :gap="9">
                            <FluxFormGrid
                                v-for="(line, index) of form.lines"
                                :key="index"
                                :columns="4">
                                <FluxFormColumn>
                                    <FluxFormField :label="index === 0 ? 'Description' : undefined">
                                        <FluxFormInput
                                            v-model="line.description"
                                            placeholder="e.g. Design sprint"/>
                                    </FluxFormField>
                                </FluxFormColumn>
                                <FluxFormColumn>
                                    <FluxFormField :label="index === 0 ? 'Qty' : undefined">
                                        <FluxQuantitySelector
                                            v-model="line.quantity"
                                            :min="1"/>
                                    </FluxFormField>
                                </FluxFormColumn>
                                <FluxFormColumn>
                                    <FluxFormField :label="index === 0 ? 'Rate' : undefined">
                                        <FluxFormNumberInput
                                            v-model="line.rate"
                                            :min="0"
                                            :step="5"/>
                                    </FluxFormField>
                                </FluxFormColumn>
                                <FluxFormColumn>
                                    <div :class="['line-remove', index === 0 && 'line-remove-head']">
                                        <FluxRemove @click="removeLine(index)"/>
                                    </div>
                                </FluxFormColumn>
                            </FluxFormGrid>
                        </FluxFlex>

                        <FluxFormField>
                            <FluxFormFieldAddition
                                icon="circle-info"
                                mode="hint"
                                :message="`Total: ${formatCurrency(total)}`"/>
                        </FluxFormField>

                        <FluxButtonStack>
                            <FluxSecondaryButton
                                icon-leading="plus"
                                label="Add line"
                                @click="addLine()"/>
                        </FluxButtonStack>
                    </FluxFormSection>

                    <FluxFormSection title="Extras">
                        <FluxFormField label="Tags">
                            <FluxFormTagsInput
                                v-model="form.tags"
                                placeholder="Add a tag"
                                :suggestions="tagSuggestions"/>
                        </FluxFormField>

                        <FluxFormField label="Notes">
                            <FluxFormTextArea
                                v-model="form.notes"
                                placeholder="Visible to the client on the invoice"/>
                        </FluxFormField>

                        <FluxFormField label="Attachment">
                            <FluxDropZone
                                accept="application/pdf"
                                @select="onAttach">
                                <template #default="{showPicker}">
                                    <FluxPlaceholder
                                        icon="paperclip"
                                        is-button
                                        title="Attach a PDF"
                                        variant="small"
                                        @click="showPicker()"/>
                                </template>
                            </FluxDropZone>
                        </FluxFormField>
                    </FluxFormSection>
                </FluxForm>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"
                    @click="goBack()"/>
                <FluxSpacer/>
                <FluxButtonStack>
                    <FluxPrimaryButton
                        :disabled="form.clientId === null"
                        icon-leading="circle-check"
                        :label="isEdit ? 'Save invoice' : 'Create invoice'"
                        @click="save()"/>
                </FluxButtonStack>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDropZone, FluxFlex, FluxForm, FluxFormColumn, FluxFormDateInput, FluxFormField, FluxFormFieldAddition, FluxFormGrid, FluxFormInput, FluxFormNumberInput, FluxFormSection, FluxFormSelect, FluxFormSelectAsync, FluxFormTagsInput, FluxFormTextArea, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPlaceholder, FluxPrimaryButton, FluxQuantitySelector, FluxRemove, FluxSecondaryButton, FluxSpacer, showSnackbar } from '@flux-ui/components';
    import type { FluxFormSelectEntry, FluxFormSelectOption, FluxFormSelectValue, FluxFormSelectValueSingle } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, reactive, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useClientsStore, useInvoicesStore, useProjectsStore } from '@/store';
    import type { InvoiceStatus } from '@/types';
    import { formatCurrency } from '@/util';

    type LineDraft = { description: string; quantity: number; rate: number | null };

    const router = useRouter();
    const {clients, getClient} = useClientsStore();
    const {projects} = useProjectsStore();
    const {getInvoice, createInvoice, updateInvoice} = useInvoicesStore();

    const isEdit = computed(() => router.currentRoute.value.name === 'invoice-edit');
    const existing = computed(() => isEdit.value ? getInvoice(String(router.currentRoute.value.params.id)) : undefined);

    const form = reactive({
        clientId: null as FluxFormSelectValue,
        projectId: null as FluxFormSelectValue,
        issueDate: DateTime.now() as DateTime | null,
        dueDate: DateTime.now().plus({days: 30}) as DateTime | null,
        status: 'draft' as FluxFormSelectValue,
        tags: [] as string[],
        notes: '',
        lines: [{description: '', quantity: 1, rate: 100}] as LineDraft[]
    });

    const statusOptions: FluxFormSelectOption[] = [
        {label: 'Draft', value: 'draft'},
        {label: 'Sent', value: 'sent'},
        {label: 'Paid', value: 'paid'},
        {label: 'Overdue', value: 'overdue'}
    ];

    const tagSuggestions: FluxFormSelectOption[] = ['design', 'development', 'consultancy', 'hosting', 'support', 'retainer'].map(label => ({label, value: label}));

    const projectOptions = computed<FluxFormSelectOption[]>(() => {
        const clientId = form.clientId ? String(form.clientId) : null;
        return projects.value
            .filter(project => clientId === null || project.clientId === clientId)
            .map(project => ({label: project.name, value: project.id, icon: project.icon}));
    });

    const total = computed(() => form.lines.reduce((sum, line) => sum + line.quantity * (line.rate ?? 0), 0));

    watch(existing, invoice => {
        if (invoice) {
            form.clientId = invoice.clientId;
            form.projectId = invoice.projectId;
            form.issueDate = invoice.issueDate;
            form.dueDate = invoice.dueDate;
            form.status = invoice.status;
            form.tags = [...invoice.tags];
            form.notes = invoice.notes;
            form.lines = invoice.lines.map(line => ({...line}));
        }
    }, {immediate: true});

    function delay(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 220));
    }

    function clientEntry(id: string): FluxFormSelectOption {
        return {label: getClient(id)?.name ?? id, value: id, icon: 'handshake'};
    }

    async function fetchRelevantClients(): Promise<FluxFormSelectEntry[]> {
        await delay();
        return clients.value.slice(0, 8).map(client => clientEntry(client.id));
    }

    async function fetchSearchClients(query: string): Promise<FluxFormSelectEntry[]> {
        await delay();
        return clients.value
            .filter(client => client.name.toLowerCase().includes(query.toLowerCase()))
            .map(client => clientEntry(client.id));
    }

    async function fetchClientOptions(ids: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]> {
        return ids.filter((id): id is string | number => id !== null).map(id => clientEntry(String(id)));
    }

    function addLine(): void {
        form.lines.push({description: '', quantity: 1, rate: 100});
    }

    function removeLine(index: number): void {
        form.lines.splice(index, 1);

        if (form.lines.length === 0) {
            addLine();
        }
    }

    function onAttach(file: File): void {
        showSnackbar({icon: 'paperclip', message: `Attached “${file.name}” (not stored in this demo).`});
    }

    function goBack(): void {
        router.push(isEdit.value && existing.value ? {name: 'invoice', params: {id: existing.value.id}} : {name: 'invoices'});
    }

    async function save(): Promise<void> {
        if (form.clientId === null) {
            return;
        }

        const payload = {
            clientId: String(form.clientId),
            projectId: form.projectId ? String(form.projectId) : null,
            issueDate: form.issueDate ?? DateTime.now(),
            dueDate: form.dueDate ?? DateTime.now().plus({days: 30}),
            status: (form.status as InvoiceStatus) ?? 'draft',
            lines: form.lines.map(line => ({description: line.description || 'Item', quantity: line.quantity, rate: line.rate ?? 0})),
            notes: form.notes,
            tags: form.tags
        };

        if (isEdit.value && existing.value) {
            updateInvoice(existing.value.id, payload);
            await router.push({name: 'invoice', params: {id: existing.value.id}});
            await showSnackbar({color: 'success', icon: 'circle-check', message: `${existing.value.number} updated.`});
        } else {
            const invoice = createInvoice(payload);
            await router.push({name: 'invoice', params: {id: invoice.id}});
            await showSnackbar({color: 'success', icon: 'circle-check', message: `${invoice.number} created.`});
        }
    }
</script>

<style scoped>
    .line-remove {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .line-remove-head {
        align-items: flex-end;
        padding-bottom: 9px;
    }
</style>
