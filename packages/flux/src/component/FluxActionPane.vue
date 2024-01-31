<template>
    <FluxPane class="flux-action-pane is-grid">
        <FluxPaneBody
            class="flux-action-pane-body"
            is-larger-padded>
            <slot/>
        </FluxPaneBody>

        <FluxPaneBody
            v-if="$slots.buttons"
            class="flux-action-pane-body"
            is-larger-padded>
            <FluxButtonStack axis="vertical">
                <slot name="buttons"/>
            </FluxButtonStack>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import FluxButtonStack from './FluxButtonStack.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

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
