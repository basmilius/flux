<template>
    <flux-expandable>
        <template #header="{isOpen, close, open, toggle}">
            <flux-button-stack>
                <flux-secondary-button
                    label="Open"
                    @click="open"/>

                <flux-secondary-button
                    label="Close"
                    @click="close"/>

                <flux-secondary-button
                    :label="isOpen ? 'Toggle (close)' : 'Toggle (open)'"
                    @click="toggle"/>
            </flux-button-stack>
        </template>

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at autem blanditiis corporis deleniti, facilis ipsum maxime necessitatibus nesciunt nulla quidem quod saepe suscipit tempora totam vel veritatis. Ipsam, nesciunt!
    </flux-expandable>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxExpandable,
        FluxSecondaryButton,
        FluxButtonStack
    } from '@fancee/flux';
</script>
