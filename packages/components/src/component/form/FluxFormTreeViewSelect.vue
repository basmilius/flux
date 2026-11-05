<template>
    <Anchor
        ref="anchor"
        :="$attrs"
        :class="clsx(
            $formStyle.formSelect,
            disabled && $formStyle.isDisabled,
            isPopupOpen && $formStyle.isFocused,
            isCondensed && $formStyle.isCondensed,
            isSecondary && $formStyle.isSecondary,
            error && $formStyle.isInvalid
        )"
        :id="isSearchOpen ? undefined : id"
        :role="isSearchOpen ? undefined : 'combobox'"
        :aria-activedescendant="isPopupOpen && !isSearchOpen && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined"
        :aria-controls="isPopupOpen && !isSearchOpen ? listId : undefined"
        :aria-disabled="disabled ? true : undefined"
        :aria-expanded="isSearchOpen ? undefined : isPopupOpen"
        :aria-haspopup="isSearchOpen ? undefined : 'listbox'"
        :aria-readonly="isReadonly ? true : undefined"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="describedBy"
        :tabindex="disabled ? -1 : 0"
        tag-name="div"
        @click="toggle()"
        @keydown="onKeyDown">

        <template v-if="isSearchOpen && !isMultiple">
            <FluxIcon
                :class="$formStyle.formSelectSearchIcon"
                name="magnifying-glass"
                :size="16"/>

            <input
                v-model="searchQuery"
                ref="searchInput"
                :="searchInputAttributes"
                :placeholder="selectedOptions[0]?.label ?? placeholder ?? translate('flux.search')"
                @click.stop/>
        </template>

        <template v-else-if="isMultiple && selectedOptions.length > 0">
            <FluxTag
                v-for="option in selectedOptions"
                :key="option.id"
                :label="option.label"
                is-deletable
                @delete="deselect(option.id)"/>
        </template>

        <template v-else-if="!isMultiple && selectedOptions[0]">
            <FluxMenuItem
                :class="$formStyle.formSelectSelected"
                :icon-leading="selectedOptions[0].icon"
                :label="selectedOptions[0].label"
                tabindex="-1"/>
        </template>

        <template v-else-if="placeholder && !isSearchOpen">
            <span :class="$formStyle.formSelectPlaceholder">{{ placeholder }}</span>
        </template>

        <input
            v-if="isSearchOpen && isMultiple"
            v-model="searchQuery"
            ref="searchInput"
            :="searchInputAttributes"
            :placeholder="selectedOptions.length === 0 ? placeholder ?? translate('flux.search') : undefined"
            @click.stop/>

        <FluxSpinner
            v-if="isLoading"
            :class="$formStyle.formSelectIcon"
            :size="16"/>

        <FluxIcon
            v-else
            :class="$formStyle.formSelectIcon"
            name="angles-up-down"
            :size="12"/>
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isPopupOpen && !disabled"
                ref="anchorPopup"
                :class="$formStyle.formSelectPopup"
                :anchor="anchorRef"
                direction="vertical"
                :margin="6"
                use-anchor-width>
                <div
                    :id="listId"
                    :class="$style.treeViewSelectList"
                    role="listbox"
                    :aria-multiselectable="isMultiple ? true : undefined">
                    <div
                        v-if="visibleNodes.length === 0"
                        :class="$style.treeViewSelectEmpty">
                        {{ translate('flux.noItems') }}
                    </div>

                    <template v-else>
                        <div
                            v-for="(node, nodeIndex) in visibleNodes"
                            ref="nodeElements"
                            :key="node.id"
                            :id="optionId(nodeIndex)"
                            :class="clsx(
                                $style.treeNode,
                                node.selectable !== false && !isNodeDisabled(node) && $style.isSelectable,
                                node.selectable === false && !isNodeDisabled(node) && node.hasChildren && $style.isExpandable,
                                isNodeDisabled(node) && $style.isDisabled,
                                nodeIndex === highlightedIndex && $style.isHighlighted
                            )"
                            :role="node.selectable !== false ? 'option' : 'presentation'"
                            :tabindex="node.selectable !== false ? -1 : undefined"
                            :aria-selected="node.selectable !== false ? selectedIds.has(node.id) || isLocked(node) : undefined"
                            :aria-disabled="isNodeDisabled(node) ? true : undefined"
                            @click="onNodeClick(node)"
                            @keydown.enter.prevent="onNodeClick(node)"
                            @keydown.space.prevent="onNodeClick(node)">

                            <TreeNodeRenderer
                                :node="node"
                                :expanded="isSearching || expandedIds.has(node.id)"
                                :level-colors="levelColors"
                                @expand-click="onExpandClick(node, $event)">
                                <template #trailing>
                                    <template v-if="node.selectable !== false">
                                        <FluxFormCheckbox
                                            v-if="isMultiple"
                                            :class="$style.treeNodeControl"
                                            :disabled="isNodeDisabled(node)"
                                            :model-value="selectedIds.has(node.id) || isLocked(node)"
                                            aria-hidden="true"
                                            is-readonly/>

                                        <FluxFormRadio
                                            v-else
                                            :class="$style.treeNodeControl"
                                            :disabled="isNodeDisabled(node)"
                                            :value="node.id"
                                            aria-hidden="true"/>
                                    </template>
                                </template>
                            </TreeNodeRenderer>
                        </div>
                    </template>
                </div>
            </AnchorPopup>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { unwrapElement } from '@basmilius/common';
    import type { FluxColor, FluxFormInputBaseProps, FluxFormTreeViewSelectOption, FluxFormTreeViewSelectValue } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { type ComponentPublicInstance, computed, type InputHTMLAttributes, nextTick, provide, ref, toRef, unref, useId, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import { collectExpandedIds, flattenAll, flattenSearch, flattenVisible, INITIAL_HIGHLIGHTED_INDEX, type TreeFlatNode, useDropdownPopup, useTranslate, useTreeView } from '~flux/components/composable/private';
    import { type FluxFormRadioGroupValue, FluxFormRadioGroupInjectionKey, FluxItemControlInjectionKey } from '~flux/components/data';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxIcon from '../FluxIcon.vue';
    import FluxSpinner from '../FluxSpinner.vue';
    import FluxTag from '../FluxTag.vue';
    import FluxMenuItem from '../menu/FluxMenuItem.vue';
    import { Anchor, AnchorPopup, TreeNodeRenderer } from '../primitive';
    import FluxFormCheckbox from './FluxFormCheckbox.vue';
    import FluxFormRadio from './FluxFormRadio.vue';
    import $formStyle from '~flux/components/css/component/Form.module.scss';
    import $style from '~flux/components/css/component/TreeViewSelect.module.scss';

    type FlatNode = TreeFlatNode<FluxFormTreeViewSelectOption>;

    defineOptions({
        inheritAttrs: false
    });

    const modelValue = defineModel<FluxFormTreeViewSelectValue>({required: true});

    const {
        disabled: componentDisabled,
        expandedDepth = 1,
        isCascading,
        isMultiple,
        isReadonly,
        isSearchable,
        levelColors,
        options,
        placeholder
    } = defineProps<Pick<FluxFormInputBaseProps, 'autoFocus' | 'disabled' | 'error' | 'isCondensed' | 'isLoading' | 'isReadonly' | 'isSecondary' | 'name' | 'placeholder'> & {
        readonly expandedDepth?: number;
        readonly isCascading?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly levelColors?: (FluxColor | string)[];
        readonly options: FluxFormTreeViewSelectOption[];
    }>();

    const anchorRef = useTemplateRef<ComponentPublicInstance>('anchor');
    const anchorPopupRef = useTemplateRef<ComponentPublicInstance>('anchorPopup');
    const nodeElementRefs = useTemplateRef<HTMLDivElement[]>('nodeElements');
    const searchInputRef = useTemplateRef<HTMLInputElement>('searchInput');

    const expandedIds = ref(new Set<string | number>());
    const searchQuery = ref('');

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id, describedBy} = useFormFieldInjection();
    const translate = useTranslate();
    const listId = useId();
    const radioName = useId();

    // The checkbox / radio only visualises the selection — the option row itself stays the control,
    // keeping the listbox semantics intact. Marking them as this item's control drops their own
    // label wrapper, and providing the radio group contract here gives the radios their context
    // without a role="radiogroup" element inside the listbox.
    provide(FluxItemControlInjectionKey, {
        isControl: toRef(() => true),
        register: () => undefined
    });

    provide(FluxFormRadioGroupInjectionKey, {
        get name() {
            return radioName;
        },
        modelValue: computed({
            get: () => {
                const value = unref(modelValue);
                const single = Array.isArray(value) ? value[0] : value;

                return (single ?? undefined) as FluxFormRadioGroupValue | undefined;
            },
            set: () => undefined
        }),
        disabled,
        isReadonly: toRef(() => true),
        error: toRef(() => undefined),
        select: () => undefined
    });

    const focusElement = computed(() => unref(searchInputRef) ?? unwrapElement(anchorRef));

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
        class: $formStyle.formSelectSearchInput,
        id,
        autocomplete: 'off',
        role: 'combobox',
        'aria-activedescendant': unref(highlightedIndex) >= 0 ? optionId(unref(highlightedIndex)) : undefined,
        'aria-autocomplete': 'list',
        'aria-controls': listId,
        'aria-describedby': unref(describedBy),
        'aria-expanded': true
    }));

    const selectedIds = computed(() => {
        const value = unref(modelValue);

        if (Array.isArray(value)) {
            return new Set(value);
        }

        return new Set<string | number>(value != null ? [value] : []);
    });

    const selectedOptions = computed(() => {
        const ids = unref(selectedIds);

        if (ids.size === 0) {
            return [];
        }

        return flattenAll(options).filter(node => ids.has(node.id));
    });

    const isSearching = computed(() => unref(searchQuery).trim() !== '');

    const visibleNodes = computed((): FlatNode[] => {
        const query = unref(searchQuery).toLowerCase().trim();

        if (query) {
            return flattenSearch(options, query);
        }

        return flattenVisible(options, 0, unref(expandedIds));
    });

    const {highlightedIndex, toggleExpand, onExpandClick, onKeyNavigate} = useTreeView({
        expandedIds,
        nodeElementRefs,
        visibleNodes
    });

    watch(isPopupOpen, isOpen => {
        if (!isOpen) {
            searchQuery.value = '';
            highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
            return;
        }

        // Seed the default expansion before the selection is expanded, so a deeper selection opens
        // on top of it. Merging keeps expansion from an earlier open intact.
        expandedIds.value = new Set([...unref(expandedIds), ...collectExpandedIds(options, expandedDepth)]);

        autoExpandSelected();

        nextTick(() => {
            const ids = unref(selectedIds);
            const firstSelectedIndex = unref(visibleNodes).findIndex(n => ids.has(n.id));

            if (firstSelectedIndex >= 0) {
                highlightedIndex.value = firstSelectedIndex;
            } else if (isSearchable) {
                highlightedIndex.value = firstResultIndex();
            }
        });
    });

    watch(searchQuery, () => {
        highlightedIndex.value = unref(isPopupOpen) ? firstResultIndex() : INITIAL_HIGHLIGHTED_INDEX;
    });

    // The first selectable node whose own label matches, so Enter picks it instead of the
    // ancestor that is only shown to keep the hierarchy readable.
    function firstResultIndex(): number {
        const nodes = unref(visibleNodes);
        const query = unref(searchQuery).toLowerCase().trim();
        const isCandidate = (node: FlatNode) => node.selectable !== false && !isNodeDisabled(node);
        const matchIndex = nodes.findIndex(node => isCandidate(node) && node.label.toLowerCase().includes(query));

        return matchIndex >= 0 ? matchIndex : nodes.findIndex(isCandidate);
    }

    function optionId(index: number): string {
        return `${listId}-option-${index}`;
    }

    function select(nodeId: string | number): void {
        if (unref(isMultiple)) {
            const current = [...unref(selectedIds)];
            if (current.includes(nodeId)) {
                modelValue.value = current.filter(v => v !== nodeId);
            } else {
                modelValue.value = [...current, nodeId];
            }
        } else {
            modelValue.value = nodeId;
            isPopupOpen.value = false;
        }
    }

    function deselect(nodeId: string | number): void {
        const current = unref(modelValue);
        if (Array.isArray(current)) {
            modelValue.value = current.filter(v => v !== nodeId);
        }
        nextTick(() => unref(focusElement)?.focus());
    }

    // Selecting a parent implicitly covers its whole subtree, so its descendants are locked — but
    // only in multi-select mode, since single-select nodes stay independently selectable. Locked
    // nodes render as checked without entering the model value; only explicit picks do.
    function isLocked(node: FlatNode): boolean {
        if (!isCascading || !isMultiple) {
            return false;
        }

        const ids = unref(selectedIds);

        return node.ancestorIds.some(ancestorId => ids.has(ancestorId));
    }

    function isNodeDisabled(node: FlatNode): boolean {
        return node.disabled === true || isLocked(node);
    }

    function onNodeClick(node: FlatNode): void {
        if (isNodeDisabled(node)) {
            return;
        }

        if (node.selectable !== false) {
            select(node.id);
            if (node.hasChildren && !unref(expandedIds).has(node.id)) {
                toggleExpand(node.id);
            }
        } else if (node.hasChildren) {
            toggleExpand(node.id);
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        // Keys that confirm or browse an IME composition belong to the input method.
        if (evt.isComposing || evt.keyCode === 229) {
            return;
        }

        if (!unref(isPopupOpen)) {
            if ((evt.key === 'Enter' || evt.key === ' ') && !unref(disabled) && !isReadonly) {
                evt.preventDefault();
                isPopupOpen.value = true;
            }
            return;
        }

        if (evt.key === 'Backspace') {
            if (!unref(isMultiple)) {
                return;
            }

            if (unref(searchQuery).length > 0 || unref(selectedIds).size === 0) {
                return;
            }

            const selectedList = [...unref(selectedIds)];
            deselect(selectedList[selectedList.length - 1]);
            return;
        }

        if (onKeyDownBase(evt)) {
            return;
        }

        // Letters, and a space typed into the search input, belong to the search query.
        if (isSearchable && evt.key.length === 1 && (evt.key !== ' ' || evt.target === unref(searchInputRef))) {
            return;
        }

        // Without results there is nothing to activate, and the search input must not submit the form.
        if (evt.key === 'Enter') {
            evt.preventDefault();
        }

        onKeyNavigate(evt, onNodeClick);
    }

    function autoExpandSelected(): void {
        const ids = unref(selectedIds);
        if (ids.size === 0) {
            return;
        }

        const expanded = new Set(unref(expandedIds));

        function expandAncestors(nodes: FluxFormTreeViewSelectOption[], targetId: string | number): boolean {
            for (const node of nodes) {
                if (node.id === targetId) {
                    return true;
                }
                if (node.children && expandAncestors(node.children, targetId)) {
                    expanded.add(node.id);
                    return true;
                }
            }
            return false;
        }

        for (const selectedId of ids) {
            expandAncestors(options, selectedId);
        }

        expandedIds.value = expanded;
    }
</script>
