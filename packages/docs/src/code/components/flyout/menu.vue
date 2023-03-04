<template>
    <flux-button-stack>
        <flux-flyout>
            <template #opener="{open}">
                <flux-secondary-button
                    icon-after="ellipsis-h"
                    @click="open"/>
            </template>

            <template #default="{close}">
                <flux-menu>
                    <flux-menu-group>
                        <flux-menu-item
                            icon-before="scissors"
                            label="Cut"
                            @click="close"/>
                        <flux-menu-item
                            icon-before="copy"
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
        </flux-flyout>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator } from '@fancee/flux';
</script>
