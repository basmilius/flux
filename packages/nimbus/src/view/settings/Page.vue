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

                        <FluxFormField label="How happy are you with Nimbus?">
                            <FluxFormRating
                                v-model="profile.satisfaction"
                                allow-half
                                clearable/>
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
                icon="cloud"
                label="Workspace">
                <FluxForm @submit="onSave('Workspace')">
                    <FluxFormSection title="Workspace">
                        <FluxFormField label="Workspace name">
                            <FluxFormInput v-model="workspace.name"/>
                        </FluxFormField>

                        <FluxFormGrid :columns="2">
                            <FluxFormColumn>
                                <FluxFormField label="Default currency">
                                    <FluxFormSelect
                                        v-model="workspace.currency"
                                        :options="currencyOptions"/>
                                </FluxFormField>
                            </FluxFormColumn>
                            <FluxFormColumn>
                                <FluxFormField label="Time zone">
                                    <FluxFormTimeZonePicker v-model="workspace.timeZone"/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormGrid>

                        <FluxFormField label="Default hourly rate (EUR)">
                            <FluxFormSlider
                                v-model="workspace.rate"
                                is-ticks-visible
                                :max="200"
                                :min="40"
                                :step="5"/>
                            <template #addition>
                                <FluxFormFieldAddition
                                    icon="circle-info"
                                    :message="`Used as the default on new invoice lines (€${workspace.rate}/h).`"
                                    mode="hint"/>
                            </template>
                        </FluxFormField>

                        <FluxFormField label="Brand color">
                            <FluxColorPicker v-model="workspace.brandColor"/>
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
                icon="bell"
                label="Notifications">
                <FluxFormSection title="Email notifications">
                    <FluxFormField label="Weekly digest">
                        <FluxToggle v-model="notify.digest"/>
                    </FluxFormField>
                    <FluxFormField label="Mentions & comments">
                        <FluxToggle v-model="notify.mentions"/>
                    </FluxFormField>
                    <FluxFormField label="Invoice updates">
                        <FluxToggle v-model="notify.invoices"/>
                    </FluxFormField>
                    <FluxFormField label="Quiet hours">
                        <FluxFormRangeSlider
                            v-model="notify.quietHours"
                            :max="24"
                            :min="0"
                            :step="1"/>
                        <template #addition>
                            <FluxFormFieldAddition
                                icon="moon"
                                :message="`No notifications between ${notify.quietHours[0]}:00 and ${notify.quietHours[1]}:00.`"
                                mode="hint"/>
                        </template>
                    </FluxFormField>
                </FluxFormSection>
            </FluxTab>

            <FluxTab
                icon="lock"
                label="Security">
                <FluxFormSection title="Security">
                    <FluxFormField label="Security PIN">
                        <FluxFormPinInput
                            v-model="security.pin"
                            is-private
                            :max-length="4"/>
                    </FluxFormField>

                    <FluxFormField label="Two-factor methods">
                        <FluxFormCheckboxGroup v-model="security.twoFactor">
                            <FluxFormCheckbox
                                label="Authenticator app"
                                value="totp"/>
                            <FluxFormCheckbox
                                label="SMS"
                                value="sms"/>
                            <FluxFormCheckbox
                                label="Security key"
                                value="key"/>
                        </FluxFormCheckboxGroup>
                    </FluxFormField>

                    <FluxFormField label="Next security review">
                        <FluxDatePicker v-model="security.reviewDate"/>
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

                <FluxFormSection title="Demo">
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            icon-leading="circle-question"
                            label="Take a tour"
                            @click="startTour()"/>
                        <FluxDestructiveButton
                            icon-leading="arrows-rotate"
                            label="Reset demo data"
                            @click="onReset()"/>
                    </FluxButtonStack>
                </FluxFormSection>
            </FluxTab>

            <FluxTab
                icon="circle-question"
                label="Help">
                <FluxContainer :gutter="0">
                    <FluxExpandableGroup>
                        <FluxExpandable
                            icon="database"
                            label="How is my data stored?">
                            Everything in Nimbus lives in memory and is generated from a fixed seed. Nothing is sent to a server, and a reload restores the initial state.
                        </FluxExpandable>
                        <FluxExpandable
                            icon="arrows-rotate"
                            label="How do I reset the demo?">
                            Use “Reset demo data” on this Appearance tab or from your profile menu.
                        </FluxExpandable>
                        <FluxExpandable
                            icon="palette"
                            label="Can I change the theme?">
                            Yes — toggle dark mode and pick an accent color on the Appearance tab.
                        </FluxExpandable>
                    </FluxExpandableGroup>

                    <FluxSpacing :size="7"/>

                    <FluxPaneIllustration
                        :animated-colors="['#5285f8', '#10b981', '#f59e0b']"
                        :aspect-ratio="3"
                        is-masked>
                        <div class="promo">
                            <strong>Need a hand?</strong>
                            <p>Read the Flux UI documentation to see how Nimbus is built.</p>
                            <FluxSecondaryButton
                                href="https://flux-ui.dev"
                                icon-trailing="arrow-up-right-from-square"
                                label="Open docs"
                                target="_blank"
                                type="link"/>
                        </div>
                    </FluxPaneIllustration>
                </FluxContainer>
            </FluxTab>
        </FluxTabs>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxButtonStack, FluxColorPicker, FluxColorSelect, FluxContainer, FluxDatePicker, FluxDestructiveButton, FluxExpandable, FluxExpandableGroup, FluxForm, FluxFormCheckbox, FluxFormCheckboxGroup, FluxFormColumn, FluxFormField, FluxFormFieldAddition, FluxFormGrid, FluxFormInput, FluxFormPinInput, FluxFormRadio, FluxFormRadioGroup, FluxFormRangeSlider, FluxFormRating, FluxFormSection, FluxFormSelect, FluxFormSlider, FluxFormTimeZonePicker, FluxPaneIllustration, FluxPrimaryButton, FluxSecondaryButton, FluxSpacing, FluxTab, FluxTabs, FluxToggle, showConfirm, showSnackbar } from '@flux-ui/components';
    import type { FluxFormSelectOption, FluxFormSelectValue } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { reactive, ref } from 'vue';
    import { defineTitle } from '@/composable';
    import { resetData, useTeamStore, useUiStore } from '@/store';

    defineTitle('gear', 'Settings');

    const {darkMode, startTour} = useUiStore();
    const {members} = useTeamStore();

    const tab = ref(0);
    const user = members.value[0];

    const profile = reactive({
        name: user?.name ?? 'Studio owner',
        role: user?.role ?? 'Owner',
        email: user?.email ?? 'owner@nimbus.studio',
        satisfaction: 4.5 as number | null
    });

    const workspace = reactive({
        name: 'Nimbus Studio',
        currency: 'eur' as FluxFormSelectValue,
        timeZone: 'Europe/Amsterdam' as string | null,
        rate: 95,
        brandColor: '#5285f8' as string | [number, number, number]
    });

    const notify = reactive({
        digest: true,
        mentions: true,
        invoices: false,
        quietHours: [22, 7] as [number, number]
    });

    const security = reactive({
        pin: '',
        twoFactor: ['totp'] as (string | number | boolean)[],
        reviewDate: DateTime.now().plus({months: 3}) as DateTime | DateTime[] | null
    });

    const appearance = reactive({
        accent: '#5285f8',
        density: 'comfortable' as string | number | boolean
    });

    const currencyOptions: FluxFormSelectOption[] = [
        {label: 'Euro (€)', value: 'eur'},
        {label: 'US Dollar ($)', value: 'usd'},
        {label: 'British Pound (£)', value: 'gbp'}
    ];

    const accentColors = ['#5285f8', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    async function onSave(section: string): Promise<void> {
        await showSnackbar({color: 'success', icon: 'circle-check', message: `${section} settings saved.`});
    }

    async function onReset(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'arrows-rotate',
            title: 'Reset demo data',
            message: 'This restores all data to its initial state. Any edits will be lost.'
        });

        if (confirmed) {
            resetData();
            await showSnackbar({color: 'success', icon: 'circle-check', message: 'Demo data has been reset.'});
        }
    }
</script>

<style scoped>
    .promo {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        gap: 9px;
        padding: 18px;
        color: #fff;
    }

    .promo p {
        margin: 0;
        font-size: 13px;
    }
</style>
