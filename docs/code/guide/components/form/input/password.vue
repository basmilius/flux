<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxForm>
                <FluxFormInput
                    type="password"
                    v-model="password"/>
            </FluxForm>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { ref } from 'vue';
    import { FluxForm, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';

    const password = ref('KOj87o2#5D1+N@3UextA');
</script>
