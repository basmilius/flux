<template>
    <FluxExpandable>
        <template #header="{isOpen, close, open, toggle}">
            <FluxButtonStack>
                <FluxSecondaryButton
                    label="Open"
                    @click="open"/>

                <FluxSecondaryButton
                    label="Close"
                    @click="close"/>

                <FluxSecondaryButton
                    :label="isOpen ? 'Toggle (close)' : 'Toggle (open)'"
                    @click="toggle"/>
            </FluxButtonStack>
        </template>

        <template #body>
            <FluxNotice>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at autem blanditiis corporis deleniti, facilis ipsum maxime necessitatibus nesciunt nulla quidem quod saepe suscipit tempora totam vel veritatis. Ipsam, nesciunt!
            </FluxNotice>
        </template>
    </FluxExpandable>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxExpandable, FluxNotice, FluxSecondaryButton } from '@fancee/flux';
</script>
