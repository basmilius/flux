<template>
    <FluxSecondaryButton
        icon-leading="copy"
        @click="copy">
        <template #label>
            <FluxSlotText
                ref="label"
                text="Copy"/>
        </template>
    </FluxSecondaryButton>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxSlotText } from '@flux-ui/components';
    import { useTemplateRef } from 'vue';

    const labelRef = useTemplateRef<InstanceType<typeof FluxSlotText>>('label');

    function copy(): void {
        labelRef.value?.flash('Copied', {enter: {direction: 'up'}});
    }
</script>
