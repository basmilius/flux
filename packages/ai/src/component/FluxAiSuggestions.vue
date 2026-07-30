<template>
    <ul
        :class="$style.aiSuggestions"
        role="list"
        :aria-label="translate('flux.ai.suggestions')">
        <li
            v-for="suggestion of suggestions"
            :key="suggestion.id">
            <button
                :class="$style.aiSuggestion"
                type="button"
                :disabled="disabled"
                @click="$emit('select', suggestion)">
                <FluxIcon
                    v-if="suggestion.icon"
                    :class="$style.aiSuggestionIcon"
                    :name="suggestion.icon"
                    :size="16"/>

                <span :class="$style.aiSuggestionLabel">
                    {{ suggestion.label }}
                </span>
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
    import type { FluxIconName } from '@flux-ui/types';

    export type FluxAiSuggestion = {
        readonly icon?: FluxIconName;
        readonly id: string;
        readonly label: string;
    };
</script>

<script
    lang="ts"
    setup>
    import { FluxIcon, useDisabled } from '@flux-ui/components';
    import { toRef } from 'vue';
    import { useTranslate } from '~flux/ai/composable/private';
    import $style from '~flux/ai/css/component/AiSuggestions.module.scss';

    defineEmits<{
        select: [FluxAiSuggestion];
    }>();

    const {disabled: componentDisabled} = defineProps<{
        readonly disabled?: boolean;
        readonly suggestions: readonly FluxAiSuggestion[];
    }>();

    const translate = useTranslate();

    const disabled = useDisabled(toRef(() => componentDisabled));
</script>
