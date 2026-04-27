<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormSlider
                    is-ticks-visible
                    v-model="value"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormSlider, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(25);
</script>
