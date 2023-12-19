<template>
    <div class="flux-prose">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-prose {
        --inline-padding: 21px;
        --breakout-max-width: 1200px;
        --content-max-width: 900px;

        --breakout-size: calc((var(--breakout-max-width) - var(--content-max-width)) / 2);
        --content-size: min(100% - var(--inline-padding) * 2, var(--content-max-width));
        --padding-size: minmax(var(--inline-padding), 1fr);

        display: grid;
        grid-template-columns: [fill-start] var(--padding-size) [breakout-start] minmax(0, var(--breakout-size)) [content-start] var(--content-size) [content-end] minmax(0, var(--breakout-size)) [breakout-end] var(--padding-size) [fill-end];

        > *,
        &-fill > * {
            grid-column: content;
        }

        &-breakout {
            grid-column: breakout;
        }

        &-fill {
            display: grid;
            grid-column: fill;
            grid-template-columns: inherit;
        }
    }
</style>
