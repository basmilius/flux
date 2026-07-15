<template>
    <div
        ref="root"
        :class="$style.inlineEdit"
        tabindex="-1">
        <template v-if="isEditing">
            <FluxFormTextArea
                v-if="multiline"
                v-model="draft"
                ref="field"
                :class="$style.inlineEditField"
                :error="error"
                :placeholder="placeholder"
                @blur="onBlur"
                @keydown="onKeyDown"/>

            <FluxFormInput
                v-else
                v-model="draft"
                ref="field"
                :class="$style.inlineEditField"
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

    const emit = defineEmits<{
        cancel: [];
        edit: [];
        save: [string];
    }>();

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

    defineSlots<{
        actions?(props: {save(): void; cancel(): void}): VNode[];
        default?(props: {value: string; edit(): void}): VNode[];
    }>();

    const rootRef = useTemplateRef<HTMLElement>('root');
    const displayRef = useTemplateRef<HTMLElement>('display');
    const fieldRef = useTemplateRef<{focus(): void}>('field');

    const isEditing = ref(false);
    const isCancelling = ref(false);
    const draft = ref('');

    const disabled = useDisabled(toRef(() => componentDisabled));

    const isInteractive = computed(() => !disabled.value && !isReadonly);

    function edit(): void {
        if (!isInteractive.value) {
            return;
        }

        draft.value = modelValue.value;
        isCancelling.value = false;
        isEditing.value = true;
        emit('edit');

        nextTick(() => fieldRef.value?.focus());
    }

    function close(): void {
        isEditing.value = false;

        nextTick(() => {
            if (isInteractive.value && displayRef.value) {
                displayRef.value.focus();
            } else {
                rootRef.value?.focus();
            }
        });
    }

    function save(): void {
        modelValue.value = draft.value;
        emit('save', draft.value);
        close();
    }

    function cancel(): void {
        isCancelling.value = true;
        emit('cancel');
        close();
    }

    function onBlur(): void {
        if (!saveOnBlur || !isEditing.value || isCancelling.value) {
            return;
        }

        requestAnimationFrame(() => {
            if (!saveOnBlur || !isEditing.value || isCancelling.value) {
                return;
            }

            if (rootRef.value?.contains(document.activeElement)) {
                return;
            }

            save();
        });
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
