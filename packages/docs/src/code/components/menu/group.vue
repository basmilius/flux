<template>
    <flux-menu>
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

        <flux-divider/>

        <flux-menu-group>
            <flux-menu-item
                icon-before="circle"
                label="Menu item 4"/>

            <flux-menu-item
                icon-before="circle"
                label="Menu item 5"/>
        </flux-menu-group>
    </flux-menu>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxDivider,
        FluxMenu,
        FluxMenuGroup,
        FluxMenuItem
    } from '@fancee/flux';
</script>
