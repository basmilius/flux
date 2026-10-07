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
        > .button,
        > .flyout > .button {
            align-self: center;
        }

        > .pane {
            width: 100%;
        }
    }
</style>
