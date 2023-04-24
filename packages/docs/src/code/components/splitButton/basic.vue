<template>
    <flux-split-button>
        <template #button>
            <flux-secondary-button label="Download"/>
        </template>

        <template #flyout="{close}">
            <flux-menu>
                <flux-menu-group>
                    <flux-menu-item
                        icon-before="scissors"
                        label="Cut"
                        @click="close"/>
                    <flux-menu-item
                        icon-before="clone"
                        label="Copy"
                        @click="close"/>
                    <flux-menu-item
                        icon-before="paste"
                        label="Paste"
                        @click="close"/>
                </flux-menu-group>

                <flux-separator/>

                <flux-menu-group>
                    <flux-menu-item
                        icon-before="gear"
                        label="Preferences"
                        @click="close"/>
                </flux-menu-group>
            </flux-menu>
        </template>
    </flux-split-button>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxMenu,
        FluxMenuGroup,
        FluxMenuItem,
        FluxSecondaryButton,
        FluxSeparator,
        FluxSplitButton
    } from '@fancee/flux';
</script>
