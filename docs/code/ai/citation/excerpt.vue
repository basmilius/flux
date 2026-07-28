<template>
    <FluxFlex
        direction="vertical"
        :gap="12">
        <p>
            A citation with only a number carries the marker and
            nothing else.<FluxAiCitation :index="1"/>
        </p>

        <p>
            Add a title to name the source in the
            card.<FluxAiCitation
                :index="2"
                title="Spacing and sizing"/>
        </p>

        <p>
            Add an excerpt and the passage itself is what
            opens.<FluxAiCitation
                excerpt="All spacing and dimension values are based on a 3px grid, so use multiples of 3px for width, height, padding, margin, gap and positional offsets."
                :index="3"
                title="Spacing and sizing"
                url="https://flux-ui.dev/guide/introduction"/>
        </p>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCitation } from '@flux-ui/ai';
    import { FluxFlex } from '@flux-ui/components';
</script>
