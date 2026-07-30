<template>
    <FluxExpandable
        :class="clsx($style.reasoning, isStreaming && $style.isStreaming)"
        :style="{'--ai-fade-duration': `${aiConfig.streaming.fadeDuration}ms`}"
        :is-opened="isExpanded"
        @toggle="isExpanded = $event">
        <template #header="{contentId, headerId, isOpen, toggle}">
            <button
                :class="clsx($style.reasoningHeader, isOpen && $style.isOpened)"
                :id="headerId"
                type="button"
                :aria-controls="contentId"
                :aria-expanded="isOpen"
                @click="toggle">
                <FluxSpinner
                    v-if="isStreaming"
                    :size="15"/>

                <FluxIcon
                    v-else
                    name="brain"
                    :size="15"/>

                <span
                    :class="$style.reasoningLabel"
                    aria-live="polite">{{ label }}</span>

                <FluxIcon
                    :class="clsx($style.reasoningChevron, isOpen && $style.isOpened)"
                    name="angle-down"
                    :size="15"/>
            </button>
        </template>

        <template #body>
            <div :class="$style.reasoningBody">
                <slot>
                    <component :is="text"/>
                </slot>
            </div>
        </template>
    </FluxExpandable>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxIcon, FluxSpinner } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed, h, type VNode } from 'vue';
    import { useTranslate } from '~flux/ai/composable/private';
    import { aiConfig } from '~flux/ai/data';
    import { renderText } from '~flux/ai/util';
    import $style from '~flux/ai/css/component/AiReasoning.module.scss';

    const isExpanded = defineModel<boolean>('isExpanded', {default: false});

    const {
        content,
        duration,
        isStreaming
    } = defineProps<{
        readonly content?: string;
        readonly duration?: number;
        readonly isStreaming?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const translate = useTranslate();

    const label = computed(() => {
        if (isStreaming) {
            return translate('flux.ai.thinking');
        }

        if (duration === undefined) {
            return translate('flux.ai.reasoning');
        }

        const seconds = Math.max(0, Math.round(duration));

        if (seconds < 60) {
            return translate('flux.ai.thoughtForSeconds', {seconds});
        }

        return translate('flux.ai.thoughtForMinutes', {minutes: Math.floor(seconds / 60), seconds: seconds % 60});
    });

    const text = computed<VNode>(() => h('p', {class: $style.reasoningText}, renderText(content ?? '', {
        fadeClass: isStreaming && aiConfig.streaming.hasFade ? $style.reasoningWord : null,
        wordIndex: 0
    })));
</script>
