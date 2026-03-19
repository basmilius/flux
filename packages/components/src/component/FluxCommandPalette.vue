<template>
    <Teleport to="body">
        <div
            v-if="isOpen || isClosing"
            :class="[$style.commandPaletteBackdrop, isClosing && $style.isClosing]"
            @click="close"/>

        <div
            v-if="isOpen || isClosing"
            ref="dialogRef"
            :class="[$style.commandPaletteDialog, isClosing && $style.isClosing]"
            @click.self="close"
            @keydown="onKeyDown">
            <div
                v-height-transition
                :class="$style.commandPalette"
                @mousedown.prevent>
                <div :class="$style.commandPaletteSearch">
                    <FluxIcon
                        :class="$style.commandPaletteSearchIcon"
                        name="magnifying-glass"/>

                    <template v-if="activeTabSource">
                        <button
                            :class="$style.commandPaletteBreadcrumb"
                            tabindex="-1"
                            type="button"
                            @click="clearSubActionTarget"
                            @mousedown.prevent>
                            {{ activeTabSource.label }}
                        </button>

                        <span :class="$style.commandPaletteBreadcrumbSeparator">/</span>
                    </template>

                    <template v-if="subActionTarget">
                        <button
                            :class="$style.commandPaletteBreadcrumb"
                            tabindex="-1"
                            type="button"
                            @mousedown.prevent>
                            {{ subActionTarget.label }}
                        </button>

                        <span :class="$style.commandPaletteBreadcrumbSeparator">/</span>
                    </template>

                    <input
                        ref="inputRef"
                        :class="$style.commandPaletteSearchInput"
                        :placeholder="placeholder ?? 'Search...'"
                        :value="search"
                        type="text"
                        @input="setSearch(($event.target as HTMLInputElement).value)"/>

                    <FluxTag
                        is-keyboard-shortcut
                        label="Esc"/>
                </div>

                <div
                    v-if="tabs.length > 0 && !subActionTarget"
                    :class="$style.commandPaletteTabs">
                    <button
                        :class="activeTab === null ? $style.commandPaletteTabActive : $style.commandPaletteTab"
                        tabindex="-1"
                        type="button"
                        @click="setActiveTab(null)"
                        @mousedown.prevent>
                        All
                    </button>

                    <button
                        v-for="tab of tabs"
                        :key="tab.key"
                        :class="activeTab === tab.key ? $style.commandPaletteTabActive : $style.commandPaletteTab"
                        tabindex="-1"
                        type="button"
                        @click="setActiveTab(tab.key)"
                        @mousedown.prevent>
                        <FluxIcon
                            v-if="tab.icon"
                            :class="$style.commandPaletteTabIcon"
                            :name="tab.icon"/>

                        {{ tab.label }}
                    </button>
                </div>

                <FluxWindowTransition :is-back="isTransitioningBack">
                    <div
                        :key="activeTab"
                        :class="$style.commandPaletteResults">
                        <template v-if="subActionTarget">
                            <FluxCommandPaletteItem
                                v-for="(action, index) of subActions"
                                :key="index"
                                ref="itemRefs"
                                :icon="action.icon"
                                :is-highlighted="highlightedIndex === index"
                                :label="action.label"
                                @activate="activateSubAction(action)"
                                @highlight="highlightedIndex = index"/>
                        </template>

                        <template v-else-if="groupedItems.length > 0">
                            <template
                                v-for="group of groupedItems"
                                :key="group.sourceKey">
                                <FluxCommandPaletteGroup
                                    v-if="group.sourceLabel"
                                    :label="group.sourceLabel"/>

                                <FluxCommandPaletteItem
                                    v-for="result of group.items"
                                    :key="result.item.id"
                                    ref="itemRefs"
                                    :command="result.item.command"
                                    :has-sub-actions="!!result.item.subActions?.length"
                                    :icon="result.item.icon"
                                    :is-highlighted="highlightedIndex === result.globalIndex"
                                    :label="result.item.label"
                                    :sub-label="result.item.subLabel"
                                    @activate="activateItem(result.item)"
                                    @highlight="highlightedIndex = result.globalIndex"/>
                            </template>
                        </template>

                        <div
                            v-else-if="isLoading"
                            :class="$style.commandPaletteLoading">
                            <FluxSpinner :size="22"/>
                        </div>

                        <div
                            v-else
                            :class="$style.commandPaletteEmpty">
                            No results found.
                        </div>
                    </div>
                </FluxWindowTransition>
            </div>
        </div>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import type { FluxCommandSource, FluxCommandSourceItem } from '@flux-ui/types';
    import { isSSR, vHeightTransition } from '@flux-ui/internals';
    import { onMounted, onUnmounted, ref, toRef, unref, useTemplateRef } from 'vue';
    import { useCommandPalette } from '$flux/composable/private/useCommandPalette';
    import FluxCommandPaletteGroup from './FluxCommandPaletteGroup.vue';
    import FluxCommandPaletteItem from './FluxCommandPaletteItem.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTag from './FluxTag.vue';
    import FluxWindowTransition from '$flux/transition/FluxWindowTransition.vue';
    import $style from '$flux/css/component/CommandPalette.module.scss';

    const props = defineProps<{
        readonly hasKeyboardShortcut?: boolean;
        readonly placeholder?: string;
        readonly sources: FluxCommandSource[];
    }>();

    const emit = defineEmits<{
        select: [item: FluxCommandSourceItem];
    }>();

    const dialogRef = useTemplateRef<HTMLDivElement>('dialogRef');
    const inputRef = useTemplateRef<HTMLInputElement>('inputRef');
    const itemRefs = ref<InstanceType<typeof FluxCommandPaletteItem>[]>();

    const isOpen = ref(false);
    const isClosing = ref(false);

    const {
        search,
        activeTab,
        activeTabSource,
        highlightedIndex,
        isLoading,
        isTransitioningBack,
        subActionTarget,
        groupedItems,
        subActions,
        tabs,
        setSearch,
        setActiveTab,
        enterSubActions,
        onKeyNavigate,
        reset
    } = useCommandPalette({
        sources: toRef(() => props.sources),
        itemRefs
    });

    function open(): void {
        if (unref(isOpen)) {
            return;
        }

        isOpen.value = true;

        requestAnimationFrame(() => unref(inputRef)?.focus());
    }

    function close(): void {
        if (!unref(isOpen)) {
            return;
        }

        const dialog = unref(dialogRef);

        if (!dialog) {
            return;
        }

        isClosing.value = true;

        const finishClose = () => {
            isClosing.value = false;
            isOpen.value = false;
            reset();
        };

        const fallbackTimeout = setTimeout(finishClose, 250);

        dialog.addEventListener('animationend', () => {
            clearTimeout(fallbackTimeout);
            finishClose();
        }, {once: true});
    }

    function clearSubActionTarget(): void {
        subActionTarget.value = null;
        highlightedIndex.value = -1;
    }

    function activateItem(item: FluxCommandSourceItem): void {
        if (item.subActions?.length) {
            enterSubActions(item);
        } else {
            item.onActivate();
            emit('select', item);
            close();
        }
    }

    function activateSubAction(action: { readonly onActivate: () => void; }): void {
        action.onActivate();
        close();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        onKeyNavigate(evt, close, (item) => {
            emit('select', item);
            close();
        });
    }

    function onGlobalKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'k' && (evt.metaKey || evt.ctrlKey)) {
            evt.preventDefault();

            if (unref(isOpen)) {
                close();
            } else {
                open();
            }
        }
    }

    if (!isSSR && props.hasKeyboardShortcut) {
        onMounted(() => {
            window.addEventListener('keydown', onGlobalKeyDown);
        });

        onUnmounted(() => {
            window.removeEventListener('keydown', onGlobalKeyDown);
        });
    }

    defineExpose({
        close,
        open
    });
</script>
