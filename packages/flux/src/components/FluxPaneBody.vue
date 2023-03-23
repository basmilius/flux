<template>
    <div class="flux-pane-body">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly span?: number;
    }

    withDefaults(defineProps<Props>(), {
        span: 1
    });
</script>

<style lang="scss">
    .flux-pane-body {
        display: flex;
        flex-flow: column;
        padding: 21px;
    }

    .flux-pane-body > .flux-stack {
        flex-grow: 1;
    }

    .flux-pane:not(.is-grid) > .flux-pane-body + .flux-pane-body {
        padding-top: 0;
    }

    .flux-pane.is-grid > .flux-pane-body {
        grid-column: span v-bind(span);
    }
</style>
