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
                                v-if="getLevelColor(node.depth)"
                                :class="$style.treeNodeColorDot"
                                :style="{ background: getLevelColor(node.depth) }"/>

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
    import { useTranslate } from '$flux/composable/private';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxFormInput from '$flux/component/FluxFormInput.vue';
    import FluxIcon from '$flux/component/FluxIcon.vue';
    import FluxTag from '$flux/component/FluxTag.vue';
    import Anchor from '$flux/component/primitive/Anchor.vue';
    import AnchorPopup from '$flux/component/primitive/AnchorPopup.vue';
    import $formStyle from '$flux/css/component/Form.module.scss';
    import $style from '$flux/css/component/TreeViewSelect.module.scss';

    type FlatNode = FluxFormTreeViewSelectOption & {
        readonly depth: number;
        readonly isLast: boolean;
        readonly lineGuides: boolean[];
    };

    const FLUX_COLORS: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
    const INITIAL_HIGHLIGHTED_INDEX = -1;

    defineOptions({
        inheritAttrs: false
    });

    const modelValue = defineModel<FluxFormTreeViewSelectValue>({ required: true });

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
    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);
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

    const visibleNodes = computed(() => {
        const query = unref(searchQuery).toLowerCase().trim();
        if (query) {
            return flattenAll(options)
                .filter(node => node.label.toLowerCase().includes(query))
                .map(node => ({...node, depth: 0, isLast: false, lineGuides: [] as boolean[]}));
        }
        return flattenVisible(options, 0, unref(expandedIds));
    });

    useClickOutside([anchorRef, anchorPopupRef], isPopupOpen, () => isPopupOpen.value = false);
    useClickOutside(anchorRef, isPopupOpen, () => unref(focusElement)?.focus());

    function flattenAll(nodes: FluxFormTreeViewSelectOption[], depth = 0): FlatNode[] {
        return nodes.flatMap(node => [
            {...node, depth, isLast: false, lineGuides: [] as boolean[]},
            ...(node.children ? flattenAll(node.children, depth + 1) : [])
        ]);
    }

    function flattenVisible(
        nodes: FluxFormTreeViewSelectOption[],
        depth: number,
        expanded: Set<string | number>,
        parentGuides: boolean[] = []
    ): FlatNode[] {
        return nodes.flatMap((node, index) => {
            const isLast = index === nodes.length - 1;
            const flatNode: FlatNode = {...node, depth, isLast, lineGuides: parentGuides};

            if (node.children?.length && expanded.has(node.id)) {
                const childGuides = [...parentGuides, !isLast];
                return [flatNode, ...flattenVisible(node.children, depth + 1, expanded, childGuides)];
            }

            return [flatNode];
        });
    }

    function getLevelColor(depth: number): string | undefined {
        if (!levelColors || depth >= levelColors.length) {
            return undefined;
        }
        const color = levelColors[depth];
        if (FLUX_COLORS.includes(color as FluxColor)) {
            return `var(--${color}-600)`;
        }
        return color;
    }

    function toggle(): void {
        if (unref(disabled)) {
            return;
        }
        isPopupOpen.value = !unref(isPopupOpen);
    }

    function toggleExpand(nodeId: string | number): void {
        const ids = new Set(unref(expandedIds));
        if (ids.has(nodeId)) {
            ids.delete(nodeId);
        } else {
            ids.add(nodeId);
        }
        expandedIds.value = ids;
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

    function onExpandClick(node: FlatNode, evt: MouseEvent): void {
        if (!node.children?.length) {
            return;
        }
        evt.stopPropagation();
        toggleExpand(node.id);
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

        const nodes = unref(visibleNodes);
        const current = unref(highlightedIndex);

        switch (evt.key) {
            case 'ArrowDown':
                evt.preventDefault();
                highlightedIndex.value = current === INITIAL_HIGHLIGHTED_INDEX
                    ? 0
                    : Math.min(nodes.length - 1, current + 1);
                break;

            case 'ArrowUp':
                evt.preventDefault();
                highlightedIndex.value = current === INITIAL_HIGHLIGHTED_INDEX
                    ? nodes.length - 1
                    : Math.max(0, current - 1);
                break;

            case 'ArrowRight':
                evt.preventDefault();
                if (current >= 0) {
                    const node = nodes[current];
                    if (node.children?.length) {
                        if (!unref(expandedIds).has(node.id)) {
                            toggleExpand(node.id);
                        } else if (current + 1 < nodes.length && nodes[current + 1].depth > node.depth) {
                            highlightedIndex.value = current + 1;
                        }
                    }
                }
                break;

            case 'ArrowLeft':
                evt.preventDefault();
                if (current >= 0) {
                    const node = nodes[current];
                    if (node.children?.length && unref(expandedIds).has(node.id)) {
                        toggleExpand(node.id);
                    } else if (node.depth > 0) {
                        for (let i = current - 1; i >= 0; i--) {
                            if (nodes[i].depth === node.depth - 1) {
                                highlightedIndex.value = i;
                                break;
                            }
                        }
                    }
                }
                break;

            case 'Enter':
            case ' ':
                evt.preventDefault();
                if (current >= 0) {
                    onNodeClick(nodes[current]);
                }
                break;

            case 'Backspace':
                if (!unref(isMultiple)) {
                    return;
                }
                if (unref(searchQuery).length > 0 || unref(selectedIds).size === 0) {
                    return;
                }
                const selectedList = [...unref(selectedIds)];
                deselect(selectedList[selectedList.length - 1]);
                break;

            case 'Escape':
                isPopupOpen.value = false;
                nextTick(() => unrefTemplateElement(anchorRef)?.focus());
                break;

            case 'Tab':
                isPopupOpen.value = false;
                return;

            default:
                if (isSearchable) {
                    return;
                }
                if (evt.key.length === 1) {
                    const lowerKey = evt.key.toLowerCase();
                    let matchIndex = nodes.findIndex((n, i) => i > current && n.label.toLowerCase().startsWith(lowerKey));
                    if (matchIndex < 0) {
                        matchIndex = nodes.findIndex(n => n.label.toLowerCase().startsWith(lowerKey));
                    }
                    if (matchIndex >= 0) {
                        highlightedIndex.value = matchIndex;
                    }
                }
                return;
        }
    }

    watch(highlightedIndex, index => {
        if (index < 0) {
            return;
        }
        unref(nodeElementRefs)?.[index]?.scrollIntoView({block: 'nearest'});
    });

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

    watch(visibleNodes, nodes => {
        const current = unref(highlightedIndex);
        if (current >= nodes.length) {
            highlightedIndex.value = Math.max(INITIAL_HIGHLIGHTED_INDEX, nodes.length - 1);
        }
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
