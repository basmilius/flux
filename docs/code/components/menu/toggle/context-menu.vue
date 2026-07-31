<template>
    <FluxContextMenu>
        <FluxPane style="padding: 36px; text-align: center">
            Right-click here
        </FluxPane>

        <template #menu>
            <FluxMenu>
                <FluxMenuSubHeader label="View"/>

                <FluxMenuGroup>
                    <FluxMenuToggle
                        v-model="grid"
                        icon-leading="table-cells"
                        label="Show grid"/>

                    <FluxMenuToggle
                        v-model="rulers"
                        icon-leading="text-height"
                        label="Show rulers"/>

                    <FluxMenuToggle
                        v-model="snap"
                        icon-leading="arrows-to-dot"
                        label="Snap to grid"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuGroup, FluxMenuSubHeader, FluxMenuToggle, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const grid = ref(true);
    const rulers = ref(false);
    const snap = ref(true);
</script>
