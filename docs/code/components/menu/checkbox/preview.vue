<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuCheckbox
                        v-model="showGrid"
                        label="Show grid"/>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuCheckbox, FluxMenuGroup, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const showGrid = ref(true);
</script>
