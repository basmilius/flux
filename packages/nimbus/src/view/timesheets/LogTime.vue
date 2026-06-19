<template>
    <FluxOverlay
        is-closeable
        size="medium"
        @close="goBack">
        <FluxPane>
            <FluxPaneHeader
                icon="stopwatch"
                subtitle="Add an entry to your timesheet"
                title="Log time"/>

            <FluxPaneBody>
                <FluxForm @submit="save">
                    <FluxFormRow>
                        <FluxFormField label="Date">
                            <FluxFormDateInput v-model="form.date"/>
                        </FluxFormField>
                        <FluxFormField label="Start time">
                            <FluxFormDateTimeInput v-model="form.startAt"/>
                        </FluxFormField>
                    </FluxFormRow>

                    <FluxFormRow>
                        <FluxFormField label="Project">
                            <FluxFormSelect
                                v-model="form.projectId"
                                :options="projectOptions"
                                placeholder="Select a project"/>
                        </FluxFormField>
                        <FluxFormField label="Task">
                            <FluxDisabled :disabled="form.projectId === null">
                                <FluxFormCombobox
                                    v-model="form.taskId"
                                    is-creatable
                                    :options="taskOptions"
                                    placeholder="Pick or type a task"/>
                            </FluxDisabled>
                        </FluxFormField>
                    </FluxFormRow>

                    <FluxFormField label="Hours">
                        <FluxFormSlider
                            v-model="form.hours"
                            is-ticks-visible
                            :max="8"
                            :min="0.5"
                            :step="0.5"/>
                        <template #addition>
                            <FluxFormFieldAddition
                                icon="clock"
                                :message="`${form.hours}h will be logged.`"
                                mode="hint"/>
                        </template>
                    </FluxFormField>

                    <FluxFormRow>
                        <FluxFormField label="Note">
                            <FluxFormInput
                                v-model="form.note"
                                placeholder="What did you work on?"/>
                        </FluxFormField>
                        <FluxFormField label="Billable">
                            <FluxToggle v-model="form.billable"/>
                        </FluxFormField>
                    </FluxFormRow>
                </FluxForm>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"
                    @click="goBack()"/>
                <FluxSpacer/>
                <FluxPrimaryButton
                    :disabled="form.projectId === null"
                    icon-leading="circle-check"
                    label="Log time"
                    @click="save()"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import { FluxDisabled, FluxForm, FluxFormCombobox, FluxFormDateInput, FluxFormDateTimeInput, FluxFormField, FluxFormFieldAddition, FluxFormInput, FluxFormRow, FluxFormSelect, FluxFormSlider, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxToggle, showSnackbar } from '@flux-ui/components';
    import type { FluxFormSelectOption, FluxFormSelectValue } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { useProjectsStore, useTeamStore, useTimeStore } from '@/store';

    const router = useRouter();
    const {projects, tasksForProject} = useProjectsStore();
    const {members} = useTeamStore();
    const {addEntry} = useTimeStore();

    const form = reactive({
        date: DateTime.now() as DateTime | null,
        startAt: DateTime.now().set({hour: 9, minute: 0}) as DateTime | null,
        projectId: null as FluxFormSelectValue,
        taskId: null as FluxFormSelectValue,
        hours: 2,
        note: '',
        billable: true
    });

    const projectOptions = computed<FluxFormSelectOption[]>(() => projects.value.map(project => ({label: project.name, value: project.id, icon: project.icon})));

    const taskOptions = computed<FluxFormSelectOption[]>(() => {
        if (form.projectId === null) {
            return [];
        }

        return tasksForProject(String(form.projectId)).map(task => ({label: task.title, value: task.id}));
    });

    function goBack(): void {
        router.push({name: 'timesheets'});
    }

    async function save(): Promise<void> {
        if (form.projectId === null) {
            return;
        }

        const projectId = String(form.projectId);
        const taskId = form.taskId !== null && tasksForProject(projectId).some(task => task.id === String(form.taskId)) ? String(form.taskId) : null;

        addEntry({
            memberId: members.value[0]?.id ?? 'm1',
            projectId,
            taskId,
            date: (form.date ?? DateTime.now()).startOf('day'),
            hours: form.hours,
            note: form.note || 'Logged',
            billable: form.billable
        });

        await router.push({name: 'timesheets'});
        await showSnackbar({color: 'success', icon: 'circle-check', message: `${form.hours}h logged.`});
    }
</script>
