<template>
    <section :class="$style.fluxView">
        <slot/>
    </section>
</template>

<style
    lang="scss"
    module>
    .fluxView {
        :global(p) {
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
