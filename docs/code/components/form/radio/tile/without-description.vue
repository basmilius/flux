<template>
    <FluxPane style="max-width: 489px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Plan">
                    <FluxFormRadioGroup
                        v-model="plan"
                        is-inline>
                        <FluxFormRadioTile
                            value="free"
                            icon="user"
                            label="Free"/>

                        <FluxFormRadioTile
                            value="pro"
                            icon="star"
                            label="Pro"/>

                        <FluxFormRadioTile
                            value="team"
                            icon="users"
                            label="Team"/>
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

    const plan = ref('pro');
</script>
