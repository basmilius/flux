<template>
    <FluxExpandable
        :class="clsx($style.aiToolCall, STATUS_CLASS[status])"
        :is-opened="isExpanded"
        @toggle="isExpanded = $event">
        <template #header="{contentId, headerId, isOpen, toggle}">
            <button
                :id="headerId"
                :class="$style.aiToolCallHeader"
                type="button"
                :aria-controls="contentId"
                :aria-expanded="isOpen"
                @click="toggle">
                <FluxIcon
                    :class="clsx($style.aiToolCallChevron, isOpen && $style.isOpen)"
                    name="angle-right"
                    :size="12"/>

                <span
                    :class="$style.aiToolCallDot"
                    aria-hidden="true"/>

                <span :class="$style.aiToolCallName">
                    {{ name }}<span :class="$style.aiToolCallSignature">({{ signature }})</span>
                </span>

                <span :class="clsx($style.aiToolCallStatus, status === 'success' && $style.isHidden)">{{ statusLabel }}</span>

                <span
                    v-if="durationLabel"
                    :class="$style.aiToolCallDuration">{{ durationLabel }}</span>
            </button>
        </template>

        <template #body>
            <div :class="$style.aiToolCallBody">
                <section
                    v-if="formattedArguments !== null || $slots.arguments"
                    :class="$style.aiToolCallSection">
                    <div :class="$style.aiToolCallSectionHeader">
                        <span :class="$style.aiToolCallSectionLabel">{{ translate('flux.ai.toolArguments') }}</span>

                        <button
                            v-if="formattedArguments !== null"
                            :class="$style.aiToolCallAction"
                            type="button"
                            @click="onCopyClick('arguments')">
                            <FluxIcon
                                :name="copied === 'arguments' ? 'check' : 'copy'"
                                :size="12"/>

                            {{ copied === 'arguments' ? translate('flux.ai.toolCopied') : translate('flux.ai.toolCopy') }}
                        </button>
                    </div>

                    <slot
                        name="arguments"
                        v-bind="{value: formattedArguments}">
                        <pre :class="$style.aiToolCallOutput">{{ formattedArguments }}</pre>
                    </slot>
                </section>

                <section
                    v-if="result !== undefined || $slots.result"
                    :class="$style.aiToolCallSection">
                    <div :class="$style.aiToolCallSectionHeader">
                        <span :class="$style.aiToolCallSectionLabel">{{ translate('flux.ai.toolResult') }}</span>

                        <button
                            v-if="result !== undefined"
                            :class="$style.aiToolCallAction"
                            type="button"
                            @click="onCopyClick('result')">
                            <FluxIcon
                                :name="copied === 'result' ? 'check' : 'copy'"
                                :size="12"/>

                            {{ copied === 'result' ? translate('flux.ai.toolCopied') : translate('flux.ai.toolCopy') }}
                        </button>
                    </div>

                    <slot
                        name="result"
                        v-bind="{value: result ?? null}">
                        <pre :class="$style.aiToolCallOutput">{{ visibleResult }}</pre>

                        <button
                            v-if="isResultTruncatable"
                            :class="$style.aiToolCallMore"
                            type="button"
                            @click="isResultExpanded = !isResultExpanded">
                            {{ isResultExpanded ? translate('flux.ai.toolShowLess') : translate('flux.ai.toolShowFullResult') }}
                        </button>
                    </slot>
                </section>
            </div>
        </template>
    </FluxExpandable>
</template>

