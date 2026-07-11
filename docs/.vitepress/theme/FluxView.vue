<template>
    <section
        :class="$style.fluxView"
        data-flux>
        <slot/>
    </section>
</template>

<style
    lang="scss"
    module>
    .fluxView {
        :global(h1, h2, h3, h4, h5, h6) {
            line-height: 1.6;
        }

        :global(p:not(:where([data-flux-typography] *))) {
            margin: unset;
            line-height: 1.6;
        }

        > .button,
        > .flyout > .button {
            align-self: center;
        }

        > .pane {
            width: 100%;
        }
    }
</style>
