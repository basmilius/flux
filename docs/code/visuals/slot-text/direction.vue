<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="21">
        <FluxFlex
            align="center"
            direction="horizontal"
            :gap="24">
            <FluxVisualSlotText
                direction="up"
                :text="`Up ${count}`"
                style="font-size: 21px; font-weight: 600;"/>

            <FluxVisualSlotText
                direction="down"
                :text="`Down ${count}`"
                style="font-size: 21px; font-weight: 600;"/>
        </FluxFlex>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Increment"
            @click="count++"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const count = ref(0);
</script>
