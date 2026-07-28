<template>
    <p style="max-width: 480px">
        Every component on this page comes from
        <FluxHoverCard label="basmilius/flux">
            <template #opener>
                <FluxLink
                    href="https://github.com/basmilius/flux"
                    label="basmilius/flux"
                    rel="noopener noreferrer"
                    target="_blank"
                    type="link"/>
            </template>

            <FluxFlex
                align="center"
                :gap="9">
                <FluxIcon
                    name="code-branch"
                    :size="16"/>

                <FluxText weight="600">
                    basmilius/flux
                </FluxText>
            </FluxFlex>

            <FluxText
                color="muted"
                size="small">
                An opinionated Vue 3 component library, built around a 3px grid and a color contract that is checked in CI.
            </FluxText>

            <FluxFlex
                align="center"
                :gap="15">
                <FluxFlex
                    align="center"
                    :gap="6">
                    <FluxIcon
                        name="star"
                        :size="14"/>

                    <FluxText
                        color="muted"
                        size="small">
                        412
                    </FluxText>
                </FluxFlex>

                <FluxFlex
                    align="center"
                    :gap="6">
                    <FluxIcon
                        name="circle"
                        :size="14"/>

                    <FluxText
                        color="muted"
                        size="small">
                        TypeScript
                    </FluxText>
                </FluxFlex>
            </FluxFlex>

            <FluxSecondaryButton
                href="https://github.com/basmilius/flux"
                icon-leading="arrow-up-right-from-square"
                label="Open on GitHub"
                rel="noopener noreferrer"
                size="small"
                target="_blank"
                type="link"/>
        </FluxHoverCard>, which is free to use.
    </p>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxHoverCard, FluxIcon, FluxLink, FluxSecondaryButton, FluxText } from '@flux-ui/components';
</script>
