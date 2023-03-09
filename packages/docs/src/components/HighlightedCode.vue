<template>
    <high-code
        class="highlighted-code flux-typography-aware"
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

<style lang="scss">
    code {
        font-family: jetbrains-mono, monospace;
    }

    .highlighted-code {
        margin-top: 6px;
        margin-bottom: 6px;
        border: 1px solid rgb(var(--gray-3));

        &,
        & .hljs {
            background: rgb(var(--gray-2)) !important;
            font-family: jetbrains-mono, monospace !important;
        }

        .code_area {
            padding: 9px 15px;
        }

        .code_header {
            display: none;
        }

        code {
            line-height: 1.7 !important;
        }

        pre {
            overflow: auto !important;
        }

        @at-root .flux-pane & {
            border: 0;
            border-radius: 0;

            &,
            & .hljs {
                background: transparent !important;
            }

            .code_area {
                padding: 0;
            }
        }

        .hljs {
            &-attr,
            &-attribute,
            &-number {
                color: #174ad4;
            }

            &-built_in,
            &-keyword {
                color: #0132b2;
            }

            &-meta,
            &-name,
            &-selector-class,
            &-selector-tag {
                color: #0033b3;
            }

            &-string {
                color: #067d18;
            }

            &-template-variable,
            &-title,
            &-variable {
                color: #830091;
            }
        }
    }
</style>
