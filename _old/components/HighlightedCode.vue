<template>
    <HighCode
        data-typography-aware
        :class="$style.highlightedCode"
        height="auto"
        width="100%"
        border-radius="9px"
        font-size="14px"
        theme="light"
        :code-value="code"
        :lang="language"/>
</template>

<script
    lang="ts"
    setup>
    import { HighCode } from 'vue-highlight-code';

    export interface Props {
        readonly code: string;
        readonly language: 'html' | 'shell' | 'typescript' | 'vue';
    }

    defineProps<Props>();
</script>

<style
    lang="scss"
    module>
    .highlightedCode {
        margin-top: 6px;
        margin-bottom: 6px;
        border: 1px solid rgb(var(--gray-3));

        &,
        & :global(.hljs) {
            background: rgb(var(--gray-2)) !important;
            font-family: jetbrains-mono, monospace !important;
            font-variant-ligatures: none;
        }

        code {
            font-family: jetbrains-mono, monospace;
            line-height: 1.7 !important;
        }

        pre {
            overflow: auto !important;
        }

        :global(.code_area) {
            padding: 9px 15px;
        }

        :global(.code_header) {
            display: none;
        }
    }

    .pane .highlightedCode {
        border: 0;
        border-radius: 0;

        &,
        & :global(.hljs) {
            background: transparent !important;
        }

        :global(.code_area) {
            padding: 0;
        }
    }

    .highlightedCode {
        :global(.hljs-attr),
        :global(.hljs-attribute),
        :global(.hljs-number) {
            color: #174ad4;
        }

        :global(.hljs-built_in),
        :global(.hljs-keyword) {
            color: #0132b2;
        }

        :global(.hljs-meta),
        :global(.hljs-name),
        :global(.hljs-selector-class),
        :global(.hljs-selector-tag) {
            color: #0033b3;
        }

        :global(.hljs-string) {
            color: #067d18;
        }

        :global(.hljs-template-variable),
        :global(.hljs-title),
        :global(.hljs-variable) {
            color: #830091;
        }
    }

    [dark] .highlightedCode {
        :global(.hljs) {
            color: var(--foreground);
        }

        :global(.hljs-attr),
        :global(.hljs-attribute),
        :global(.hljs-number) {
            color: #51c0cf;
        }

        :global(.hljs-built_in),
        :global(.hljs-keyword) {
            color: #d69a6b;
        }

        :global(.hljs-meta),
        :global(.hljs-name),
        :global(.hljs-selector-class),
        :global(.hljs-selector-tag) {
            color: #2fbaa3;
        }

        :global(.hljs-string) {
            color: #6cab74;
        }

        :global(.hljs-template-variable),
        :global(.hljs-title),
        :global(.hljs-variable) {
            color: #cf84cf;
        }
    }
</style>
