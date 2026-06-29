<template>
    <FluxPane style="max-width: 420px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="What to back up">
                    <FluxFormCheckboxGroup v-model="targets">
                        <FluxFormCheckboxTile
                            value="databases"
                            icon="database"
                            label="Databases"/>

                        <FluxFormCheckboxTile
                            value="files"
                            icon="folder"
                            label="Files"/>

                        <FluxFormCheckboxTile
                            value="media"
                            icon="image"
                            label="Media"/>
                    </FluxFormCheckboxGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormCheckboxGroup, FluxFormCheckboxTile, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const targets = ref(['databases', 'files']);
</script>
