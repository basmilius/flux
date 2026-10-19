<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="horizontal"
            :gap="15">
            <FluxSecondaryButton
                icon-leading="minus"
                @click="count -= 7"/>

            <FluxVisualDrumRoll
                :text="formatter.format(count)"
                style="min-width: 120px; font-size: 39px; font-weight: 700; text-align: center;"/>

            <FluxSecondaryButton
                icon-leading="plus"
                @click="count += 7"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualDrumRoll } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const formatter = new Intl.NumberFormat('en-US');
    const count = ref(1294);
</script>
