<template>
    <FluxSecondaryButton
        icon-leading="copy"
        @click="copy">
        <template #label>
            <FluxVisualSlotText
                ref="label"
                text="Copy"/>
        </template>
    </FluxSecondaryButton>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { useTemplateRef } from 'vue';

    const labelRef = useTemplateRef<InstanceType<typeof FluxVisualSlotText>>('label');

    function copy(): void {
        labelRef.value?.flash('Copied', {enter: {direction: 'up'}});
    }
</script>
