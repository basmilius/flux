<template>
    <p style="max-width: 510px">
        The contrast gate and the palette gate both run in CI and have to stay
        green.<FluxAiCitation :index="1">
            <FluxFlex
                align="center"
                :gap="6">
                <FluxIcon
                    color="success"
                    name="circle-check"
                    :size="16"/>

                <FluxText weight="600">
                    check-contrast.ts
                </FluxText>
            </FluxFlex>

            <FluxText
                color="muted"
                size="small">
                Walks every semantic pair in both themes and fails the build when a
                combination drops under its required ratio.
            </FluxText>

            <FluxFlex :gap="6">
                <FluxTag
                    color="success"
                    label="passing"/>

                <FluxTag label="42 pairs"/>
            </FluxFlex>
        </FluxAiCitation>
    </p>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCitation } from '@flux-ui/ai';
    import { FluxFlex, FluxIcon, FluxTag, FluxText } from '@flux-ui/components';
</script>
