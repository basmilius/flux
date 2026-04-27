<template>
    <FluxApplicationMenu>
        <!-- Main menu items. -->

        <template #context>
            <FluxApplicationMenuContextStack name="menu"/>
        </template>
    </FluxApplicationMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationMenu, FluxApplicationMenuContextStack } from '@flux-ui/application';
</script>
