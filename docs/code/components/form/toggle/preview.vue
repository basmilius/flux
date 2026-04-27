<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxStack direction="horizontal">
                    <FluxToggle
                        v-model="value"/>

                    <FluxToggle
                        v-model="iconValue"
                        icon-off="xmark"
                        icon-on="check"/>
                </FluxStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxStack, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(false);
    const iconValue = ref(false);
</script>