<script
    lang="ts"
    setup>
    import { copyToClipboard } from '@basmilius/utils';
    import { FluxExpandable, FluxIcon } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed, onUnmounted, ref, type VNode } from 'vue';
    import { useTranslate } from '~flux/ai/composable/private';
    import { aiConfig, type FluxAiTranslation } from '~flux/ai/data';
    import $style from '~flux/ai/css/component/AiToolCall.module.scss';

    type FluxAiToolCallSection = 'arguments' | 'result';
    type FluxAiToolCallStatus = 'running' | 'success' | 'error';

    const isExpanded = defineModel<boolean>('isExpanded', {default: false});

    const {
        arguments: toolArguments,
        duration,
        result,
        status = 'success'
    } = defineProps<{
        readonly arguments?: string | Record<string, unknown>;
        readonly duration?: number;
        readonly name: string;
        readonly result?: string;
        readonly status?: FluxAiToolCallStatus;
    }>();

    defineSlots<{
        arguments(props: { readonly value: string | null }): VNode[];
        result(props: { readonly value: string | null }): VNode[];
    }>();

    const translate = useTranslate();

    const SIGNATURE_LIMIT = 60;
    const VALUE_LIMIT = 24;

    const STATUS_CLASS: Readonly<Record<FluxAiToolCallStatus, string>> = Object.freeze({
        running: $style.isRunning,
        success: $style.isSuccess,
        error: $style.isError
    });

    const STATUS_LABEL: Readonly<Record<FluxAiToolCallStatus, FluxAiTranslation>> = Object.freeze({
        running: 'flux.ai.toolRunning',
        success: 'flux.ai.toolSucceeded',
        error: 'flux.ai.toolFailed'
    });

    const copied = ref<FluxAiToolCallSection | null>(null);
    const isResultExpanded = ref(false);

    let copiedTimer = 0;

    const durationLabel = computed(() => duration === undefined ? null : translate('flux.ai.toolDuration', {duration: duration.toFixed(duration < 10 ? 1 : 0)}));
    const formattedArguments = computed(() => toolArguments === undefined ? null : formatJson(toolArguments));
    const isResultTruncatable = computed(() => (result?.length ?? 0) > aiConfig.toolCall.resultLimit);
    const signature = computed(() => summarizeArguments(toolArguments));
    const statusLabel = computed(() => translate(STATUS_LABEL[status]));

    const visibleResult = computed(() => {
        if (result === undefined) {
            return null;
        }

        if (isResultExpanded.value || !isResultTruncatable.value) {
            return result;
        }

        return `${result.slice(0, aiConfig.toolCall.resultLimit)}...`;
    });

    onUnmounted(() => clearTimeout(copiedTimer));

    function formatJson(value: string | Record<string, unknown>): string {
        try {
            return JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 4);
        } catch {
            return typeof value === 'string' ? value : String(value);
        }
    }

    function summarizeArguments(value: string | Record<string, unknown> | undefined): string {
        const parsed = parseArguments(value);

        if (!parsed) {
            return '';
        }

        const summary = Object.entries(parsed)
            .map(([key, entry]) => `${key}: ${summarizeValue(entry)}`)
            .join(', ');

        return summary.length > SIGNATURE_LIMIT ? `${summary.slice(0, SIGNATURE_LIMIT)}...` : summary;
    }

    function parseArguments(value: string | Record<string, unknown> | undefined): Record<string, unknown> | null {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string') {
            return value;
        }

        try {
            const parsed = JSON.parse(value);

            return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
        } catch {
            return null;
        }
    }

    function summarizeValue(value: unknown): string {
        if (typeof value === 'string') {
            return JSON.stringify(value.length > VALUE_LIMIT ? `${value.slice(0, VALUE_LIMIT)}...` : value);
        }

        if (Array.isArray(value)) {
            return `[${value.length}]`;
        }

        if (value && typeof value === 'object') {
            return '{...}';
        }

        return String(value);
    }

    async function onCopyClick(section: FluxAiToolCallSection): Promise<void> {
        const value = section === 'arguments' ? formattedArguments.value : result;

        if (value === undefined || value === null) {
            return;
        }

        if (!await copyToClipboard(value)) {
            return;
        }

        copied.value = section;

        clearTimeout(copiedTimer);
        copiedTimer = window.setTimeout(() => copied.value = null, 2000);
    }
</script>
