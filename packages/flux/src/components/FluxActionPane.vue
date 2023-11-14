<template>
    <flux-pane class="flux-action-pane is-grid">
        <flux-pane-body
            class="flux-action-pane-body"
            is-larger-padded>
            <slot/>
        </flux-pane-body>

        <flux-pane-body
            v-if="$slots.buttons"
            class="flux-action-pane-body"
            is-larger-padded>
            <flux-button-stack axis="vertical">
                <slot name="buttons"/>
            </flux-button-stack>
        </flux-pane-body>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import FluxButtonStack from './FluxButtonStack.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';

    // export interface Slots {
    //     default(): any;
    //
    //     buttons(): any;
    // }

    // defineSlots<Slots>();
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    @include flux.breakpoint-down(md) {
        .flux-pane.flux-action-pane {
            grid-template-columns: 1fr;
        }

        .flux-pane-body.flux-action-pane-body:last-child {
            padding-top: 0;
        }
    }

    @include flux.breakpoint-up(lg) {
        .flux-pane.flux-action-pane {
            grid-template-columns: 1fr auto;
        }

        .flux-pane-body.flux-action-pane-body:last-child {
            padding-left: 0;
        }
    }
</style>
