<template>
    <FluxProse
        :class="$style.streamingText"
        :style="{'--ai-fade-duration': `${aiConfig.streaming.fadeDuration}ms`}">
        <component :is="rendered"/>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxProse } from '@flux-ui/components';
    import { computed, defineComponent, Fragment, h, unref, type VNode } from 'vue';
    import { useStreamingMarkdown } from '~flux/ai/composable';
    import { aiConfig } from '~flux/ai/data';
    import { type MarkdownCodeProps, renderText } from '~flux/ai/util';
    import FluxAiCodeBlock from './FluxAiCodeBlock.vue';
    import $style from '~flux/ai/css/component/AiStreamingText.module.scss';

    const {
        content,
        hasMarkdown = true,
        isStreaming
    } = defineProps<{
        readonly content: string;
        readonly hasMarkdown?: boolean;
        readonly isStreaming?: boolean;
    }>();

    const slots = defineSlots<{
        code(props: MarkdownCodeProps): any;
    }>();

    const CodeBlock = defineComponent((props: {
        readonly code: string;
        readonly language?: string;
    }) => () => {
        const overridden = slots.code?.({code: props.code, language: props.language});

        if (overridden?.length) {
            return overridden;
        }

        return h(FluxAiCodeBlock, {
            code: props.code,
            language: props.language
        });
    }, {
        props: ['code', 'language']
    });

    const fadeClass = computed(() => aiConfig.streaming.hasFade ? $style.streamingTextWord : null);

    const {nodes} = useStreamingMarkdown({
        content: () => content,
        fadeClass,
        isStreaming: () => isStreaming === true,
        renderCode
    });

    const rendered = computed<VNode>(() => {
        if (!hasMarkdown) {
            const context = {fadeClass: isStreaming ? unref(fadeClass) : null, renderCode, wordIndex: 0};

            return h('p', {class: $style.streamingTextPlain}, renderText(content, context));
        }

        return h(Fragment, unref(nodes));
    });

    function renderCode(props: MarkdownCodeProps): VNode {
        return h(CodeBlock, props);
    }
</script>
