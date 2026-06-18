<template>
    <Preview>
        <FluxPane style="max-width: 540px">
            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxNoticeStack>
                        <FluxNotice
                            color="success"
                            icon="circle-check"
                            message="Your preferences were saved."/>

                        <FluxNotice
                            color="warning"
                            icon="circle-exclamation"
                            message="Some changes only take effect after a restart."/>
                    </FluxNoticeStack>

                    <FluxFormField
                        as="group"
                        label="Notification channels">
                        <FluxFormCheckboxGroup v-model="channels">
                            <FluxFormCheckbox
                                value="email"
                                label="Email"/>

                            <FluxFormCheckbox
                                value="sms"
                                label="SMS"/>

                            <FluxFormCheckbox
                                value="push"
                                label="Push"/>
                        </FluxFormCheckboxGroup>
                    </FluxFormField>

                    <FluxFormField
                        as="group"
                        label="Subscription plan">
                        <FluxFormRadioGroup v-model="plan">
                            <FluxFormRadio
                                value="free"
                                label="Free"/>

                            <FluxFormRadio
                                value="pro"
                                label="Pro"/>

                            <FluxFormRadio
                                value="enterprise"
                                label="Enterprise"/>
                        </FluxFormRadioGroup>
                    </FluxFormField>

                    <FluxSeparator/>

                    <FluxFormField label="Volume">
                        <FluxFormSlider
                            v-model="volume"
                            is-ticks-visible/>
                    </FluxFormField>

                    <FluxFormField label="Price range">
                        <FluxFormRangeSlider v-model="priceRange"/>
                    </FluxFormField>

                    <FluxFormField label="Satisfaction">
                        <FluxFormRating v-model="rating"/>
                    </FluxFormField>

                    <FluxFormField label="Interests">
                        <FluxFormTagsInput
                            v-model="interests"
                            placeholder="Add an interest and press enter"/>
                    </FluxFormField>

                    <FluxFormRow>
                        <FluxFormField label="Seats">
                            <FluxFormNumberInput
                                v-model="seats"
                                :max="100"
                                :min="1"/>
                        </FluxFormField>

                        <FluxFormField label="Security PIN">
                            <FluxFormPinInput is-private/>
                        </FluxFormField>
                    </FluxFormRow>

                    <FluxDivider content-placement="start">
                        <span style="opacity: .6">Locked</span>
                    </FluxDivider>

                    <FluxDisabled>
                        <FluxFormField
                            label="API key"
                            hint="Contact an administrator to rotate this key.">
                            <FluxFormInput
                                model-value="sk-live-************"
                                is-readonly/>
                        </FluxFormField>
                    </FluxDisabled>
                </FluxFormColumn>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxDisabled, FluxDivider, FluxFormCheckbox, FluxFormCheckboxGroup, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormNumberInput, FluxFormPinInput, FluxFormRadio, FluxFormRadioGroup, FluxFormRangeSlider, FluxFormRating, FluxFormSlider, FluxFormTagsInput, FluxNotice, FluxNoticeStack, FluxPane, FluxPaneBody, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const channels = ref(['email', 'push']);
    const plan = ref('pro');
    const volume = ref(40);
    const priceRange = ref<[number, number]>([20, 80]);
    const rating = ref<number | null>(4);
    const interests = ref(['design', 'frontend']);
    const seats = ref<number | null>(5);
</script>
