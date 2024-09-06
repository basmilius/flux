<template>
    <Anchor
        ref="anchor"
        :="$attrs"
        :class="clsx(
            styles.formSelect,
            isDisabled && styles.isDisabled,
            isPopupOpen && styles.isFocused,
            isSearchable && styles.isSearchable
        )"
        :id="id"
        tabindex="0"
        tag-name="div"
        @click="toggle()"
        @keydown="onKeyDown">
        <template v-if="!isMultiple && selected[0]">
            <FluxMenuItem
                :class="styles.formSelectSelected"
                :command="selected[0].command"
                :command-icon="selected[0].commandIcon"
                :icon-before="selected[0].icon"
                :label="selected[0].label"
                tabindex="-1"/>
        </template>

        <template v-else-if="isMultiple && selected[0]">
            <FluxTag
                v-for="option of selected"
                :key="option.id ?? 'null option'"
                :label="option.label"
                is-deletable
                @delete="deselect(option.id)"/>
        </template>

        <template v-else-if="placeholder">
            <span :class="styles.formSelectPlaceholder">
                {{ placeholder }}
            </span>
        </template>

        <FluxSpinner
            v-if="isLoading"
            :class="styles.formSelectIcon"
            :size="16"/>

        <FluxIcon
            v-else
            :class="styles.formSelectIcon"
            variant="angle-down"/>
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isPopupOpen"
                ref="anchorPopup"
                :class="clsx(
                    styles.formSelectPopup,
                    isSearchable && styles.isSearchable
                )"
                :anchor="anchorRef"
                axis="vertical"
                use-anchor-width>
                <FluxFormInput
                    v-if="isSearchable"
                    v-model="modelSearch"
                    ref="searchInputElement"
                    auto-complete="off"
                    :class="styles.formSelectInput"
                    type="search"
                    icon-after="magnifying-glass"
                    :placeholder="translate('flux.search')"
                    @keydown="onKeyDown"/>

                <FluxPaneBody v-if="!isLoading && options.length === 0">
                    <em>{{ translate('flux.noItems') }}</em>
                </FluxPaneBody>

                <FluxMenu v-else>
                    <template
                        v-for="([item, subItems], index) of options"
                        :key="`group-${index}`">
                        <FluxMenuGroup>
                            <FluxMenuSubHeader
                                v-if="isFluxFormSelectGroup(item)"
                                :icon-before="item.icon"
                                :label="item.label"/>

                            <template v-for="(subItem, index) of subItems">
                                <FluxMenuItem
                                    v-if="isFluxFormSelectOption(subItem)"
                                    ref="optionElements"
                                    :key="index"
                                    :command="subItem.command"
                                    :command-icon="subItem.commandIcon"
                                    :icon-before="subItem.icon"
                                    :is-active="!!selected.find(so => so.id === subItem.id)"
                                    :is-highlighted="highlightedId === subItem.id"
                                    :label="subItem.label"
                                    type="button"
                                    @click="select(subItem.id)"/>
                            </template>
                        </FluxMenuGroup>

                        <FluxMenuItem
                            v-if="isFluxFormSelectOption(item)"
                            ref="optionElements"
                            :key="`item-${index}`"
                            :command="item.command"
                            :command-icon="item.commandIcon"
                            :icon-before="item.icon"
                            :is-active="!!selected.find(so => so.id === item.id)"
                            :is-highlighted="highlightedId === item.id"
                            :label="item.label"
                            type="button"
                            @click="select(item.id)"/>
                    </template>
                </FluxMenu>
            </AnchorPopup>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { ComponentPublicInstance, computed, nextTick, ref, unref, useTemplateRef, watch } from 'vue';
    import { useClickOutside, useFormFieldInjection } from '@/composable';
    import { type FormSelectGroup, useTranslate } from '@/composable/private';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '@/data';
    import type { FluxFormSelectOption } from '@/types';
    import { FluxFadeTransition } from '@/transition';
    import { unrefTemplateElement } from '@/util';
    import FluxFormInput from '../FluxFormInput.vue';
    import FluxIcon from '../FluxIcon.vue';
    import FluxMenu from '../FluxMenu.vue';
    import FluxMenuGroup from '../FluxMenuGroup.vue';
    import FluxMenuItem from '../FluxMenuItem.vue';
    import FluxMenuSubHeader from '../FluxMenuSubHeader.vue';
    import FluxPaneBody from '../FluxPaneBody.vue';
    import FluxSpinner from '../FluxSpinner.vue';
    import FluxTag from '../FluxTag.vue';
    import Anchor from './Anchor.vue';
    import AnchorPopup from './AnchorPopup.vue';
    import styles from '@/css/component/Form.module.scss';

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
        isMultiple,
        options,
        selected
    } = defineProps<{
        readonly isDisabled?: boolean;
        readonly isLoading?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FormSelectGroup[];
        readonly placeholder?: string;
        readonly selected: FluxFormSelectOption[];
    }>();

    const {id} = useFormFieldInjection();
    const translate = useTranslate();

    const anchorRef = useTemplateRef('anchor');
    const anchorPopupRef = useTemplateRef('anchorPopup');
    const optionElementRefs = useTemplateRef<typeof FluxMenuItem[]>('optionElements');
    const searchInputElementRef = useTemplateRef<ComponentPublicInstance<typeof FluxFormInput>>('searchInputElement');

    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);
    const isPopupOpen = ref(false);

    const focusElement = computed(() => unrefTemplateElement(searchInputElementRef) ?? unrefTemplateElement(anchorRef));
    const highlightedId = computed(() => unref(rawOptions)[unref(highlightedIndex)]?.id);
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

                deselect(selected[selected.length - 1].id);
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
                highlightedIndex.value = -1;
                return;
        }

        evt.preventDefault();
    }

    watch(highlightedIndex, highlightedIndex => {
        const options = unref(optionElementRefs)!;
        options[highlightedIndex]?.$el.scrollIntoView({
            block: 'nearest'
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

            const option = options.find(o => 'isActive' in o.$props && o.$props.isActive);
            option?.$el.scrollIntoView({
                block: 'nearest'
            });
        });

        emit('open');
    });

    watch(modelSearch, searchQuery => emit('search', searchQuery));

    watch(() => options, () => highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX);
</script>
