<template>
    <Preview>
        <p style="max-width: 480px; text-align: center">
            The color tokens were rebuilt over a single weekend by
            <FluxHoverCard label="Bas Milius">
                <template #opener>
                    <FluxLink label="@basmilius"/>
                </template>

                <FluxPersona
                    :avatar-size="42"
                    avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
                    name="Bas Milius"
                    title="Flux engineer"/>

                <FluxText
                    color="muted"
                    size="small">
                    Builds design systems and cares a little too much about a 3px grid.
                </FluxText>

                <FluxFlex
                    align="center"
                    :gap="6">
                    <FluxIcon
                        name="code-branch"
                        :size="14"/>

                    <FluxText
                        color="muted"
                        size="small">
                        128 repositories
                    </FluxText>
                </FluxFlex>
            </FluxHoverCard>, who also wrote the contrast gate that guards them.
        </p>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxHoverCard, FluxIcon, FluxLink, FluxPersona, FluxText } from '@flux-ui/components';
</script>
