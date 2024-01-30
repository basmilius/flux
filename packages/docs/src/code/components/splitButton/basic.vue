<template>
    <FluxSplitButton>
        <template #button>
            <FluxSecondaryButton label="Download"/>
        </template>

        <template #flyout="{close}">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-before="scissors"
                        label="Cut"
                        @click="close"/>

                    <FluxMenuItem
                        icon-before="clone"
                        label="Copy"
                        @click="close"/>

                    <FluxMenuItem
                        icon-before="paste"
                        label="Paste"
                        @click="close"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-before="gear"
                        label="Preferences"
                        @click="close"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxSplitButton>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton } from '@fancee/flux';
</script>
