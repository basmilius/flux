<template>
    <FluxApplicationMenu>
        <template #header>
            <!-- Optional header (e.g. a logo). -->
        </template>

        <!-- Main menu items. -->

        <template #context>
            <FluxApplicationMenuContextStack/>
        </template>

        <template #footer>
            <!-- Optional footer (e.g. an account menu item). -->
        </template>
    </FluxApplicationMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationMenu, FluxApplicationMenuContextStack } from '@flux-ui/application';
</script>
