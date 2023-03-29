<template>
    <div
        ref="rootElement"
        class="flux-form-input flux-form-select"
        :class="{'is-disabled': isDisabled}"
        tabindex="0"
        @focusin="onFocus"
        @focusout="onBlur">
        <flux-menu-item
            v-if="!isMultiple && selectedOptions[0] && searchQuery.length === 0"
            class="flux-form-select-selected"
            :icon-before="selectedOptions[0].icon"
            :label="selectedOptions[0].label"
            tabindex="-1"/>

        <template v-if="isMultiple">
            <flux-badge
                v-for="option of selectedOptions"
                :key="option.id"
                :label="option.label"
                is-deletable
                @delete="deselect(option.id)"/>
        </template>

        <input
            v-if="isEditable"
            v-model="searchQuery"
            ref="inputElement"
            :disabled="isDisabled"
            :id="id"
            :placeholder="!isMultiple && selectedOptions[0] ? '' : placeholder"
            :readonly="isEditable !== true"
            class="flux-form-input flux-form-select-input"
            tabindex="-1"
            type="search"
            @keydown="onKeyDown"/>

        <flux-icon
            class="flux-form-select-icon"
            variant="angle-down"/>

        <flux-fade-transition>
            <div
                v-if="!isDisabled && popupOpen && groupedOptions.length > 0"
                ref="popupElement"
                class="flux-surface flux-form-select-popup">
                <flux-menu>
                    <template
                        v-for="([item, subItems], index) of groupedOptions"
                        :key="`group-${index}`">
                        <flux-menu-group>
                            <flux-menu-sub-header
                                v-if="isFluxFormSelectGroup(item)"
                                :icon-before="item.icon"
                                :label="item.label"/>

                            <template v-for="(subItem, index) of subItems">
                                <flux-menu-item
                                    ref="optionRefs"
                                    v-if="isFluxFormSelectOption(subItem)"
                                    :key="index"
                                    :icon-before="subItem.icon"
                                    :is-highlighted="highlightId === subItem.id"
                                    :label="subItem.label"
                                    type="button"
                                    @click="select(subItem.id)"/>
                            </template>
                        </flux-menu-group>

                        <flux-menu-item
                            v-if="isFluxFormSelectOption(item)"
                            ref="optionRefs"
                            :key="`item-${index}`"
                            :icon-before="item.icon"
                            :is-highlighted="highlightId === item.id"
                            :label="item.label"
                            type="button"
                            @click="select(item.id)"/>
                    </template>
                </flux-menu>
            </div>
        </flux-fade-transition>
    </div>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'modelValue',
            event: 'update:modelValue'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import type { ComponentPublicInstance, ComputedRef } from 'vue-demi';
    import type { FluxFormSelectGroup, FluxFormSelectOption } from '../data';
    import { computed, inject, ref, toRefs, unref, watch } from 'vue-demi';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '../data';
    import { FluxFadeTransition } from '../transition';
    import { FluxBadge, FluxIcon, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader } from '.';

    export interface Emits {
        (e: 'update:modelValue', value: string | number | (string | number)[]): void;
    }

    export interface Props {
        readonly isDisabled?: boolean;
        readonly isEditable?: boolean;
        readonly isMultiple?: boolean;
        readonly modelValue: string | number | (string | number)[];
        readonly options: (FluxFormSelectOption | FluxFormSelectGroup)[];
        readonly placeholder?: string;
    }

    type GroupEntry = [FluxFormSelectGroup | FluxFormSelectOption | null, FluxFormSelectOption[]];

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isMultiple, modelValue, options} = toRefs(props);

    const id = inject<string>('flux-form-field-id', '');

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

    const values = computed(() => Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]);
    const selectedOptions = computed(() => unref(values).map(v => unref(options).find(o => isFluxFormSelectOption(o) && o.id === v))) as ComputedRef<FluxFormSelectOption[]>;
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

            for (++i; i < availableOptions.length; ++i) {
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

            default:
                highlightIndex.value = -1;
                break;
        }
    }

    function reposition(): void {
        const {top, height: inputHeight, width} = unref(rootElement)!.getBoundingClientRect();
        popupWidth.value = width;

        requestAnimationFrame(() => {
            if (!popupElement.value) {
                return;
            }

            const {height} = unref(popupElement)!.getBoundingClientRect();
            const bottom = top + height + inputHeight + 39;

            if (bottom <= innerHeight) {
                popupY.value = inputHeight + 9;
            } else {
                popupY.value = -height - 9;
            }
        });
    }

    function deselect(id: string | number): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            emit('update:modelValue', val.filter(v => v !== id));
            unref(inputElement)?.focus();
        }

        requestAnimationFrame(reposition);
    }

    function select(id: string | number): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            emit('update:modelValue', [...val, id]);

            unref(inputElement)?.focus();
        } else {
            emit('update:modelValue', id);

            popupOpen.value = false;
            unref(inputElement)?.blur();
        }

        highlightIndex.value = -1;
        searchQuery.value = '';

        requestAnimationFrame(reposition);
    }

    watch(highlightIndex, index => {
        optionRefs.value![index]?.$el.scrollIntoView({
            block: 'center'
        });
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    @layer component {
        .flux-form-select {
            position: relative;
            display: flex;
            height: unset;
            min-height: 42px;
            padding: 0 6px;
            align-items: center;
            flex-wrap: wrap;
            gap: 0 6px;
            cursor: pointer;

            @include flux.focus-ring(-1px, true);

            &-icon {
                position: absolute;
                top: 50%;
                right: 12px;
                translate: 0 -50%;
            }

            &-input {
                position: relative;
                margin: 0 -1px;
                min-width: 35%;
                padding: 0 6px;
                flex: 1 1 0;
                background: unset;
                border-width: 0;
                box-shadow: none;

                &::-webkit-search-decoration,
                &::-webkit-search-cancel-button,
                &::-webkit-search-results-button,
                &::-webkit-search-results-decoration {
                    -webkit-appearance: none;
                }
            }

            &-popup {
                position: absolute;
                display: block;
                top: calc(v-bind(popupY) * 1px);
                left: 0;
                width: calc(v-bind(popupWidth) * 1px);
                max-height: 330px;
                margin: 0;
                padding: 9px;
                box-shadow: var(--shadow);
                overflow: auto;
                z-index: 10000;
            }

            &-selected {
                position: absolute;
                height: 100%;
                padding-left: 12px;
                padding-right: 12px;
                inset: -1px;
                pointer-events: none;
            }

            &.is-disabled &-selected {
                color: rgb(var(--gray-6));
            }
        }
    }

    @layer cosy {
        .flux-form-select {
            .flux-badge {
                margin-top: 8px;
                margin-bottom: 7px;
                flex: 0 0 auto;
            }

            &-input {
                outline: 0;
            }
        }
    }
</style>
