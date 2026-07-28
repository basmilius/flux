<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxReadMore>
                <template #default>
                    Every workspace starts on the free plan, which covers a single project and up to three collaborators. Upgrading unlocks unlimited projects, audit logging and the shared component registry. Seats are billed per active member per month and can be adjusted at any point in the cycle, with the difference settled on the next invoice.
                </template>

                <template #toggle="{contentId, isExpanded, toggle}">
                    <FluxSecondaryButton
                        :icon-trailing="isExpanded ? 'angle-up' : 'angle-down'"
                        :label="isExpanded ? 'Show less' : 'Show the full plan'"
                        size="small"
                        :aria-controls="contentId"
                        :aria-expanded="isExpanded"
                        @click="toggle"/>
                </template>
            </FluxReadMore>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxReadMore, FluxSecondaryButton } from '@flux-ui/components';
</script>
