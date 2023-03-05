<template>
    <flux-pane class="code-preview flux-typography-aware">
        <flux-pane-body
            v-if="html"
            v-html="code"/>

        <flux-pane-body v-else-if="component">
            <component :is="component"/>
        </flux-pane-body>

        <flux-pane-body v-else>
            <slot/>
        </flux-pane-body>

        <flux-pane-footer>
            <highlighted-code
                :code="code"
                :language="html ? 'html' : (component ? 'vue' : language)"/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneFooter } from '@fancee/flux';
    import { HighlightedCode } from '.';

    export interface Props {
        readonly code: string;
        readonly component?: any;
        readonly html?: boolean;
        readonly language?: 'html' | 'shell' | 'typescript' | 'vue';
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .code-preview > .flux-pane-body {
        font-size: 15px;
    }

    .code-preview > .flux-pane-body:first-of-type {
        background-image:
            linear-gradient(to bottom, transparent calc(100% - 1px), rgb(0 0 0 / .0125) calc(100% - 1px)),
            linear-gradient(to right, transparent calc(100% - 1px), rgb(0 0 0 / .0125) calc(100% - 1px));
        background-position: top center;
        background-size: 45px 45px;
        border-radius: var(--radius) var(--radius) 0 0;
    }
</style>
