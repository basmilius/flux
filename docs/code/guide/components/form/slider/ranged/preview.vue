<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormRangeSlider
                    is-ticks-visible
                    v-model="ranges"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeSlider, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const ranges = ref<[number, number]>([25, 75]);
</script>
