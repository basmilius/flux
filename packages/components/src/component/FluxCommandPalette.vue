<template>
    <Teleport to="body">
        <div
            v-if="isOpen || isClosing"
            :class="[$style.commandPaletteBackdrop, isClosing && $style.isClosing]"
            :style="zIndexBase !== null ? {zIndex: zIndexBase} : undefined"
            @click="close"/>

        <div
            v-if="isOpen || isClosing"
            ref="dialogRef"
            :class="[$style.commandPaletteDialog, isClosing && $style.isClosing]"
            :style="zIndexBase !== null ? {zIndex: zIndexBase + 1} : undefined"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            :aria-label="translate('flux.search')"
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
                        :placeholder="placeholder ?? translate('flux.search')"
                        :value="search"
                        type="text"
                        role="combobox"
                        aria-autocomplete="list"
                        :aria-label="translate('flux.search')"
                        :aria-controls="listboxId"
                        :aria-expanded="isExpanded"
                        :aria-activedescendant="activeDescendant"
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
                        :id="listboxId"
                        :key="activeTab"
                        :class="$style.commandPaletteResults"
                        role="listbox"
                        :aria-label="translate('flux.search')">
                        <template v-if="subActionTarget">
                            <FluxCommandPaletteItem
                                v-for="(action, index) of subActions"
                                :id="optionId(index)"
                                :key="action.label"
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
                                    :id="optionId(result.globalIndex)"
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
                            {{ translate('flux.noItems') }}
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
    import { useHotKey } from '@basmilius/common';
    import { useFocusTrap, vHeightTransition } from '@flux-ui/internals';
    import type { FluxCommandSource, FluxCommandSourceItem } from '@flux-ui/types';
    import { computed, onUnmounted, ref, toRef, unref, useId, useTemplateRef } from 'vue';
    import { useCommandPalette, useTranslate } from '~flux/components/composable/private';
    import { registerDialog, type FluxDialogRegistration } from '~flux/components/data';
    import { FluxWindowTransition } from '~flux/components/transition';
    import FluxCommandPaletteGroup from './FluxCommandPaletteGroup.vue';
    import FluxCommandPaletteItem from './FluxCommandPaletteItem.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTag from './FluxTag.vue';
    import $style from '~flux/components/css/component/CommandPalette.module.scss';

    const emit = defineEmits<{
        select: [item: FluxCommandSourceItem];
    }>();

    const props = defineProps<{
        readonly hasKeyboardShortcut?: boolean;
        readonly placeholder?: string;
        readonly sources: FluxCommandSource[];
    }>();

    const dialogRef = useTemplateRef<HTMLDivElement>('dialogRef');
    const inputRef = useTemplateRef<HTMLInputElement>('inputRef');
    const itemRefs = useTemplateRef<InstanceType<typeof FluxCommandPaletteItem>[]>('itemRefs');

    // Combobox wiring: the input owns the focus and points at the active option through
    // aria-activedescendant, so each rendered option needs a stable, unique id derived from this base.
    const listboxId = useId();

    const isOpen = ref(false);
    const isClosing = ref(false);

    let pendingClose: (() => void) | null = null;

    const dialogRegistration = ref<FluxDialogRegistration | null>(null);

    const translate = useTranslate();

    useFocusTrap(dialogRef);

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
        totalItems,
        setSearch,
        setActiveTab,
        enterSubActions,
        onKeyNavigate,
        reset
    } = useCommandPalette({
        sources: toRef(() => props.sources),
        itemRefs
    });

    useHotKey('mod+k', () => {
        if (unref(isOpen) && !unref(isClosing)) {
            close();
        } else {
            open();
        }
    }, {
        enabled: () => props.hasKeyboardShortcut
    });

    const zIndexBase = computed(() => {
        const registration = unref(dialogRegistration);

        if (!registration) {
            return null;
        }

        return 10001 + registration.getPosition() * 2;
    });

    const isExpanded = computed(() => unref(totalItems) > 0);
    const activeDescendant = computed(() => {
        const index = unref(highlightedIndex);

        return isExpanded.value && index >= 0 ? optionId(index) : undefined;
    });

    onUnmounted(() => {
        dialogRegistration.value?.unregister();
        dialogRegistration.value = null;
    });

    function optionId(index: number): string {
        return `${listboxId}-option-${index}`;
    }

    function open(): void {
        pendingClose?.();

        if (unref(isOpen)) {
            return;
        }

        dialogRegistration.value ??= registerDialog();
        isOpen.value = true;

        requestAnimationFrame(() => unref(inputRef)?.focus());
    }

    function close(): void {
        if (!unref(isOpen) || unref(isClosing)) {
            return;
        }

        const dialog = unref(dialogRef);

        if (!dialog) {
            return;
        }

        isClosing.value = true;

        const finishClose = () => {
            pendingClose = null;
            isClosing.value = false;
            isOpen.value = false;
            reset();
            dialogRegistration.value?.unregister();
            dialogRegistration.value = null;
        };

        const onAnimationEnd = () => {
            clearTimeout(fallbackTimeout);
            finishClose();
        };

        const fallbackTimeout = setTimeout(() => {
            dialog.removeEventListener('animationend', onAnimationEnd);
            finishClose();
        }, 250);

        pendingClose = () => {
            clearTimeout(fallbackTimeout);
            dialog.removeEventListener('animationend', onAnimationEnd);
            finishClose();
        };

        dialog.addEventListener('animationend', onAnimationEnd, {once: true});
    }

    function clearSubActionTarget(): void {
        subActionTarget.value = null;
        highlightedIndex.value = -1;
    }

    function activateItem(item: FluxCommandSourceItem): void {
        if (unref(isClosing)) {
            return;
        }

        if (item.subActions?.length) {
            enterSubActions(item);
        } else {
            item.onActivate();
            emit('select', item);
            close();
        }
    }

    function activateSubAction(action: { readonly onActivate: () => void; }): void {
        if (unref(isClosing)) {
            return;
        }

        action.onActivate();
        close();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (unref(isClosing)) {
            return;
        }

        onKeyNavigate(evt, close, (item) => {
            emit('select', item);
            close();
        });
    }

    defineExpose({
        close,
        open
    });
</script>
