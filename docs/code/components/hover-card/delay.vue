<template>
    <FluxFlex
        align="center"
        :gap="30"
        justify="center">
        <FluxHoverCard
            :close-delay="0"
            label="Without delay"
            :open-delay="0">
            <template #opener>
                <FluxSecondaryButton label="Without delay"/>
            </template>

            <FluxText size="small">
                Opens the moment the pointer arrives and closes the moment it leaves again.
            </FluxText>
        </FluxHoverCard>

        <FluxHoverCard
            :close-delay="600"
            label="Patient"
            :open-delay="1000">
            <template #opener>
                <FluxSecondaryButton label="Patient"/>
            </template>

            <FluxText size="small">
                Waits a full second before opening and lingers for another 600ms once the pointer wanders off.
            </FluxText>
        </FluxHoverCard>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxHoverCard, FluxSecondaryButton, FluxText } from '@flux-ui/components';
</script>
