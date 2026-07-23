<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Terms">
                    <FluxFormCheckbox v-model="isAccepted">
                        <template #label>
                            <span>I agree to the <a href="#">terms and conditions</a>.</span>
                        </template>
                    </FluxFormCheckbox>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormCheckbox, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const isAccepted = ref(false);
</script>
