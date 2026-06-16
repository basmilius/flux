<template>
    <Anchor
        ref="anchor"
        :class="clsx(
            disabled ? $style.formTagsInputDisabled : $style.formTagsInputEnabled,
            isCondensed && $style.isCondensed,
            isSecondary && $style.isSecondary,
            error && $style.isInvalid
        )"
        :id="id"
        role="group"
        tag-name="div"
        @click="focusInput">
        <FluxTag
            v-for="(tag, index) of modelValue"
            :key="`${tag}-${index}`"
            :color="tagColor"
            :label="tag"
            is-deletable
            @delete="removeAt(index)"/>

        <input
            ref="input"
            v-model="query"
            :class="$style.formTagsInputField"
            :name="name"
            autocomplete="off"
            :disabled="disabled"
            :placeholder="modelValue.length === 0 ? placeholder : undefined"
            :readonly="isReadonly"
            type="text"
            @input="onInput"
            @keydown="onKeyDown"
            @paste="onPaste">
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isOpen && filteredSuggestions.length > 0"
                ref="popup"
                :class="$style.formTagsInputPopup"
                :anchor="anchorRef"
                direction="vertical"
                use-anchor-width>
                <FluxMenu>
                    <FluxMenuItem
                        v-for="(suggestion, index) of filteredSuggestions"
                        :key="suggestion.value ?? index"
                        :icon-leading="suggestion.icon"
                        :is-highlighted="highlightedIndex === index"
                        :label="suggestion.label"
                        type="button"
                        @click="addSuggestion(suggestion)"/>
                </FluxMenu>
            </AnchorPopup>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { useClickOutside } from '@basmilius/common';
    import type { FluxColor, FluxFormInputBaseProps, FluxFormSelectOption } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { type ComponentPublicInstance, computed, nextTick, ref, toRef, useTemplateRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import { FluxFadeTransition } from '~flux/components/transition';
    import { Anchor, AnchorPopup } from '~flux/components/component/primitive';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxTag from './FluxTag.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<string[]>({
        default: () => []
    });

    const query = defineModel<string>('searchQuery', {
        default: ''
    });

    const {
        allowDuplicates,
        delimiters = ['Enter', ','],
        disabled: componentDisabled,
        max,
        suggestions,
        tagColor,
        validate
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isCondensed' | 'isReadonly' | 'isSecondary' | 'name' | 'placeholder'> & {
        readonly allowDuplicates?: boolean;
        readonly delimiters?: string[];
        readonly max?: number;
        readonly suggestions?: FluxFormSelectOption[];
        readonly tagColor?: FluxColor;
        readonly validate?: (value: string) => boolean;
    }>();

    const emit = defineEmits<{
        add: [string];
        remove: [string];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();

    const anchorRef = useTemplateRef<ComponentPublicInstance>('anchor');
    const popupRef = useTemplateRef<ComponentPublicInstance>('popup');
    const inputElementRef = useTemplateRef<HTMLInputElement>('input');

    const isOpen = ref(false);
    const highlightedIndex = ref(-1);

    const isMaxReached = computed(() => max !== undefined && modelValue.value.length >= max);
    const filteredSuggestions = computed(() => {
        if (!suggestions) {
            return [];
        }

        const search = query.value.trim().toLowerCase();

        return suggestions.filter(suggestion =>
            !modelValue.value.includes(suggestion.label) &&
            (search === '' || suggestion.label.toLowerCase().includes(search)));
    });

    function focusInput(): void {
        inputElementRef.value?.focus();
    }

    function addTag(rawValue: string): void {
        const value = rawValue.trim();

        if (value === '' || isMaxReached.value) {
            return;
        }

        if (!allowDuplicates && modelValue.value.includes(value)) {
            query.value = '';
            return;
        }

        if (validate && !validate(value)) {
            return;
        }

        modelValue.value = [...modelValue.value, value];
        emit('add', value);

        query.value = '';
        highlightedIndex.value = -1;
        isOpen.value = false;
    }

    function removeAt(index: number): void {
        const removed = modelValue.value[index];
        modelValue.value = modelValue.value.filter((_, i) => i !== index);
        emit('remove', removed);
    }

    function addSuggestion(suggestion: FluxFormSelectOption): void {
        addTag(suggestion.label);
        nextTick(() => focusInput());
    }

    function onInput(): void {
        isOpen.value = query.value.trim() !== '' && filteredSuggestions.value.length > 0;
        highlightedIndex.value = -1;
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'Escape' && isOpen.value) {
            evt.preventDefault();
            isOpen.value = false;
            return;
        }

        if (isOpen.value && (evt.key === 'ArrowDown' || evt.key === 'ArrowUp')) {
            evt.preventDefault();

            const count = filteredSuggestions.value.length;

            if (count === 0) {
                return;
            }

            highlightedIndex.value = evt.key === 'ArrowDown'
                ? (highlightedIndex.value + 1) % count
                : (highlightedIndex.value - 1 + count) % count;

            return;
        }

        if (evt.key === 'Enter') {
            if (isOpen.value && highlightedIndex.value >= 0) {
                evt.preventDefault();
                addSuggestion(filteredSuggestions.value[highlightedIndex.value]);
                return;
            }

            if (delimiters.includes('Enter')) {
                evt.preventDefault();
                addTag(query.value);
            }

            return;
        }

        if (evt.key.length === 1 && delimiters.includes(evt.key)) {
            evt.preventDefault();
            addTag(query.value);
            return;
        }

        if (evt.key === 'Backspace' && query.value === '' && modelValue.value.length > 0) {
            removeAt(modelValue.value.length - 1);
        }
    }

    function onPaste(evt: ClipboardEvent): void {
        if (!evt.clipboardData) {
            return;
        }

        const separators = [...delimiters.filter(delimiter => delimiter !== 'Enter'), '\n'];
        const text = evt.clipboardData.getData('text');

        let parts = [text];

        for (const separator of separators) {
            parts = parts.flatMap(part => part.split(separator));
        }

        parts = parts.map(part => part.trim()).filter(part => part !== '');

        if (parts.length <= 1) {
            return;
        }

        evt.preventDefault();
        parts.forEach(addTag);
    }

    if (typeof window !== 'undefined') {
        useClickOutside([anchorRef, popupRef], isOpen, () => isOpen.value = false);
    }
</script>
