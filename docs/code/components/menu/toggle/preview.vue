<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuToggle
                        v-model="darkMode"
                        icon-leading="moon"
                        label="Dark mode"/>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuToggle, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const darkMode = ref(true);
</script>
