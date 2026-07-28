<template>
    <FluxFlex
        align="center"
        :gap="30"
        justify="center">
        <FluxHoverCard label="Bas Milius">
            <template #opener>
                <FluxLink label="@basmilius"/>
            </template>

            <FluxPersona
                avatar-fallback-initials="BM"
                :avatar-size="42"
                avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
                name="Bas Milius"
                title="Flux engineer"/>
        </FluxHoverCard>

        <FluxHoverCard
            disabled
            label="Jane Doe">
            <template #opener>
                <FluxLink label="@janedoe"/>
            </template>

            <FluxPersona
                avatar-fallback-initials="JD"
                :avatar-size="42"
                name="Jane Doe"
                title="Product designer"/>
        </FluxHoverCard>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxHoverCard, FluxLink, FluxPersona } from '@flux-ui/components';
</script>
