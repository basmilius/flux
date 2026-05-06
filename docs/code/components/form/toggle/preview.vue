<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFlex :gap="18">
                    <FluxToggle
                        v-model="value"/>

                    <FluxToggle
                        v-model="iconValue"
                        icon-off="xmark"
                        icon-on="check"/>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxPaneBody, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(false);
    const iconValue = ref(false);
</script>
