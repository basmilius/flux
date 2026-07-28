<template>
    <div
        :class="clsx($style.usage, isCompact && $style.isCompact)"
        role="group"
        :aria-label="translate('flux.ai.usage')">
        <dl
            v-if="hasFigures"
            :class="$style.usageFigures">
            <div
                v-if="inputTokens !== undefined"
                :class="$style.usageFigure">
                <dt :class="$style.usageLabel">
                    {{ translate('flux.ai.inputTokens') }}
                </dt>

                <dd :class="$style.usageValue">
                    {{ format(inputTokens) }}
                </dd>
            </div>

            <div
                v-if="outputTokens !== undefined"
                :class="$style.usageFigure">
                <dt :class="$style.usageLabel">
                    {{ translate('flux.ai.outputTokens') }}
                </dt>

                <dd :class="$style.usageValue">
                    {{ format(outputTokens) }}
                </dd>
            </div>

            <div
                v-if="cost"
                :class="$style.usageFigure">
                <dt :class="$style.usageLabel">
                    {{ translate('flux.ai.cost') }}
                </dt>

                <dd :class="$style.usageValue">
                    {{ cost }}
                </dd>
            </div>
        </dl>

        <div
            v-if="limit !== undefined"
            :class="$style.usageLimit">
            <FluxProgressBar
                :class="$style.usageLimitBar"
                :color="limitColor"
                :max="limit"
                :value="totalTokens"/>

            <p :class="$style.usageLimitLabel">
                {{ translate('flux.ai.tokenLimitUsage', {limit: format(limit), used: format(totalTokens)}) }}
            </p>

            <p
                v-if="limitState"
                :class="clsx($style.usageLimitNotice, limitState === 'reached' && $style.isReached)">
                <FluxIcon
                    name="triangle-exclamation"
                    :size="14"/>

                {{ limitState === 'reached' ? translate('flux.ai.tokenLimitReached') : translate('flux.ai.tokenLimitNear') }}
            </p>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxProgressBar } from '@flux-ui/components';
    import { isSSR } from '@flux-ui/internals';
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, unref } from 'vue';
    import { useAiTranslate } from '~flux/ai/data';
    import $style from '~flux/ai/css/component/AiUsage.module.scss';

    const {
        cost,
        inputTokens,
        limit,
        outputTokens
    } = defineProps<{
        readonly cost?: string;
        readonly inputTokens?: number;
        readonly isCompact?: boolean;
        readonly limit?: number;
        readonly outputTokens?: number;
    }>();

    const translate = useAiTranslate();

    const formatter = computed(() => new Intl.NumberFormat(isSSR ? undefined : navigator.language));

    const hasFigures = computed(() => inputTokens !== undefined || outputTokens !== undefined || !!cost);

    const totalTokens = computed(() => (inputTokens ?? 0) + (outputTokens ?? 0));

    const limitState = computed(() => {
        if (!limit) {
            return undefined;
        }

        const ratio = unref(totalTokens) / limit;

        if (ratio >= 1) {
            return 'reached';
        }

        if (ratio >= .9) {
            return 'near';
        }

        return undefined;
    });

    const limitColor = computed<FluxColor>(() => {
        switch (unref(limitState)) {
            case 'reached':
                return 'danger';

            case 'near':
                return 'warning';

            default:
                return 'primary';
        }
    });

    function format(value: number): string {
        return unref(formatter).format(value);
    }
</script>
