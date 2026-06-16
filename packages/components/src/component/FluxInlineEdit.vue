<template>
    <div :class="$style.inlineEdit">
        <template v-if="isEditing">
            <FluxFormTextArea
                v-if="multiline"
                v-model="draft"
                :class="$style.inlineEditField"
                auto-focus
                :error="error"
                :placeholder="placeholder"
                @blur="onBlur"
                @keydown="onKeyDown"/>

            <FluxFormInput
                v-else
                v-model="draft"
                :class="$style.inlineEditField"
                auto-focus
                :error="error"
                :placeholder="placeholder"
                @blur="onBlur"
                @keydown="onKeyDown"/>

            <div
                :class="$style.inlineEditActions"
                @mousedown.prevent>
                <slot
                    name="actions"
                    :save="save"
                    :cancel="cancel">
                    <FluxSecondaryButton
                        icon-leading="check"
                        @click="save"/>

                    <FluxSecondaryButton
                        icon-leading="xmark"
                        @click="cancel"/>
                </slot>
            </div>
        </template>

        <div
            v-else
            ref="display"
            :class="clsx(
                $style.inlineEditDisplay,
                isInteractive && $style.isInteractive,
                !modelValue && $style.isPlaceholder
            )"
            :role="isInteractive ? 'button' : undefined"
            :tabindex="isInteractive ? 0 : undefined"
            @click="edit"
            @keydown="onDisplayKeyDown">
            <slot
                :value="modelValue"
                :edit="edit">
                {{ modelValue || placeholder }}
            </slot>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, nextTick, ref, toRef, useTemplateRef, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormTextArea from './FluxFormTextArea.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '~flux/components/css/component/InlineEdit.module.scss';

    const modelValue = defineModel<string>({
        default: ''
    });

    const {
        disabled: componentDisabled,
        isReadonly,
        multiline = false,
        saveOnBlur = true
    } = defineProps<{
        readonly disabled?: boolean;
        readonly error?: string | null;
        readonly isReadonly?: boolean;
        readonly multiline?: boolean;
        readonly placeholder?: string;
        readonly saveOnBlur?: boolean;
    }>();

    const emit = defineEmits<{
        cancel: [];
        edit: [];
        save: [string];
    }>();

    defineSlots<{
        actions?(props: {save(): void; cancel(): void}): VNode[];
        default?(props: {value: string; edit(): void}): VNode[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const displayRef = useTemplateRef<HTMLElement>('display');

    const isEditing = ref(false);
    const draft = ref('');

    const isInteractive = computed(() => !disabled.value && !isReadonly);

    function edit(): void {
        if (!isInteractive.value) {
            return;
        }

        draft.value = modelValue.value;
        isEditing.value = true;
        emit('edit');
    }

    function close(): void {
        isEditing.value = false;
        nextTick(() => displayRef.value?.focus());
    }

    function save(): void {
        modelValue.value = draft.value;
        emit('save', draft.value);
        close();
    }

    function cancel(): void {
        emit('cancel');
        close();
    }

    function onBlur(): void {
        if (saveOnBlur && isEditing.value) {
            save();
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            cancel();
            return;
        }

        if (evt.key === 'Enter') {
            if (multiline) {
                if (evt.metaKey || evt.ctrlKey) {
                    evt.preventDefault();
                    save();
                }
            } else {
                evt.preventDefault();
                save();
            }
        }
    }

    function onDisplayKeyDown(evt: KeyboardEvent): void {
        if (!isInteractive.value) {
            return;
        }

        if (evt.key === 'Enter' || evt.key === ' ') {
            evt.preventDefault();
            edit();
        }
    }
</script>
