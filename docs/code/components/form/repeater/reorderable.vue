<template>
    <FluxPane style="max-width: 480px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormRepeater
                    v-model="lines"
                    add-label="Add line item"
                    is-reorderable
                    row-label="Line item"
                    :new-row="newLine">
                    <template #default="{row}">
                        <FluxFormRow>
                            <FluxFormField label="Description">
                                <FluxFormInput
                                    v-model="row.description"
                                    placeholder="E.g. Design work"/>
                            </FluxFormField>

                            <FluxFormField label="Hours">
                                <FluxFormNumberInput
                                    v-model="row.hours"
                                    :min="0"/>
                            </FluxFormField>
                        </FluxFormRow>
                    </template>
                </FluxFormRepeater>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormNumberInput, FluxFormRepeater, FluxFormRow, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    type Line = {
        description: string;
        hours: number | null;
    };

    const lines = ref<Line[]>([
        {description: 'Design work', hours: 8},
        {description: 'Development', hours: 24},
        {description: 'Project management', hours: 4}
    ]);

    function newLine(): Line {
        return {description: '', hours: 1};
    }
</script>
