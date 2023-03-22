<template>
    <flux-dashboard>
        <template #sidebar>
            <flux-expandable-group>
                <flux-menu>
                    <flux-menu-item
                        icon-before="objects-column"
                        label="Dashboard"/>

                    <flux-menu-group v-for="i of [1, 2, 3]">
                        <flux-expandable :key="i">
                            <template #header="{open}">
                                <flux-menu-item
                                    icon-before="circle"
                                    :label="`Group ${i}`"
                                    @click="open"/>
                            </template>

                            <template #body>
                                <flux-menu-group>
                                    <flux-menu-item
                                        is-indented
                                        label="Overview"/>

                                    <flux-menu-item
                                        is-indented
                                        label="Tickets"/>

                                    <flux-menu-item
                                        is-indented
                                        label="New event"/>
                                </flux-menu-group>
                            </template>
                        </flux-expandable>
                    </flux-menu-group>
                </flux-menu>
            </flux-expandable-group>
        </template>

        <template #top-bar>
            <theme-toggle/>
        </template>

        <router-view/>
    </flux-dashboard>
</template>

<script
    lang="ts"
    setup>
    import { FluxDashboard, FluxExpandable, FluxExpandableGroup, FluxMenu, FluxMenuGroup, FluxMenuItem } from '@fancee/flux';
    import { ThemeToggle } from '../components';
</script>
