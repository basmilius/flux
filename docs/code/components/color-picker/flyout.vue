<template>
    <FluxFlyout>
        <template #opener="{open}">
            <FluxSecondaryButton
                label="Pick color..."
                @click="open()">
                <template #before>
                    <div :style="{background: `rgb(${color.join(' ')})`, borderRadius: '99px', width: '24px', height: '24px', position: 'relative', flexShrink: 0}"/>
                </template>
            </FluxSecondaryButton>
        </template>

        <template #default>
            <FluxPaneBody style="width: 330px">
                <FluxColorPicker
                    v-model="color"
                    type="rgb"/>
            </FluxPaneBody>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorPicker, FluxFlyout, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const color = ref<[number, number, number]>([31, 75, 109]);
</script>
