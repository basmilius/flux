<template>
    <FluxApplicationContent
        v-if="project"
        layout="narrow">
        <FluxForm @submit="save">
            <FluxFormSection title="Project details">
                <FluxFormRow>
                    <FluxFormField label="Name">
                        <FluxFormInput
                            v-model="form.name"
                            :max-length="48"/>
                    </FluxFormField>
                    <FluxFormField label="Key">
                        <FluxFormInput
                            v-model="form.key"
                            :max-length="6"/>
                    </FluxFormField>
                </FluxFormRow>

                <FluxFormField label="Description">
                    <FluxFormTextArea v-model="form.description"/>
                </FluxFormField>

                <FluxFormField label="Labels">
                    <FluxFormTagsInput
                        v-model="form.labels"
                        placeholder="Add a label"
                        :suggestions="labelSuggestions"
                        tag-color="primary"/>
                </FluxFormField>

                <FluxFormField label="Category">
                    <FluxFormTreeViewSelect
                        v-model="form.category"
                        is-searchable
                        :options="categories"/>
                </FluxFormField>

                <FluxFormField label="Cover focal point">
                    <FluxFocalPointEditor
                        v-model="form.focal"
                        :src="cover"/>
                </FluxFormField>
            </FluxFormSection>

            <FluxFormSection title="Planning & budget">
                <FluxFormField label="Timeline">
                    <FluxFormDateRangeInput v-model="form.timeline"/>
                </FluxFormField>

                <FluxFormField label="Budget (EUR)">
                    <FluxFormNumberInput
                        v-model="form.budget"
                        :min="0"
                        :step="1000"/>
                    <template #addition>
                        <FluxFormFieldAddition
                            icon="circle-info"
                            :message="`Spent so far: ${formatCurrency(project.spent)}`"
                            mode="hint"/>
                    </template>
                </FluxFormField>

                <FluxFormField label="Billing model">
                    <FluxFormRadioGroup
                        v-model="form.billingModel"
                        is-inline>
                        <FluxFormRadio
                            label="Fixed price"
                            value="fixed"/>
                        <FluxFormRadio
                            label="Hourly"
                            value="hourly"/>
                        <FluxFormRadio
                            label="Retainer"
                            value="retainer"/>
                    </FluxFormRadioGroup>
                </FluxFormField>

                <FluxFormField label="Status">
                    <FluxFormSelect
                        v-model="form.status"
                        :options="statusOptions"/>
                </FluxFormField>
            </FluxFormSection>

            <FluxFormSection title="Health & preferences">
                <FluxFormField label="Project health">
                    <FluxFormRating
                        v-model="form.health"
                        clearable/>
                </FluxFormField>

                <FluxFormField label="Preferences">
                    <FluxFormCheckboxGroup v-model="form.prefs">
                        <FluxFormCheckbox
                            label="Email notifications"
                            sub-label="Send updates to the team"
                            value="notify"/>
                        <FluxFormCheckbox
                            label="Visible to client"
                            sub-label="Share progress on the client portal"
                            value="public"/>
                        <FluxFormCheckbox
                            label="Archived"
                            sub-label="Hide from the active list"
                            value="archived"/>
                    </FluxFormCheckboxGroup>
                </FluxFormField>
            </FluxFormSection>

            <FluxButtonStack>
                <FluxPrimaryButton
                    icon-leading="floppy-disk"
                    is-submit
                    label="Save changes"/>
                <FluxDestructiveButton
                    icon-leading="trash"
                    label="Delete project"
                    @click="remove()"/>
            </FluxButtonStack>
        </FluxForm>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxButtonStack, FluxDestructiveButton, FluxFocalPointEditor, FluxForm, FluxFormCheckbox, FluxFormCheckboxGroup, FluxFormDateRangeInput, FluxFormField, FluxFormFieldAddition, FluxFormInput, FluxFormNumberInput, FluxFormRadio, FluxFormRadioGroup, FluxFormRating, FluxFormRow, FluxFormSection, FluxFormSelect, FluxFormTagsInput, FluxFormTextArea, FluxFormTreeViewSelect, FluxPrimaryButton, showConfirm, showSnackbar } from '@flux-ui/components';
    import type { FluxFormSelectOption, FluxFormSelectValue, FluxFormTreeViewSelectOption, FluxFormTreeViewSelectValue } from '@flux-ui/types';
    import type { DateTime } from 'luxon';
    import { computed, reactive, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useProjectsStore } from '@/store';
    import type { BillingModel, ProjectStatus } from '@/types';
    import { coverImage, formatCurrency, PROJECT_STATUS } from '@/util';

    const route = useRoute();
    const router = useRouter();
    const {getProject, updateProject, deleteProject} = useProjectsStore();

    const project = computed(() => getProject(String(route.params.id)));

    const form = reactive({
        name: '',
        key: '',
        description: '',
        budget: 0 as number | null,
        labels: [] as string[],
        category: 'web' as FluxFormTreeViewSelectValue,
        timeline: null as [DateTime, DateTime] | null,
        billingModel: 'fixed' as string | number | boolean,
        status: 'planning' as FluxFormSelectValue,
        health: 3 as number | null,
        prefs: ['notify'] as (string | number | boolean)[],
        focal: [0.5, 0.5] as [number, number]
    });

    const cover = computed(() => coverImage(project.value?.name ?? 'Project', project.value?.color ?? 'primary'));

    const statusOptions: FluxFormSelectOption[] = (['planning', 'active', 'on-hold', 'completed'] as ProjectStatus[])
        .map(status => ({label: PROJECT_STATUS[status].label, value: status, icon: PROJECT_STATUS[status].icon}));

    const labelSuggestions: FluxFormSelectOption[] = ['web', 'mobile', 'branding', 'campaign', 'retainer', 'priority', 'internal', 'maintenance'].map(label => ({label, value: label}));

    const categories: FluxFormTreeViewSelectOption[] = [
        {
            id: 'client-work',
            label: 'Client work',
            icon: 'handshake',
            selectable: false,
            children: [
                {id: 'web', label: 'Web', icon: 'globe'},
                {id: 'app', label: 'Application', icon: 'code'},
                {id: 'brand', label: 'Branding', icon: 'palette'}
            ]
        },
        {id: 'internal', label: 'Internal', icon: 'briefcase'}
    ];

    watch(() => getProject(String(route.params.id)), project => {
        if (project) {
            form.name = project.name;
            form.key = project.key;
            form.description = project.description;
            form.budget = project.budget;
            form.labels = [...project.labels];
            form.timeline = [project.startDate, project.dueDate];
            form.billingModel = project.billingModel;
            form.status = project.status;
            form.health = project.health;
        }
    }, {immediate: true});

    async function save(): Promise<void> {
        updateProject(String(route.params.id), {
            name: form.name,
            key: form.key,
            description: form.description,
            budget: form.budget ?? 0,
            labels: form.labels,
            billingModel: form.billingModel as BillingModel,
            status: (form.status as ProjectStatus) ?? 'planning',
            health: form.health ?? 0,
            ...(form.timeline ? {startDate: form.timeline[0], dueDate: form.timeline[1]} : {})
        });

        await showSnackbar({color: 'success', icon: 'circle-check', message: 'Project settings saved.'});
    }

    async function remove(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'trash',
            title: 'Delete project',
            message: `Delete “${form.name}”? This removes the project and all its tasks.`
        });

        if (confirmed) {
            deleteProject(String(route.params.id));
            await router.push({name: 'projects'});
            await showSnackbar({color: 'success', icon: 'circle-check', message: 'Project deleted.'});
        }
    }
</script>
