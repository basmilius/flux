<template>
    <Anchor
        ref="anchor"
        :="$attrs"
        :class="clsx(
            $formStyle.formSelect,
            disabled && $formStyle.isDisabled,
            isPopupOpen && $formStyle.isFocused
        )"
        :id="id"
        :aria-disabled="disabled ? true : undefined"
        tabindex="0"
        tag-name="div"
        @click="toggle()"
        @keydown="onKeyDown">

        <template v-if="isMultiple && selectedOptions.length > 0">
            <FluxTag
                v-for="option in selectedOptions"
                :key="option.id"
                :label="option.label"
                is-deletable
                @delete="deselect(option.id)"/>
        </template>

        <template v-else-if="!isMultiple && selectedOptions[0]">
            <span :class="$style.treeViewSelectValue">{{ selectedOptions[0].label }}</span>
        </template>

        <template v-else-if="placeholder">
            <span :class="$formStyle.formSelectPlaceholder">{{ placeholder }}</span>
        </template>

        <FluxIcon
            :class="$formStyle.formSelectIcon"
            name="angle-down"/>
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isPopupOpen && !disabled"
                ref="anchorPopup"
                :class="$formStyle.formSelectPopup"
                :anchor="anchorRef"
                direction="vertical"
                use-anchor-width>

                <FluxFormInput
                    v-if="isSearchable"
                    v-model="searchQuery"
                    ref="searchInput"
                    auto-complete="off"
                    :class="$formStyle.formSelectInput"
                    type="search"
                    icon-trailing="magnifying-glass"
                    :placeholder="translate('flux.search')"
                    @keydown="onKeyDown"/>

                <div :class="$style.treeViewSelectList">
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
                            :class="clsx(
                                $style.treeNode,
                                node.selectable !== false && $style.isSelectable,
                                node.selectable === false && !!node.children?.length && $style.isExpandable,
                                selectedIds.has(node.id) && $style.isSelected,
                                nodeIndex === highlightedIndex && $style.isHighlighted
                            )"
                            :role="node.selectable !== false ? 'option' : undefined"
                            :tabindex="node.selectable !== false ? 0 : undefined"
                            :aria-selected="node.selectable !== false ? selectedIds.has(node.id) : undefined"
                            @click="onNodeClick(node)"
                            @keydown.enter.prevent="onNodeClick(node)"
                            @keydown.space.prevent="onNodeClick(node)">

                            <!-- Line guides and expand button grouped without gap -->
                            <div :class="$style.treeNodeLineArea">
                                <span
                                    v-for="(showLine, guideIndex) in node.lineGuides"
                                    :key="`g-${guideIndex}`"
                                    :class="[$style.treeIndent, showLine && $style.hasLine]"/>

                                <span
                                    v-if="node.depth > 0"
                                    :class="[$style.treeConnector, node.isLast && $style.isLast]"/>

                                <span
                                    :class="$style.treeNodeExpand"
                                    @click="onExpandClick(node, $event)">
                                    <FluxIcon
                                        v-if="node.children?.length"
                                        :name="expandedIds.has(node.id) ? 'angle-down' : 'angle-right'"
                                        :size="12"/>
                                </span>
                            </div>

                            <span
                                v-if="getLevelColor(node.depth, levelColors)"
                                :class="$style.treeNodeColorDot"
                                :style="{ background: getLevelColor(node.depth, levelColors) }"/>

                            <FluxIcon
                                v-if="node.icon"
                                :class="$style.treeNodeIcon"
                                :name="node.icon"
                                :size="16"/>

                            <span :class="$style.treeNodeLabel">{{ node.label }}</span>

                            <FluxIcon
                                v-if="selectedIds.has(node.id)"
                                :class="$style.treeNodeCheck"
                                name="check"
                                :size="14"/>
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
    import { useClickOutside } from '@basmilius/common';
    import { unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxColor, FluxFormTreeViewSelectOption, FluxFormTreeViewSelectValue } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { type ComponentPublicInstance, computed, nextTick, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import type { TreeFlatNode } from '$flux/composable/private';
    import { flattenAll, flattenVisible, getLevelColor, INITIAL_HIGHLIGHTED_INDEX, useTranslate, useTreeView } from '$flux/composable/private';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxFormInput from '$flux/component/FluxFormInput.vue';
    import FluxIcon from '$flux/component/FluxIcon.vue';
    import FluxTag from '$flux/component/FluxTag.vue';
    import Anchor from '$flux/component/primitive/Anchor.vue';
    import AnchorPopup from '$flux/component/primitive/AnchorPopup.vue';
    import $formStyle from '$flux/css/component/Form.module.scss';
    import $style from '$flux/css/component/TreeViewSelect.module.scss';

    type FlatNode = TreeFlatNode<FluxFormTreeViewSelectOption>;

    defineOptions({
        inheritAttrs: false
    });

    const modelValue = defineModel<FluxFormTreeViewSelectValue>({required: true});

    const {
        disabled: componentDisabled,
        isMultiple,
        isSearchable,
        levelColors,
        options,
        placeholder
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly levelColors?: (FluxColor | string)[];
        readonly options: FluxFormTreeViewSelectOption[];
        readonly placeholder?: string;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();
    const translate = useTranslate();

    const anchorRef = useTemplateRef<ComponentPublicInstance>('anchor');
    const anchorPopupRef = useTemplateRef('anchorPopup');
    const nodeElementRefs = useTemplateRef<HTMLDivElement[]>('nodeElements');
    const searchInputRef = useTemplateRef<ComponentPublicInstance<typeof FluxFormInput>>('searchInput');

    const expandedIds = ref(new Set<string | number>());
    const isPopupOpen = ref(false);
    const searchQuery = ref('');

    const focusElement = computed(() => unrefTemplateElement(searchInputRef) ?? unrefTemplateElement(anchorRef));

    const selectedIds = computed(() => {
        const value = unref(modelValue);
        if (Array.isArray(value)) {
            return new Set(value);
        }
        return new Set<string | number>(value !== undefined ? [value] : []);
    });

    const selectedOptions = computed(() => {
        const ids = unref(selectedIds);
        if (ids.size === 0) {
            return [];
        }
        return flattenAll(options).filter(node => ids.has(node.id));
    });

    const visibleNodes = computed((): FlatNode[] => {
        const query = unref(searchQuery).toLowerCase().trim();
        if (query) {
            return flattenAll(options)
                .filter(node => node.label.toLowerCase().includes(query))
                .map(node => ({...node, depth: 0, isLast: false, lineGuides: [] as boolean[]}));
        }
        return flattenVisible(options, 0, unref(expandedIds));
    });

    const {highlightedIndex, toggleExpand, onExpandClick, onKeyNavigate} = useTreeView({
        expandedIds,
        nodeElementRefs,
        visibleNodes
    });

    useClickOutside([anchorRef, anchorPopupRef] as any, isPopupOpen as any, () => isPopupOpen.value = false);
    useClickOutside(anchorRef as any, isPopupOpen as any, () => unref(focusElement)?.focus());

    function toggle(): void {
        if (unref(disabled)) {
            return;
        }
        isPopupOpen.value = !unref(isPopupOpen);
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
        nextTick(() => unrefTemplateElement(anchorRef)?.focus());
    }

    function onNodeClick(node: FlatNode): void {
        if (node.selectable !== false) {
            select(node.id);
            if (node.children?.length && !unref(expandedIds).has(node.id)) {
                toggleExpand(node.id);
            }
        } else if (node.children?.length) {
            toggleExpand(node.id);
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (!unref(isPopupOpen)) {
            if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                isPopupOpen.value = true;
            }
            return;
        }

        switch (evt.key) {
            case 'Backspace':
                if (!unref(isMultiple)) {
                    return;
                }
                if (unref(searchQuery).length > 0 || unref(selectedIds).size === 0) {
                    return;
                }
                const selectedList = [...unref(selectedIds)];
                deselect(selectedList[selectedList.length - 1]);
                return;

            case 'Escape':
                isPopupOpen.value = false;
                nextTick(() => unrefTemplateElement(anchorRef)?.focus());
                return;

            case 'Tab':
                isPopupOpen.value = false;
                return;
        }

        // When searchable, don't intercept letter keys — let the search input handle them
        if (isSearchable && evt.key.length === 1 && evt.key !== 'Enter' && evt.key !== ' ') {
            return;
        }

        onKeyNavigate(evt, onNodeClick);
    }

    watch(isPopupOpen, isOpen => {
        if (!isOpen) {
            searchQuery.value = '';
            highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
            return;
        }

        autoExpandSelected();

        nextTick(() => {
            const ids = unref(selectedIds);
            if (ids.size > 0) {
                const firstSelectedIndex = unref(visibleNodes).findIndex(n => ids.has(n.id));
                if (firstSelectedIndex >= 0) {
                    highlightedIndex.value = firstSelectedIndex;
                }
            }

            unref(focusElement)?.focus();
        });
    });

    watch(searchQuery, () => {
        highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
    });

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
