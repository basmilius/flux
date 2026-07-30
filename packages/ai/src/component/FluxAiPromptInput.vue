<template>
    <div
        :class="clsx($style.aiPromptInput, disabled && $style.isDisabled)"
        role="group"
        :aria-label="translate('flux.ai.prompt')">
        <div
            v-if="slots.default"
            :class="$style.aiPromptInputHeader">
            <slot/>
        </div>

        <ul
            v-if="attachments?.length > 0"
            :class="$style.aiPromptInputAttachments"
            role="list"
            :aria-label="translate('flux.ai.attachments')">
            <li
                v-for="(file, index) of attachments"
                :key="`${index}-${file.name}`"
                :class="$style.aiPromptInputAttachment">
                <span
                    :class="$style.aiPromptInputAttachmentLabel"
                    :title="file.name">
                    {{ file.name }}
                </span>

                <button
                    :class="$style.aiPromptInputAttachmentRemove"
                    type="button"
                    :disabled="disabled"
                    :aria-label="translate('flux.ai.removeAttachment', {name: file.name})"
                    @click="onRemoveAttachmentClick(index)">
                    <FluxIcon
                        name="xmark"
                        :size="14"/>
                </button>
            </li>
        </ul>

        <textarea
            v-model="modelValue"
            ref="field"
            :class="$style.aiPromptInputField"
            rows="1"
            :disabled="disabled"
            :placeholder="placeholder ?? translate('flux.ai.promptPlaceholder')"
            :style="{
                '--max-rows': maxRows
            }"
            :aria-label="translate('flux.ai.promptMessage')"
            @compositionend="isComposing = false"
            @compositionstart="isComposing = true"
            @keydown="onKeyDown"/>

        <div :class="$style.aiPromptInputActions">
            <FluxSecondaryButton
                v-if="isAttachable"
                :disabled="disabled"
                icon-leading="paperclip"
                size="small"
                :aria-label="translate('flux.ai.attach')"
                @click="onAttachClick"/>

            <slot name="actions"/>

            <FluxSecondaryButton
                v-if="isStreaming"
                :class="$style.aiPromptInputSubmit"
                icon-leading="stop"
                size="small"
                :aria-label="translate('flux.ai.stop')"
                @click="$emit('stop')"/>

            <FluxPrimaryButton
                v-else
                :class="$style.aiPromptInputSubmit"
                :disabled="!canSubmit"
                icon-leading="arrow-up"
                size="small"
                :aria-label="translate('flux.ai.send')"
                @click="submit"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxPrimaryButton, FluxSecondaryButton, useDisabled } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed, ref, toRef, unref, useTemplateRef, type VNode } from 'vue';
    import { useTranslate } from '~flux/ai/composable/private';
    import $style from '~flux/ai/css/component/AiPromptInput.module.scss';

    const emit = defineEmits<{
        stop: [];
        submit: [string];
    }>();

    const modelValue = defineModel<string>({
        default: ''
    });

    const attachments = defineModel<File[]>('attachments');

    const {
        accept,
        disabled: componentDisabled,
        isStreaming,
        maxRows = 10
    } = defineProps<{
        readonly accept?: string;
        readonly disabled?: boolean;
        readonly isStreaming?: boolean;
        readonly maxRows?: number;
        readonly placeholder?: string;
    }>();

    const slots = defineSlots<{
        default?(): VNode[];
        actions?(): VNode[];
    }>();

    const translate = useTranslate();

    const fieldRef = useTemplateRef<HTMLTextAreaElement>('field');

    const isComposing = ref(false);

    const disabled = useDisabled(toRef(() => componentDisabled));

    const canSubmit = computed(() => !unref(disabled) && !isStreaming && unref(modelValue).trim().length > 0);
    const isAttachable = computed(() => Array.isArray(unref(attachments)));

    function blur(): void {
        unref(fieldRef)?.blur();
    }

    function focus(): void {
        unref(fieldRef)?.focus();
    }

    function submit(): void {
        if (!unref(canSubmit)) {
            return;
        }

        emit('submit', unref(modelValue).trim());
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Enter' || evt.shiftKey || evt.altKey || evt.ctrlKey || evt.metaKey) {
            return;
        }

        // Not every browser sets `isComposing` when an IME accepts its candidate with Enter.
        if (unref(isComposing) || evt.isComposing) {
            return;
        }

        if (!unref(canSubmit)) {
            return;
        }

        evt.preventDefault();
        submit();
    }

    function onAttachClick(): void {
        if (unref(disabled)) {
            return;
        }

        const input = document.createElement('input');
        input.multiple = true;
        input.type = 'file';

        if (accept) {
            input.accept = accept;
        }

        input.addEventListener('change', onFilesSelected, {once: true});

        try {
            input.showPicker();
        } catch {
            input.click();
        }
    }

    function onFilesSelected(evt: Event): void {
        const files = (evt.target as HTMLInputElement).files;

        if (!files || files.length === 0) {
            return;
        }

        attachments.value = [...(unref(attachments) ?? []), ...files];
    }

    function onRemoveAttachmentClick(index: number): void {
        attachments.value = (unref(attachments) ?? []).filter((_, at) => at !== index);
    }

    defineExpose({
        blur,
        focus
    });
</script>
