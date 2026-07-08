<template>
    <FluxDescriptionList>
        <FluxDescriptionItem>
            <template #label>
                Plan
                <FluxBadge
                    color="primary"
                    label="Pro"/>
            </template>

            Enterprise
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
</script>
