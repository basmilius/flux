<template>
    <FluxApplicationContent layout="medium">
        <FluxTabs v-model="tab">
            <FluxTab
                icon="user"
                label="Profile">
                <FluxForm @submit="onSave('Profile')">
                    <FluxFormSection title="Your profile">
                        <FluxFormGrid :columns="2">
                            <FluxFormColumn>
                                <FluxFormField label="Full name">
                                    <FluxFormInput v-model="profile.name"/>
                                </FluxFormField>
                            </FluxFormColumn>
                            <FluxFormColumn>
                                <FluxFormField label="Role">
                                    <FluxFormInput v-model="profile.role"/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormGrid>

                        <FluxFormField label="Email">
                            <FluxFormInput v-model="profile.email"/>
                        </FluxFormField>

                        <FluxFormField label="Time zone">
                            <FluxFormTimeZonePicker v-model="profile.timeZone"/>
                        </FluxFormField>
                    </FluxFormSection>

                    <FluxButtonStack>
                        <FluxPrimaryButton
                            icon-leading="floppy-disk"
                            is-submit
                            label="Save changes"/>
                    </FluxButtonStack>
                </FluxForm>
            </FluxTab>

            <FluxTab
                icon="globe"
                label="Property">
                <FluxForm @submit="onSave('Property')">
                    <FluxFormSection title="Tracked property">
                        <FluxFormField label="Property domain">
                            <FluxFormInput v-model="property.domain"/>
                        </FluxFormField>

                        <FluxFormGrid :columns="2">
                            <FluxFormColumn>
                                <FluxFormField label="Data retention">
                                    <FluxFormSelect
                                        v-model="property.retention"
                                        :options="retentionOptions"/>
                                </FluxFormField>
                            </FluxFormColumn>
                            <FluxFormColumn>
                                <FluxFormField label="Default report">
                                    <FluxFormSelect
                                        v-model="property.defaultReport"
                                        :options="reportOptions"/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormGrid>

                        <FluxFormField label="Exclude internal traffic">
                            <FluxToggle v-model="property.excludeInternal"/>
                        </FluxFormField>
                    </FluxFormSection>

                    <FluxButtonStack>
                        <FluxPrimaryButton
                            icon-leading="floppy-disk"
                            is-submit
                            label="Save changes"/>
                    </FluxButtonStack>
                </FluxForm>
            </FluxTab>

            <FluxTab
                icon="database"
                label="Data sources">
                <FluxFormSection title="Connected sources">
                    <FluxPane>
                        <FluxItemStack>
                            <FluxItem
                                v-for="source of sources"
                                :key="source.id">
                                <FluxItemMedia
                                    is-center
                                    :size="40">
                                    <FluxBoxedIcon
                                        :color="source.connected ? 'primary' : 'gray'"
                                        :name="source.icon"
                                        :size="40"/>
                                </FluxItemMedia>
                                <FluxItemContent is-center>
                                    <strong>{{ source.name }}</strong>
                                    <span>{{ source.description }}</span>
                                </FluxItemContent>
                                <FluxItemActions is-center>
                                    <FluxBadge
                                        :color="source.connected ? 'success' : 'gray'"
                                        :icon="source.connected ? 'circle-check' : 'circle-minus'"
                                        :label="source.connected ? 'Connected' : 'Disabled'"/>
                                    <FluxToggle v-model="source.connected"/>
                                </FluxItemActions>
                            </FluxItem>
                        </FluxItemStack>
                    </FluxPane>

                    <FluxButtonStack>
                        <FluxSecondaryButton
                            icon-leading="plus"
                            label="Add source"
                            @click="onAddSource()"/>
                    </FluxButtonStack>
                </FluxFormSection>
            </FluxTab>

            <FluxTab
                icon="bell"
                label="Alerts">
                <FluxFormSection title="Alert notifications">
                    <FluxFormField label="Traffic spikes">
                        <FluxToggle v-model="alerts.spikes"/>
                    </FluxFormField>
                    <FluxFormField label="Traffic drops">
                        <FluxToggle v-model="alerts.drops"/>
                    </FluxFormField>
                    <FluxFormField label="Goal milestones">
                        <FluxToggle v-model="alerts.goals"/>
                    </FluxFormField>
                    <FluxFormField label="Weekly digest email">
                        <FluxToggle v-model="alerts.digest"/>
                    </FluxFormField>
                    <FluxFormField label="Quiet hours">
                        <FluxFormRangeSlider
                            v-model="alerts.quietHours"
                            :max="24"
                            :min="0"
                            :step="1"/>
                        <template #addition>
                            <FluxFormFieldAddition
                                icon="moon"
                                :message="`No alerts between ${alerts.quietHours[0]}:00 and ${alerts.quietHours[1]}:00.`"
                                mode="hint"/>
                        </template>
                    </FluxFormField>
                </FluxFormSection>
            </FluxTab>

            <FluxTab
                icon="palette"
                label="Appearance">
                <FluxFormSection title="Theme">
                    <FluxFormField label="Dark mode">
                        <FluxToggle v-model="darkMode"/>
                    </FluxFormField>

                    <FluxFormField label="Accent color">
                        <FluxColorSelect
                            v-model="appearance.accent"
                            :colors="accentColors"
                            is-custom-allowed/>
                    </FluxFormField>

                    <FluxFormField label="Density">
                        <FluxFormRadioGroup
                            v-model="appearance.density"
                            is-inline>
                            <FluxFormRadio
                                label="Comfortable"
                                value="comfortable"/>
                            <FluxFormRadio
                                label="Compact"
                                value="compact"/>
                        </FluxFormRadioGroup>
                    </FluxFormField>
                </FluxFormSection>

                <FluxFormSection title="Demo data">
                    <FluxButtonStack>
                        <FluxDestructiveButton
                            icon-leading="arrows-rotate"
                            label="Reset demo data"
                            @click="onReset()"/>
                    </FluxButtonStack>
                </FluxFormSection>
            </FluxTab>
        </FluxTabs>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBadge, FluxBoxedIcon, FluxButtonStack, FluxColorSelect, FluxDestructiveButton, FluxForm, FluxFormColumn, FluxFormField, FluxFormFieldAddition, FluxFormGrid, FluxFormInput, FluxFormRadio, FluxFormRadioGroup, FluxFormRangeSlider, FluxFormSection, FluxFormSelect, FluxFormTimeZonePicker, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPrimaryButton, FluxSecondaryButton, FluxTab, FluxTabs, FluxToggle, showConfirm, showSnackbar } from '@flux-ui/components';
    import type { FluxFormSelectOption, FluxIconName } from '@flux-ui/types';
    import { reactive, ref } from 'vue';
    import { defineTitle } from '@/composable';
    import { resetData, useAnalyticsStore, useUiStore } from '@/store';

    defineTitle('gear', 'Settings');

    const {darkMode} = useUiStore();
    const {account} = useAnalyticsStore();

    const tab = ref(0);

    const profile = reactive({
        name: account.value.name,
        role: 'Analytics lead',
        email: account.value.email,
        timeZone: 'Europe/Amsterdam' as string | null
    });

    const property = reactive({
        domain: account.value.property,
        retention: '14m',
        defaultReport: 'overview',
        excludeInternal: true
    });

    const sources = reactive<{ id: string; name: string; description: string; icon: FluxIconName; connected: boolean }[]>([
        {id: 'web', name: 'Website tag', description: 'pulse.js on app.pulse.io', icon: 'globe', connected: true},
        {id: 'ios', name: 'iOS SDK', description: 'Pulse mobile SDK 4.2', icon: 'mobile', connected: true},
        {id: 'server', name: 'Server events', description: 'HTTP events API', icon: 'server', connected: true},
        {id: 'import', name: 'CSV import', description: 'Scheduled daily import', icon: 'database', connected: false}
    ]);

    const alerts = reactive({
        spikes: true,
        drops: true,
        goals: true,
        digest: false,
        quietHours: [22, 7] as [number, number]
    });

    const appearance = reactive({
        accent: '#6366f1',
        density: 'comfortable' as string | number | boolean
    });

    const retentionOptions: FluxFormSelectOption[] = [
        {label: '2 months', value: '2m'},
        {label: '14 months', value: '14m'},
        {label: '38 months', value: '38m'},
        {label: 'No limit', value: 'none'}
    ];

    const reportOptions: FluxFormSelectOption[] = [
        {label: 'Overview', value: 'overview'},
        {label: 'Acquisition', value: 'acquisition'},
        {label: 'Behavior', value: 'behavior'},
        {label: 'Conversions', value: 'conversions'}
    ];

    const accentColors = ['#6366f1', '#5285f8', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

    async function onSave(section: string): Promise<void> {
        await showSnackbar({color: 'success', icon: 'circle-check', message: `${section} settings saved.`});
    }

    function onAddSource(): void {
        showSnackbar({icon: 'circle-info', message: 'Adding data sources is not available in this demo.'});
    }

    async function onReset(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'arrows-rotate',
            title: 'Reset demo data',
            message: 'This regenerates the full analytics data set from its initial seed. Any changes will be lost.'
        });

        if (confirmed) {
            resetData();
            await showSnackbar({color: 'success', icon: 'circle-check', message: 'Demo data has been reset.'});
        }
    }
</script>
