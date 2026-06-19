<template>
    <FluxOverlay
        is-closeable
        size="medium"
        @close="goBack">
        <FluxPane>
            <FluxPaneHeader
                icon="rocket"
                subtitle="Set up a new project in a few steps"
                title="New project"/>

            <FluxPaneBody>
                <FluxStepper v-model="step">
                    <template #steps="{activate, modelValue, steps}">
                        <FluxStepperSteps
                            :amount="steps"
                            :current="modelValue + 1"
                            @activate="activate"/>
                    </template>

                    <FluxStepperStep>
                        <div class="wizard-step">
                            <FluxFormRow>
                                <FluxFormField label="Project name">
                                    <FluxFormInput
                                        v-model="form.name"
                                        :max-length="48"
                                        placeholder="E.g. Website redesign"/>
                                </FluxFormField>
                                <FluxFormField label="Key">
                                    <FluxFormInput
                                        v-model="form.key"
                                        :max-length="6"
                                        placeholder="WEB"/>
                                </FluxFormField>
                            </FluxFormRow>

                            <FluxFormField label="Client">
                                <FluxFormSelect
                                    v-model="form.clientId"
                                    is-searchable
                                    :options="clientOptions"
                                    placeholder="Select a client"/>
                            </FluxFormField>
                        </div>
                    </FluxStepperStep>

                    <FluxStepperStep>
                        <div class="wizard-step">
                            <FluxFormField label="Description">
                                <FluxFormTextArea
                                    v-model="form.description"
                                    placeholder="What is this project about?"/>
                            </FluxFormField>

                            <FluxFormRow>
                                <FluxFormField label="Status">
                                    <FluxFormSelect
                                        v-model="form.status"
                                        :options="statusOptions"/>
                                </FluxFormField>
                                <FluxFormField label="Accent color">
                                    <FluxFormSelect
                                        v-model="form.color"
                                        :options="colorOptions"/>
                                </FluxFormField>
                            </FluxFormRow>

                            <FluxFormField label="Budget (EUR)">
                                <FluxFormNumberInput
                                    v-model="form.budget"
                                    :min="0"
                                    :step="1000"/>
                            </FluxFormField>

                            <FluxFormField label="Labels">
                                <FluxFormTagsInput
                                    v-model="form.labels"
                                    placeholder="Add a label and press enter"
                                    :suggestions="labelSuggestions"
                                    tag-color="primary"/>
                            </FluxFormField>
                        </div>
                    </FluxStepperStep>

                    <FluxStepperStep>
                        <div class="wizard-step">
                            <FluxFormField label="Team members">
                                <FluxFormSelect
                                    v-model="form.memberIds"
                                    is-multiple
                                    is-searchable
                                    :options="memberOptions"
                                    placeholder="Add people to this project"/>
                            </FluxFormField>

                            <p class="wizard-hint">Pick who should have access. You can change this later in the project settings.</p>
                        </div>
                    </FluxStepperStep>

                    <FluxStepperStep>
                        <div class="wizard-step">
                            <FluxDescriptionList title="Review">
                                <FluxDescriptionItem
                                    icon="rocket"
                                    label="Name">
                                    {{ form.name || '—' }}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="hashtag"
                                    label="Key">
                                    {{ resolvedKey || '—' }}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="handshake"
                                    label="Client">
                                    {{ clientName || '—' }}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="bolt"
                                    label="Status">
                                    {{ PROJECT_STATUS[(form.status as ProjectStatus) ?? 'planning'].label }}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="sack-dollar"
                                    label="Budget">
                                    {{ formatCurrency(form.budget ?? 0) }}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="user-group"
                                    label="Team">
                                    {{ memberCount }} member{{ memberCount === 1 ? '' : 's' }}
                                </FluxDescriptionItem>
                            </FluxDescriptionList>
                        </div>
                    </FluxStepperStep>
                </FluxStepper>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"
                    @click="goBack()"/>

                <FluxSpacer/>

                <FluxButtonStack>
                    <FluxSecondaryButton
                        v-if="step > 0"
                        icon-leading="angle-left"
                        label="Back"
                        @click="step--"/>

                    <FluxPrimaryButton
                        v-if="step < 3"
                        :disabled="!canContinue"
                        icon-trailing="angle-right"
                        label="Continue"
                        @click="step++"/>

                    <FluxPrimaryButton
                        v-else
                        icon-leading="circle-check"
                        label="Create project"
                        @click="create()"/>
                </FluxButtonStack>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDescriptionItem, FluxDescriptionList, FluxFormField, FluxFormInput, FluxFormNumberInput, FluxFormRow, FluxFormSelect, FluxFormTagsInput, FluxFormTextArea, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStepper, FluxStepperStep, FluxStepperSteps, showSnackbar } from '@flux-ui/components';
    import type { FluxColor, FluxFormSelectOption, FluxFormSelectValue } from '@flux-ui/types';
    import { computed, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useClientsStore, useProjectsStore, useTeamStore } from '@/store';
    import type { ProjectStatus } from '@/types';
    import { formatCurrency, PROJECT_STATUS } from '@/util';

    const router = useRouter();
    const {createProject} = useProjectsStore();
    const {clients, getClient} = useClientsStore();
    const {members} = useTeamStore();

    const step = ref(0);

    const form = reactive({
        name: '',
        key: '',
        description: '',
        budget: 50000 as number | null,
        clientId: null as FluxFormSelectValue,
        status: 'planning' as FluxFormSelectValue,
        color: 'primary' as FluxFormSelectValue,
        memberIds: [] as FluxFormSelectValue,
        labels: [] as string[]
    });

    const clientOptions = computed<FluxFormSelectOption[]>(() => clients.value.map(client => ({label: client.name, value: client.id, icon: 'handshake'})));
    const memberOptions = computed<FluxFormSelectOption[]>(() => members.value.map(member => ({label: member.name, value: member.id, icon: 'user'})));
    const labelSuggestions: FluxFormSelectOption[] = ['web', 'mobile', 'branding', 'campaign', 'retainer', 'priority', 'internal', 'maintenance'].map(label => ({label, value: label}));

    const statusOptions: FluxFormSelectOption[] = (['planning', 'active', 'on-hold', 'completed'] as ProjectStatus[])
        .map(status => ({label: PROJECT_STATUS[status].label, value: status, icon: PROJECT_STATUS[status].icon}));

    const colorOptions: FluxFormSelectOption[] = (['primary', 'info', 'success', 'warning', 'danger'] as FluxColor[])
        .map(color => ({label: color[0].toUpperCase() + color.slice(1), value: color}));

    const resolvedKey = computed(() => (form.key || form.name.slice(0, 3)).toUpperCase());
    const memberIdList = computed<string[]>(() => Array.isArray(form.memberIds) ? form.memberIds.map(String) : []);
    const memberCount = computed(() => memberIdList.value.length);
    const clientName = computed(() => getClient(form.clientId ? String(form.clientId) : undefined)?.name ?? '');

    const canContinue = computed(() => {
        if (step.value === 0) {
            return form.name.trim().length > 0 && form.clientId !== null;
        }

        return true;
    });

    function goBack(): void {
        router.push({name: 'projects'});
    }

    async function create(): Promise<void> {
        const project = createProject({
            name: form.name.trim() || 'Untitled project',
            key: resolvedKey.value,
            clientId: form.clientId ? String(form.clientId) : '',
            description: form.description,
            status: (form.status as ProjectStatus) ?? 'planning',
            color: (form.color as FluxColor) ?? 'primary',
            budget: form.budget ?? 0,
            memberIds: memberIdList.value,
            labels: form.labels
        });

        await router.push({name: 'project', params: {id: project.id}});
        await showSnackbar({color: 'success', icon: 'circle-check', message: `Project “${project.name}” created.`});
    }
</script>

<style scoped>
    .wizard-step {
        display: flex;
        flex-flow: column;
        gap: 15px;
        min-height: 213px;
        padding-top: 18px;
    }

    .wizard-hint {
        margin: 0;
        font-size: 13px;
        color: var(--gray-500);
    }
</style>
