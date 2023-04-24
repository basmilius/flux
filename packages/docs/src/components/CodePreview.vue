<template>
    <flux-pane class="code-preview flux-typography-aware">
        <preview v-if="html">
            <template #body>
                <div class="preview-body" v-html="code"/>
            </template>
        </preview>

        <preview v-else-if="component">
            <component :is="component"/>
        </preview>

        <preview v-else>
            <slot/>
        </preview>

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
    import { FluxPane, FluxPaneFooter } from '@fancee/flux';
    import { HighlightedCode, Preview } from '.';

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

    .code-preview .preview {
        background: rgb(var(--gray-0));
        border: 0;

        &-body {
            min-height: unset;
            padding: 21px;
            align-items: stretch;
            flex-flow: column;
        }

        &::before {
            background: rgb(var(--gray-3) / .25);
            -webkit-mask-position: center center;
            mask-position: center center;
        }
    }
</style>
