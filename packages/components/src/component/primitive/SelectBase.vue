<template>
    <Anchor
        ref="anchor"
        :="$attrs"
        :class="clsx(
            $style.formSelect,
            disabled && $style.isDisabled,
            isPopupOpen && $style.isFocused,
            isSearchable && $style.isSearchable
        )"
        :id="id"
        :aria-disabled="disabled ? true : undefined"
        tabindex="0"
        tag-name="div"
        @click="toggle()"
        @keydown="onKeyDown"
        @keyup="onKeyUp">
        <template v-if="!isMultiple && selected[0]">
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

        <template v-else-if="placeholder">
            <span :class="$style.formSelectPlaceholder">
                {{ placeholder }}
            </span>
        </template>

        <FluxSpinner
            v-if="isLoading"
            :class="$style.formSelectIcon"
            :size="16"/>

        <FluxIcon
            v-else
            :class="$style.formSelectIcon"
            name="angle-down"/>
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isPopupOpen && !disabled"
                ref="anchorPopup"
                :class="clsx(
                    $style.formSelectPopup,
                    isKeyboardAction && $style.isKeyboardAction,
                    isSearchable && $style.isSearchable
                )"
                :anchor="anchorRef"
                direction="vertical"
                use-anchor-width>
                <FluxFormInput
                    v-if="isSearchable"
                    v-model="modelSearch"
                    ref="searchInputElement"
                    auto-complete="off"
                    :class="$style.formSelectInput"
                    type="search"
                    icon-trailing="magnifying-glass"
                    :placeholder="translate('flux.search')"
                    @keydown="onKeyDown"/>

                <FluxMenu v-if="!isLoading && options.length === 0">
                    <FluxMenuSubHeader :label="translate('flux.noItems')"/>
                </FluxMenu>

                <FluxMenu v-else>
                    <template
                        v-for="([item, subItems], index) of options"
                        :key="`group-${index}`">
                        <FluxMenuGroup>
                            <FluxMenuSubHeader
                                v-if="isFluxFormSelectGroup(item)"
                                :icon-leading="item.icon"
                                :label="item.label"/>

                            <template v-for="(subItem, index) of subItems">
                                <FluxMenuItem
                                    v-if="isFluxFormSelectOption(subItem)"
                                    ref="optionElements"
                                    :key="index"
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
                            :key="`item-${index}`"
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
    import { unrefTemplateElement, useClickOutside } from '@flux-ui/internals';
    import type { FluxFormSelectOption, FluxFormSelectOptions } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { type ComponentPublicInstance, computed, nextTick, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import { useTranslate } from '$flux/composable/private';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '$flux/data';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxFormInput from '$flux/component/FluxFormInput.vue';
    import FluxIcon from '$flux/component/FluxIcon.vue';
    import FluxMenu from '$flux/component/FluxMenu.vue';
    import FluxMenuGroup from '$flux/component/FluxMenuGroup.vue';
    import FluxMenuItem from '$flux/component/FluxMenuItem.vue';
    import FluxMenuSubHeader from '$flux/component/FluxMenuSubHeader.vue';
    import FluxSpinner from '$flux/component/FluxSpinner.vue';
    import FluxTag from '$flux/component/FluxTag.vue';
    import Anchor from './Anchor.vue';
    import AnchorPopup from './AnchorPopup.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const INITIAL_HIGHLIGHTED_INDEX = -1;

    const emit = defineEmits<{
        keyDown: [KeyboardEvent];
        deselect: [string | number | null];
        select: [string | number | null];
        search: [string];
        close: [];
        open: [];
    }>();

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    defineOptions({
        inheritAttrs: false
    });

    const {
        disabled: componentDisabled,
        isMultiple,
        options,
        selected
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isLoading?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FluxFormSelectOptions[];
        readonly placeholder?: string;
        readonly selected: FluxFormSelectOption[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();
    const translate = useTranslate();

    const anchorRef = useTemplateRef<ComponentPublicInstance>('anchor');
    const anchorPopupRef = useTemplateRef('anchorPopup');
    const optionElementRefs = useTemplateRef<typeof FluxMenuItem[]>('optionElements');
    const searchInputElementRef = useTemplateRef<ComponentPublicInstance<typeof FluxFormInput>>('searchInputElement');

    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);
    const isKeyboardAction = ref(false);
    const isPopupOpen = ref(false);

    const focusElement = computed(() => unrefTemplateElement(searchInputElementRef) ?? unrefTemplateElement(anchorRef));
    const highlightedId = computed(() => unref(rawOptions)[unref(highlightedIndex)]?.value);
    const rawOptions = computed(() => options.map(group => group[1]).flat());

    useClickOutside([anchorRef, anchorPopupRef], isPopupOpen, () => isPopupOpen.value = false);
    useClickOutside(anchorRef, isPopupOpen, () => unref(focusElement)?.focus());

    function deselect(id: string | number | null): void {
        emit('deselect', id);

        nextTick(() => unref(focusElement)?.focus());
    }

    function select(id: string | number | null): void {
        emit('select', id);

        !isMultiple && (isPopupOpen.value = false);

        highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
        modelSearch.value = '';

        nextTick(() => unref(focusElement)?.focus());
    }

    function toggle(): void {
        if (unref(disabled)) {
            return;
        }

        isPopupOpen.value = !unref(isPopupOpen);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        emit('keyDown', evt);

        if (!unref(isPopupOpen)) {
            if (evt.key === 'Enter') {
                isPopupOpen.value = true;
            }

            return;
        }

        isKeyboardAction.value = true;

        if (unref(highlightedIndex) === INITIAL_HIGHLIGHTED_INDEX && ['ArrowDown', 'ArrowUp'].includes(evt.key)) {
            const options = unref(optionElementRefs);
            const selectedIndex = options?.findIndex(o => 'isActive' in o.$props && o.$props.isActive);

            highlightedIndex.value = selectedIndex ?? INITIAL_HIGHLIGHTED_INDEX;
        }

        switch (evt.key) {
            case 'ArrowUp':
                highlightedIndex.value = Math.max(0, unref(highlightedIndex) - 1);
                break;

            case 'ArrowDown':
                highlightedIndex.value = Math.min(unref(rawOptions).length - 1, unref(highlightedIndex) + 1);
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
                id && select(id);
                break;

            case 'Escape':
                isPopupOpen.value = false;
                break;

            case 'Tab':
                isPopupOpen.value = false;
                return;

            default:
                if (evt.key.match(/[a-z]/)) {
                    highlightedIndex.value = unref(rawOptions).findIndex(o => o.label.toLowerCase().startsWith(evt.key));
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

    watch(highlightedIndex, highlightedIndex => {
        const options = unref(optionElementRefs)!;
        options[highlightedIndex]?.$el.scrollIntoView({
            block: 'center'
        });
    });

    watch(isPopupOpen, isPopupOpen => {
        if (!isPopupOpen) {
            emit('close');
            return;
        }

        nextTick(() => {
            const searchInput = unref(searchInputElementRef);
            searchInput?.focus();
        });

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

    watch([() => options, isPopupOpen], () => highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX);
</script>
