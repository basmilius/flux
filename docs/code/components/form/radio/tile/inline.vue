<template>
    <FluxPane style="max-width: 519px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="How often?">
                    <FluxFormRadioGroup
                        v-model="frequency"
                        is-inline>
                        <FluxFormRadioTile
                            value="once"
                            icon="bolt"
                            label="One-time"
                            sub-label="Add credit just this once."/>

                        <FluxFormRadioTile
                            value="recurring"
                            icon="rotate"
                            label="Recurring"
                            sub-label="Top up automatically each cycle."/>
                    </FluxFormRadioGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormRadioGroup, FluxFormRadioTile, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const frequency = ref('once');
</script>
