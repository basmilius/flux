<template>
    <FluxExpandable>
        <template #header="{close, open, toggle}">
            <FluxButtonStack>
                <FluxSecondaryButton
                    label="Open"
                    @click="open()"/>

                <FluxSecondaryButton
                    label="Close"
                    @click="close()"/>

                <FluxSecondaryButton
                    label="Toggle"
                    @click="toggle()"/>
            </FluxButtonStack>
        </template>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid asperiores, autem dignissimos dolores eligendi error, eum maxime necessitatibus pariatur quas qui quo quod ratione temporibus ullam ut, veritatis voluptate?</p>
    </FluxExpandable>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxExpandable, FluxSecondaryButton } from '@flux-ui/components';
</script>
