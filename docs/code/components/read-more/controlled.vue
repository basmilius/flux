<template>
    <FluxPane>
        <FluxPaneHeader title="Terms of service">
            <template #after>
                <FluxSecondaryButton
                    :label="isExpanded ? 'Collapse' : 'Expand'"
                    size="small"
                    @click="isExpanded = !isExpanded"/>
            </template>
        </FluxPaneHeader>

        <FluxPaneBody>
            <FluxReadMore v-model:is-expanded="isExpanded">
                By creating an account you agree to keep your credentials confidential and to use the service within the limits described in the fair use policy. We store the data you upload for as long as the workspace exists and remove it within thirty days after deletion. Backups are encrypted at rest and are never shared with third parties without a written agreement.
            </FluxReadMore>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxReadMore, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isExpanded = ref(false);
</script>
