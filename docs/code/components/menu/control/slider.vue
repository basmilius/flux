<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuControl
                icon-leading="sun-bright"
                is-fill>
                <FluxFormSlider
                    v-model="brightness"
                    aria-label="Brightness"/>
            </FluxMenuControl>

            <FluxMenuControl
                icon-leading="bolt"
                is-fill>
                <FluxFormSlider
                    v-model="contrast"
                    aria-label="Contrast"/>
            </FluxMenuControl>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSlider, FluxMenu, FluxMenuControl, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const brightness = ref(70);
    const contrast = ref(45);
</script>
