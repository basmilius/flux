<template>
    <FluxPane class="code-preview flux-typography-aware">
        <Preview v-if="html">
            <template #body>
                <div
                    class="preview-body"
                    v-html="code"/>
            </template>
        </Preview>

        <Preview v-else-if="component">
            <Component :is="component"/>
        </Preview>

        <Preview v-else>
            <slot/>
        </Preview>

        <FluxPaneFooter>
            <HighlightedCode
                v-if="!!component || !!html || !!language"
                :code="code"
                :language="html ? 'html' : (component ? 'vue' : language!)"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneFooter } from '@basmilius/flux';
    import HighlightedCode from './HighlightedCode.vue';
    import Preview from './Preview.vue';

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
