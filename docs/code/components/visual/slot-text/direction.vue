<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="21">
        <FluxFlex
            align="center"
            direction="horizontal"
            :gap="24">
            <FluxSlotText
                direction="up"
                :text="`Up ${count}`"
                style="font-size: 21px; font-weight: 600;"/>

            <FluxSlotText
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
    import { FluxFlex, FluxSecondaryButton, FluxSlotText } from '@flux-ui/components';
    import { ref } from 'vue';

    const count = ref(0);
</script>
