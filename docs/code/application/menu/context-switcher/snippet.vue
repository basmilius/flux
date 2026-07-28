<template>
    <FluxApplicationMenu>
        <template #header>
            <FluxApplicationMenuContextSwitcher/>
        </template>

        <!-- Main menu items. -->

        <template #context>
            <FluxApplicationMenuContextStack name="menu"/>
        </template>
    </FluxApplicationMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationMenu, FluxApplicationMenuContextStack, FluxApplicationMenuContextSwitcher } from '@flux-ui/application';
</script>
