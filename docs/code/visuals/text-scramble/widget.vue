<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxPane style="width: 261px;">
            <FluxPaneBody>
                <FluxFlex
                    align="start"
                    direction="vertical"
                    :gap="3">
                    <span style="color: var(--gray-500); font-size: 13px; font-weight: 500;">Active region</span>

                    <FluxVisualTextScramble
                        :text="region"
                        style="font-size: 24px; font-weight: 700;"/>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Refresh"
            @click="refresh"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualTextScramble } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const regions = ['eu-west-1', 'us-east-1', 'ap-south-1', 'sa-east-1'];
    const index = ref(0);
    const region = ref(regions[0]);

    function refresh(): void {
        index.value = (index.value + 1) % regions.length;
        region.value = regions[index.value];
    }
</script>
