<template>
    <div :class="$style.codeBlock">
        <div :class="$style.codeBlockHeader">
            <span :class="$style.codeBlockLanguage">{{ language ?? translate('flux.ai.code') }}</span>

            <button
                :class="$style.codeBlockCopy"
                type="button"
                @click="onCopyClick">
                <FluxIcon
                    :name="isCopied ? 'check' : 'copy'"
                    :size="15"/>

                <span aria-live="polite">{{ isCopied ? translate('flux.ai.copiedCode') : translate('flux.ai.copyCode') }}</span>
            </button>
        </div>

        <pre :class="$style.codeBlockContent"><code>{{ code }}</code></pre>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import { onUnmounted, ref } from 'vue';
    import { useAiTranslate } from '~flux/ai/data';
    import { copyToClipboard } from '~flux/ai/util';
    import $style from '~flux/ai/css/component/AiCodeBlock.module.scss';

    const {
        code
    } = defineProps<{
        readonly code: string;
        readonly language?: string;
    }>();

    const translate = useAiTranslate();

    const isCopied = ref(false);

    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    onUnmounted(() => clearTimeout(resetTimer));

    async function onCopyClick(): Promise<void> {
        isCopied.value = await copyToClipboard(code);

        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            isCopied.value = false;
        }, 2100);
    }
</script>
