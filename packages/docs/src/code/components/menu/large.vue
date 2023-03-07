<template>
    <flux-pane style="max-width: 300px">
        <flux-menu is-large>
            <flux-menu-group>
                <flux-menu-item
                    icon-before="circle"
                    label="Menu item 1"/>

                <flux-menu-item
                    icon-before="circle"
                    label="Menu item 2"/>

                <flux-menu-item
                    icon-before="circle"
                    label="Menu item 3"/>
            </flux-menu-group>
        </flux-menu>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxMenu,
        FluxMenuGroup,
        FluxMenuItem,
        FluxPane,
        FluxSeparator
    } from '@fancee/flux';
</script>
