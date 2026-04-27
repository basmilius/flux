<template>
    <FluxApplication>
        <template #menu>
            <FluxApplicationMenu>
                <!-- Menu items. -->
            </FluxApplicationMenu>
        </template>

        <FluxApplicationTop title="Page title"/>

        <FluxApplicationContent>
            <!-- Your application content here. -->
        </FluxApplicationContent>

        <template #side>
            <FluxApplicationSide>
                <!-- Side bar content. -->
            </FluxApplicationSide>
        </template>
    </FluxApplication>
</template>

<script
    setup
    lang="ts">
    import { FluxApplication, FluxApplicationContent, FluxApplicationMenu, FluxApplicationSide, FluxApplicationTop } from '@flux-ui/application';
</script>
