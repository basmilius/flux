<template>
    <Preview>
        <FluxPane style="max-width: 480px">
            <FluxPaneBody>
                <FluxForm>
                    <FluxFormStep
                        title="Choose how to connect"
                        subtitle="Bring an existing subscription or supply credentials from a provider.">
                        <FluxFormRadioGroup
                            v-model="method"
                            is-connected>
                            <FluxFormRadioTile
                                value="subscription"
                                icon="sparkles"
                                label="Use an existing subscription"
                                sub-label="Bring a plan you already pay for."/>

                            <FluxFormRadioTile
                                value="credentials"
                                icon="user-key"
                                label="Provider credentials"
                                sub-label="Supply an API key to power your agents."/>
                        </FluxFormRadioGroup>
                    </FluxFormStep>

                    <FluxFormStep
                        title="Name your workspace"
                        subtitle="Pick a name your team will recognise.">
                        <FluxFormField label="Workspace name">
                            <FluxFormInput placeholder="E.g. Acme Inc."/>
                        </FluxFormField>
                    </FluxFormStep>

                    <FluxFormStep
                        title="Link an agent"
                        subtitle="Pick which agent you want to link, then finish authenticating.">
                        <FluxFormField label="Agent">
                            <FluxFormSelect
                                v-model="agent"
                                :options="agents"/>
                        </FluxFormField>
                    </FluxFormStep>
                </FluxForm>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormRadioGroup, FluxFormRadioTile, FluxFormSelect, FluxFormStep, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const method = ref('subscription');
    const agent = ref('claude-code');

    const agents = [
        {label: 'Claude Code', value: 'claude-code'},
        {label: 'Codex CLI', value: 'codex-cli'},
        {label: 'Custom agent', value: 'custom'}
    ];
</script>
