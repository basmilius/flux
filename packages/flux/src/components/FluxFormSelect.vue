<template>
    <div
        ref="rootElement"
        class="flux-form-input flux-form-select"
        :class="{
            'is-disabled': isDisabled,
            'is-searchable': isSearchable
        }"
        :id="id"
        tabindex="0"
        @focusin="onFocus"
        @focusout="onBlur">
        <FluxMenuItem
            v-if="!isMultiple && selectedOptions[0]"
            class="flux-form-select-selected"
            :command="selectedOptions[0].command"
            :command-icon="selectedOptions[0].commandIcon"
            :icon-before="selectedOptions[0].icon"
            :label="selectedOptions[0].label"
            tabindex="-1"/>

        <template v-else-if="isMultiple && selectedOptions[0]">
            <FluxBadge
                v-for="option of selectedOptions"
                :key="option.id ?? 'null option'"
                :label="option.label"
                is-deletable
                is-tag
                @delete="deselect(option.id)"/>
        </template>

        <template v-else-if="placeholder">
            <span class="flux-form-select-placeholder">
                {{ placeholder }}
            </span>
        </template>

        <FluxIcon
            class="flux-form-select-icon"
            variant="angle-down"/>

        <FluxFadeTransition>
            <FluxPane
                v-if="!isDisabled && popupOpen"
                ref="popupElement"
                class="flux-form-select-popup"
                :style="{
                    top: `${popupY}px`,
                    width: `${popupWidth}px`
                }">
                <FluxFormInput
                    v-if="isSearchable"
                    v-model="searchQuery"
                    ref="inputElement"
                    auto-complete="off"
                    class="flux-form-select-input"
                    type="search"
                    icon-after="magnifying-glass"
                    :placeholder="translate('flux_search')"
                    @keydown="onKeyDown"/>

                <FluxPaneBody v-if="groupedOptions.length === 0">
                    <em>{{ translate('flux_no_items') }}</em>
                </FluxPaneBody>

                <FluxMenu v-else>
                    <template
                        v-for="([item, subItems], index) of groupedOptions"
                        :key="`group-${index}`">
                        <FluxMenuGroup>
                            <FluxMenuSubHeader
                                v-if="isFluxFormSelectGroup(item)"
                                :icon-before="item.icon"
                                :label="item.label"/>

                            <template v-for="(subItem, index) of subItems">
                                <FluxMenuItem
                                    ref="optionRefs"
                                    v-if="isFluxFormSelectOption(subItem)"
                                    :key="index"
                                    :command="subItem.command"
                                    :command-icon="subItem.commandIcon"
                                    :icon-before="subItem.icon"
                                    :is-active="!!selectedOptions.find(so => so.id === subItem.id)"
                                    :is-highlighted="highlightId === subItem.id"
                                    :label="subItem.label"
                                    type="button"
                                    @click="select(subItem.id)"/>
                            </template>
                        </FluxMenuGroup>

                        <FluxMenuItem
                            v-if="isFluxFormSelectOption(item)"
                            ref="optionRefs"
                            :key="`item-${index}`"
                            :command="item.command"
                            :command-icon="item.commandIcon"
                            :icon-before="item.icon"
                            :is-active="!!selectedOptions.find(so => so.id === item.id)"
                            :is-highlighted="highlightId === item.id"
                            :label="item.label"
                            type="button"
                            @click="select(item.id)"/>
                    </template>
                </FluxMenu>
            </FluxPane>
        </FluxFadeTransition>
    </div>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { ComponentPublicInstance, ComputedRef, nextTick, computed, ref, toRefs, unref, watch } from 'vue';
    import type { FluxFormSelectGroup, FluxFormSelectOption } from '@/data';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '@/data';
    import { useFormFieldInjection, useTranslate } from '@/composables';
    import { unrefElement } from '@/helpers';
    import { FluxFadeTransition } from '@/transition';
    import FluxBadge from './FluxBadge.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxMenuSubHeader from './FluxMenuSubHeader.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';

    export interface Emits {
        (e: 'update:model-value', value: string | number | (string | number | null)[] | null): void;

        (e: 'update:search', value: string): void;
    }

    export interface Props {
        readonly forcedPosition?: 'top' | 'bottom';
        readonly isDisabled?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly modelValue: string | number | (string | number)[] | null;
        readonly options: (FluxFormSelectOption | FluxFormSelectGroup)[];
        readonly placeholder?: string;
        readonly search?: string;
    }

    type GroupEntry = [FluxFormSelectGroup | FluxFormSelectOption | null, FluxFormSelectOption[]];

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {forcedPosition, isMultiple, modelValue, options, search} = toRefs(props);

    const {id} = useFormFieldInjection();
    const translate = useTranslate();

    const rootElement = ref<HTMLDivElement>();
    const inputElement = ref<HTMLInputElement>();
    const popupElement = ref<HTMLDialogElement>();

    const hasFocus = ref(false);
    const highlightIndex = ref(-1);
    const optionRefs = ref<ComponentPublicInstance[]>();
    const searchQuery = ref('');
    const popupOpen = ref(false);
    const popupY = ref(0);
    const popupWidth = ref(0);

    const focusableElement = computed(() => unref(inputElement) ?? unref(rootElement));
    const values = computed(() => Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]);
    const selectedOptions = computed(() => unref(values)
        .map(v => unref(options).find(o => isFluxFormSelectOption(o) && o.id === v))
        .filter(o => !!o)) as ComputedRef<FluxFormSelectOption[]>;
    const optionsWithoutGroups = computed(() => unref(groupedOptions).map(group => group[1]).flat() as FluxFormSelectOption[]);
    const highlightId = computed(() => unref(optionsWithoutGroups)[unref(highlightIndex)]?.id);

    const groupedOptions = computed(() => {
        const groups: GroupEntry[] = [];
        let search: string | null = unref(searchQuery).trim().toLowerCase();
        const availableOptions = unref(options)
            .filter(o => isFluxFormSelectGroup(o) || (!search || o.label.toLowerCase().includes(search)))
            .filter(o => isFluxFormSelectGroup(o) || !unref(isMultiple) || !unref(selectedOptions).find(s => s.id === o.id));

        if (search.length === 0) {
            search = null;
        }

        if (availableOptions.length === 0) {
            return [];
        }

        if (!availableOptions.find(isFluxFormSelectGroup)) {
            return [[null, availableOptions]];
        }

        for (let i = 0; i < availableOptions.length;) {
            const item = availableOptions[i];

            if (isFluxFormSelectOption(item)) {
                ++i;
                groups.push([null, [item]]);
                continue;
            }

            const subItems: FluxFormSelectOption[] = [];

            for (++i; i <= availableOptions.length; ++i) {
                const subItem = availableOptions[i];

                if (isFluxFormSelectGroup(subItem) || i === availableOptions.length) {
                    if (subItems.length > 0) {
                        groups.push([item, subItems]);
                    }

                    break;
                }

                subItems.push(subItem);
            }
        }

        return groups;
    });

    function onBlur(): void {
        hasFocus.value = false;
        highlightIndex.value = -1;

        requestAnimationFrame(() => {
            if (hasFocus.value) {
                return;
            }

            popupOpen.value = false;
        });
    }

    function onFocus(): void {
        hasFocus.value = true;
        popupOpen.value = true;
        reposition();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        switch (evt.key) {
            case 'ArrowUp':
                highlightIndex.value = Math.max(0, unref(highlightIndex) - 1);
                break;

            case 'ArrowDown':
                highlightIndex.value = Math.min(unref(optionsWithoutGroups).length - 1, unref(highlightIndex) + 1);
                break;

            case 'Backspace':
                if (searchQuery.value.length > 0) {
                    break;
                }

                const value = values.value[values.value.length - 1];

                if (value) {
                    deselect(value);
                }
                break;

            case 'Enter':
                const id = unref(highlightId);

                if (id) {
                    select(id);
                }

                break;

            case 'Escape':
                popupOpen.value = false;
                break;

            default:
                highlightIndex.value = -1;
                break;
        }
    }

    function reposition(): void {
        const root = unref(rootElement);

        if (!root) {
            return;
        }

        const {top, height: inputHeight, width} = root.getBoundingClientRect();
        popupWidth.value = width;

        requestAnimationFrame(() => {
            if (!popupElement.value) {
                return;
            }

            const {height} = unrefElement(popupElement)!.getBoundingClientRect();
            const bottom = top + height + inputHeight + 39;

            switch (forcedPosition?.value) {
                case 'top':
                    popupY.value = -height - 6;
                    break;

                case 'bottom':
                    popupY.value = inputHeight + 6;
                    break;

                default:
                    if (bottom <= innerHeight) {
                        popupY.value = inputHeight + 6;
                    } else {
                        popupY.value = -height - 6;
                    }
                    break;
            }
        });
    }

    function deselect(id: string | number | null): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            emit('update:model-value', val.filter(v => v !== id));
            unref(focusableElement)?.focus();
        }

        requestAnimationFrame(reposition);
    }

    function select(id: string | number | null): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            emit('update:model-value', [...val, id]);

            unref(focusableElement)?.focus();
        } else {
            emit('update:model-value', id);

            popupOpen.value = false;
            unref(focusableElement)?.blur();
        }

        highlightIndex.value = -1;
        searchQuery.value = '';

        requestAnimationFrame(reposition);
    }

    watch(highlightIndex, index => {
        optionRefs.value![index]?.$el.scrollIntoView({
            block: 'nearest'
        });
    });

    watch(options, () => requestAnimationFrame(reposition));

    watch(() => search, () => searchQuery.value = search?.value ?? '', {immediate: true});

    watch(searchQuery, searchQuery => {
        emit('update:search', searchQuery);
        requestAnimationFrame(reposition);
    });

    watch(popupOpen, popupOpen => {
        if (!popupOpen) {
            return;
        }

        nextTick(() => {
            const input = unref(inputElement);
            input?.focus();
        });

        nextTick(() => {
            const options = unref(optionRefs) ?? [];

            if (unref(isMultiple)) {
                return;
            }

            const option = options.find(o => 'isActive' in o.$props && o.$props.isActive);
            option?.$el.scrollIntoView({
                block: 'nearest'
            });
        });
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-form-select {
        position: relative;
        display: flex;
        height: unset;
        min-height: 42px;
        padding: 0 39px 0 6px;
        align-items: center;
        flex-wrap: wrap;
        gap: 0 6px;
        cursor: pointer;

        &:not(.is-disabled) {
            @include flux.focus-ring(-1px, true);
        }

        &-icon {
            position: absolute;
            top: 50%;
            right: 12px;
            translate: 0 -50%;
        }

        & &-input {
            position: sticky;
            top: 0;
            height: 48px;
            margin-bottom: 9px;
            background: rgb(var(--gray-0));
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-radius: 0;
            outline: 0;
            z-index: 2;

            .flux-form-input {
                &-icon {
                    margin: 15px;
                    font-size: 18px;
                }

                &-native {
                    padding-left: 21px;
                    padding-right: 21px;
                }
            }
        }

        &-placeholder {
            margin-left: 6px;
            margin-right: 6px;
            color: var(--foreground-secondary);
        }

        & &-popup {
            position: absolute;
            display: block;
            left: 0;
            max-height: 330px;
            min-width: 120px;
            box-shadow: var(--shadow-md);
            overflow: auto;
            z-index: 10000;
        }

        &-selected {
            position: absolute;
            height: 100%;
            padding-left: 12px;
            padding-right: 42px;
            inset: -1px;
            pointer-events: none;

            .flux-button-label {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        &.is-disabled &-selected {
            color: rgb(var(--gray-6));
        }

        &.is-searchable .flux-menu-sub-header {
            top: 48px;
        }

        .flux-badge {
            margin-top: 6px;
            margin-bottom: 6px;
            max-width: 100%;
            flex: 0 0 auto;
        }

        &-input {
            outline: 0;
        }
    }
</style>
