<template>
    <Anchor
        ref="anchor"
        :="$attrs"
        :class="clsx(
            $style.formSelect,
            disabled && $style.isDisabled,
            isPopupOpen && $style.isFocused
        )"
        :id="isSearchOpen ? undefined : id"
        :role="isSearchOpen ? undefined : 'combobox'"
        :aria-activedescendant="isPopupOpen && !isSearchOpen && activeDescendant ? activeDescendant : undefined"
        :aria-controls="isPopupOpen && !isSearchOpen ? popupId : undefined"
        :aria-describedby="describedBy"
        :aria-disabled="disabled ? true : undefined"
        :aria-expanded="isSearchOpen ? undefined : isPopupOpen"
        :aria-haspopup="isSearchOpen ? undefined : 'menu'"
        :aria-readonly="isReadonly ? true : undefined"
        :tabindex="disabled ? -1 : 0"
        tag-name="div"
        @click="toggle()"
        @keydown="onKeyDown"
        @keyup="onKeyUp">
        <template v-if="isSearchOpen && !isMultiple">
            <FluxIcon
                :class="$style.formSelectSearchIcon"
                name="magnifying-glass"
                :size="15"/>

            <input
                v-model="modelSearch"
                ref="searchInput"
                :="searchInputAttributes"
                :placeholder="selected[0]?.label ?? placeholder ?? translate('flux.search')"
                @click.stop/>
        </template>

        <template v-else-if="!isMultiple && selected[0]">
            <FluxMenuItem
                :class="$style.formSelectSelected"
                :command="selected[0].command"
                :command-icon="selected[0].commandIcon"
                :icon-leading="selected[0].icon"
                :image-alt="selected[0].imageAlt"
                :image-src="selected[0].imageSrc"
                :label="selected[0].label"
                tabindex="-1"/>
        </template>

        <template v-else-if="isMultiple && selected[0]">
            <FluxTag
                v-for="option of selected"
                :key="option.value ?? 'null option'"
                :label="option.label"
                is-deletable
                @delete="deselect(option.value)"/>
        </template>

        <template v-else-if="placeholder && !isSearchOpen">
            <span :class="$style.formSelectPlaceholder">
                {{ placeholder }}
            </span>
        </template>

        <input
            v-if="isSearchOpen && isMultiple"
            v-model="modelSearch"
            ref="searchInput"
            :="searchInputAttributes"
            :placeholder="selected.length === 0 ? placeholder ?? translate('flux.search') : undefined"
            @click.stop/>

        <FluxSpinner
            v-if="isLoading"
            :class="$style.formSelectIcon"
            :size="15"/>

        <FluxIcon
            v-else
            :class="$style.formSelectIcon"
            name="angles-up-down"
            :size="12"/>
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isPopupOpen && !disabled"
                ref="anchorPopup"
                :id="popupId"
                :class="clsx(
                    $style.formSelectPopup,
                    isKeyboardAction && $style.isKeyboardAction
                )"
                :anchor="anchorRef"
                direction="vertical"
                :margin="6"
                use-anchor-width>
                <FluxMenu v-if="canCreate">
                    <FluxMenuItem
                        :is-highlighted="highlightedIndex === INITIAL_HIGHLIGHTED_INDEX"
                        icon-leading="plus"
                        :label="translate('flux.createOption', {value: trimmedSearch})"
                        type="button"
                        @click="create()"/>
                </FluxMenu>

                <FluxMenu v-if="!isLoading && options.length === 0 && !canCreate">
                    <FluxMenuSubHeader :label="translate('flux.noItems')"/>
                </FluxMenu>

                <FluxMenu v-else-if="options.length > 0">
                    <template
                        v-for="([item, subItems], index) of options"
                        :key="`group-${index}`">
                        <FluxMenuGroup>
                            <FluxMenuSubHeader
                                v-if="isFluxFormSelectGroup(item)"
                                :icon-leading="item.icon"
                                :label="item.label"/>

                            <template
                                v-for="subItem of subItems"
                                :key="subItem.value ?? 'null option'">
                                <FluxMenuItem
                                    v-if="isFluxFormSelectOption(subItem)"
                                    ref="optionElements"
                                    :id="optionId(subItem.value)"
                                    :command="subItem.command"
                                    :command-icon="subItem.commandIcon"
                                    :icon-leading="subItem.icon"
                                    :image-alt="subItem.imageAlt"
                                    :image-src="subItem.imageSrc"
                                    :is-active="!!selected.find(so => so.value === subItem.value)"
                                    :is-highlighted="highlightedId === subItem.value"
                                    :label="subItem.label"
                                    type="button"
                                    @click="select(subItem.value)"/>
                            </template>
                        </FluxMenuGroup>

                        <FluxMenuItem
                            v-if="isFluxFormSelectOption(item)"
                            ref="optionElements"
                            :key="item.value ?? 'null option'"
                            :id="optionId(item.value)"
                            :command="item.command"
                            :command-icon="item.commandIcon"
                            :icon-leading="item.icon"
                            :image-alt="item.imageAlt"
                            :image-src="item.imageSrc"
                            :is-active="!!selected.find(so => so.value === item.value)"
                            :is-highlighted="highlightedId === item.value"
                            :label="item.label"
                            type="button"
                            @click="select(item.value)"/>
                    </template>
                </FluxMenu>
            </AnchorPopup>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { unwrapElement } from '@basmilius/common';
    import type { FluxFormSelectOption, FluxFormSelectOptions } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { type ComponentPublicInstance, computed, type InputHTMLAttributes, nextTick, onMounted, ref, toRef, unref, useId, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import { INITIAL_HIGHLIGHTED_INDEX, useDropdownPopup, useTranslate } from '~flux/components/composable/private';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '~flux/components/data';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxIcon from '../FluxIcon.vue';
    import FluxMenu from '../menu/FluxMenu.vue';
    import FluxMenuGroup from '../menu/FluxMenuGroup.vue';
    import FluxMenuItem from '../menu/FluxMenuItem.vue';
    import FluxMenuSubHeader from '../menu/FluxMenuSubHeader.vue';
    import FluxSpinner from '../FluxSpinner.vue';
    import FluxTag from '../FluxTag.vue';
    import Anchor from './Anchor.vue';
    import AnchorPopup from './AnchorPopup.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    defineOptions({
        inheritAttrs: false
    });

    const emit = defineEmits<{
        keyDown: [KeyboardEvent];
        deselect: [string | number | null];
        select: [string | number | null];
        create: [string];
        search: [string];
        close: [];
        open: [];
    }>();

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const {
        autoFocus,
        disabled: componentDisabled,
        isCreatable,
        isLoading,
        isMultiple,
        isReadonly,
        isSearchable,
        options,
        selected
    } = defineProps<{
        readonly autoFocus?: boolean;
        readonly disabled?: boolean;
        readonly isCreatable?: boolean;
        readonly isLoading?: boolean;
        readonly isMultiple?: boolean;
        readonly isReadonly?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FluxFormSelectOptions[];
        readonly placeholder?: string;
        readonly selected: FluxFormSelectOption[];
    }>();

    const anchorRef = useTemplateRef<ComponentPublicInstance>('anchor');
    const anchorPopupRef = useTemplateRef<ComponentPublicInstance>('anchorPopup');
    const optionElementRefs = useTemplateRef<typeof FluxMenuItem[]>('optionElements');
    const searchInputRef = useTemplateRef<HTMLInputElement>('searchInput');

    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);
    const isKeyboardAction = ref(false);
    const navigatedValue = ref<string | number | null>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id, describedBy} = useFormFieldInjection();
    const translate = useTranslate();
    const popupId = useId();

    const focusElement = computed(() => unref(searchInputRef) ?? unwrapElement(anchorRef));
    const rawOptions = computed(() => options.map(group => group[1]).flat());
    const highlightedId = computed(() => unref(rawOptions)[unref(highlightedIndex)]?.value);
    const activeDescendant = computed(() => unref(highlightedId) !== undefined ? optionId(unref(highlightedId)) : '');
    const trimmedSearch = computed(() => unref(modelSearch).trim());
    const canCreate = computed(() => {
        if (!isCreatable || trimmedSearch.value === '') {
            return false;
        }

        const query = trimmedSearch.value.toLowerCase();
        return !unref(rawOptions).some(o => o.label.toLowerCase() === query);
    });

    const {
        isOpen: isPopupOpen,
        toggle,
        onKeyDownBase
    } = useDropdownPopup({
        anchorRef,
        popupRef: anchorPopupRef,
        focusElement,
        disabled,
        readonly: toRef(() => !!isReadonly)
    });

    const isSearchOpen = computed(() => isSearchable && unref(isPopupOpen) && !unref(disabled));

    // While searching, the input is the combobox and takes over the field's id, so the label names it.
    const searchInputAttributes = computed((): InputHTMLAttributes => ({
        class: $style.formSelectSearchInput,
        id,
        autocomplete: 'off',
        role: 'combobox',
        'aria-activedescendant': unref(activeDescendant) || undefined,
        'aria-autocomplete': 'list',
        'aria-controls': popupId,
        'aria-describedby': unref(describedBy),
        'aria-expanded': true
    }));

    watch(highlightedIndex, highlightedIndex => {
        const options = unref(optionElementRefs)!;
        options[highlightedIndex]?.$el.scrollIntoView({
            block: 'center'
        });
    });

    watch(isPopupOpen, isPopupOpen => {
        if (!isPopupOpen) {
            modelSearch.value = '';
            emit('close');
            return;
        }

        nextTick(() => {
            const options = unref(optionElementRefs);

            if (!options || isMultiple) {
                return;
            }

            const selectedIndex = options.findIndex(o => 'isActive' in o.$props && o.$props.isActive);
            const option = options[selectedIndex];

            if (!option) {
                return;
            }

            option.$el.scrollIntoView({
                block: 'center'
            });
        });

        emit('open');
    });

    watch(modelSearch, searchQuery => emit('search', searchQuery));

    watch([isPopupOpen, trimmedSearch], () => {
        navigatedValue.value = undefined;
        highlightedIndex.value = initialHighlightedIndex();
    });

    // Results that arrive later (an async search) keep the option the user moved to with the arrows.
    watch(() => options, () => {
        const navigatedIndex = unref(navigatedValue) !== undefined
            ? unref(rawOptions).findIndex(option => option.value === unref(navigatedValue))
            : INITIAL_HIGHLIGHTED_INDEX;

        highlightedIndex.value = navigatedIndex >= 0 ? navigatedIndex : initialHighlightedIndex();
    });

    onMounted(() => {
        if (autoFocus) {
            nextTick(() => unwrapElement(anchorRef)?.focus());
        }
    });

    // A searchable select keeps an option highlighted, so Enter picks the first result. Before the
    // first keystroke that is the current value of a single select. When the query can be created,
    // nothing is highlighted, so Enter creates it.
    function initialHighlightedIndex(): number {
        if (!unref(isSearchOpen) || unref(canCreate) || unref(rawOptions).length === 0) {
            return INITIAL_HIGHLIGHTED_INDEX;
        }

        if (!isMultiple && unref(trimmedSearch) === '') {
            const selectedIndex = unref(rawOptions).findIndex(option => option.value === selected[0]?.value);

            if (selectedIndex >= 0) {
                return selectedIndex;
            }
        }

        return 0;
    }

    function optionId(value: string | number | null): string {
        return `${popupId}-option-${value ?? 'null'}`;
    }

    function deselect(id: string | number | null): void {
        emit('deselect', id);

        nextTick(() => unref(focusElement)?.focus());
    }

    function select(id: string | number | null): void {
        emit('select', id);

        if (!isMultiple) {
            isPopupOpen.value = false;
        }

        highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
        modelSearch.value = '';

        nextTick(() => unref(focusElement)?.focus());
    }

    function create(): void {
        emit('create', trimmedSearch.value);

        if (!isMultiple) {
            isPopupOpen.value = false;
        }

        highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
        modelSearch.value = '';

        nextTick(() => unref(focusElement)?.focus());
    }

    function onKeyDown(evt: KeyboardEvent): void {
        emit('keyDown', evt);

        // Keys that confirm or browse an IME composition belong to the input method.
        if (evt.isComposing || evt.keyCode === 229) {
            return;
        }

        if (!unref(isPopupOpen)) {
            if (evt.key === 'Enter' && !unref(disabled) && !isReadonly) {
                isPopupOpen.value = true;
            }

            return;
        }

        isKeyboardAction.value = true;

        if (onKeyDownBase(evt)) {
            return;
        }

        if (unref(highlightedIndex) === INITIAL_HIGHLIGHTED_INDEX && ['ArrowDown', 'ArrowUp'].includes(evt.key)) {
            const options = unref(optionElementRefs);
            const selectedIndex = options?.findIndex(o => 'isActive' in o.$props && o.$props.isActive);

            highlightedIndex.value = selectedIndex ?? INITIAL_HIGHLIGHTED_INDEX;
        }

        switch (evt.key) {
            case 'ArrowUp':
                highlightedIndex.value = Math.max(unref(canCreate) ? INITIAL_HIGHLIGHTED_INDEX : 0, unref(highlightedIndex) - 1);
                navigatedValue.value = unref(highlightedId);
                break;

            case 'ArrowDown':
                highlightedIndex.value = Math.min(unref(rawOptions).length - 1, unref(highlightedIndex) + 1);
                navigatedValue.value = unref(highlightedId);
                break;

            case 'Backspace':
                const search = unref(modelSearch);

                if (search.length > 0 || selected.length === 0) {
                    return;
                }

                deselect(selected[selected.length - 1].value);
                break;

            case 'Enter':
                const id = unref(highlightedId);

                // The results on screen may not match the query yet.
                if (isLoading) {
                    break;
                }

                if (id !== undefined) {
                    select(id);
                } else if (unref(canCreate)) {
                    create();
                }
                break;

            default:
                // Typing and moving the caret belong to the search input; the highlight follows the results.
                if (isSearchable) {
                    return;
                }

                if (evt.key.length === 1) {
                    highlightedIndex.value = unref(rawOptions).findIndex(o => o.label.toLowerCase().startsWith(evt.key.toLowerCase()));
                } else {
                    highlightedIndex.value = -1;
                }
                return;
        }

        evt.preventDefault();
    }

    function onKeyUp(): void {
        isKeyboardAction.value = false;
    }
</script>
