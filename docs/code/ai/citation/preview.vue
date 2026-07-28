<template>
    <Preview>
        <p style="max-width: 510px">
            The color layer is built on <code>light-dark()</code>, so a token resolves to
            its own value per theme instead of being swapped out at runtime.<FluxAiCitation
                excerpt="The palette is absolute: a stop is the same color in both themes. Themes differ in the semantic layer, through light-dark()."
                :index="1"
                title="Design tokens"
                url="https://flux-ui.dev/guide/design-tokens"/> Every intent maps onto six
            roles, which keeps a component readable without reaching for a palette
            stop.<FluxAiCitation
                excerpt="Six intents times nine roles. Inside a component that took mixin.intent(), read the local --intent-* contract instead."
                :index="2"
                title="Color intents"
                url="https://flux-ui.dev/guide/design-tokens"/>
        </p>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCitation } from '@flux-ui/ai';
</script>
