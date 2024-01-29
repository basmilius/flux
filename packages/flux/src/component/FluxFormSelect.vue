<template>
    <Anchor
        ref="anchorRef"
        class="flux-form-input flux-form-select"
        :class="{
            'is-disabled': isDisabled,
            'is-focused': popupOpen,
            'is-searchable': isSearchable
        }"
        :id="id"
        tabindex="0"
        tag-name="div"
        @click="popupOpen = !popupOpen"
        @keydown="onKeyDown">
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
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="popupOpen"
                ref="popupRef"
                class="flux-surface flux-pane flux-form-select-popup"
                :anchor="anchorRef"
                axis="vertical"
                use-anchor-width>
                <FluxFormInput
                    v-if="isSearchable"
                    v-model="modelSearch"
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
                                    v-if="isFluxFormSelectOption(subItem)"
                                    ref="optionRefs"
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
            </AnchorPopup>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { ComponentPublicInstance, computed, ComputedRef, nextTick, ref, Teleport, toRefs, unref, watch } from 'vue';
    import { useClickOutside } from '@/composable';
    import { useFormFieldInjection, useTranslate } from '@/composable/private';
    import { Anchor, AnchorPopup } from '@/component/primitive';
    import type { FluxFormSelectGroup, FluxFormSelectOption } from '@/data';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '@/data';
    import { FluxFadeTransition } from '@/transition';
    import { ensureElement } from '@/util';
    import FluxBadge from './FluxBadge.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxMenuSubHeader from './FluxMenuSubHeader.vue';
    import FluxPaneBody from './FluxPaneBody.vue';

    export type Props = {
        readonly forcedPosition?: 'top' | 'bottom';
        readonly isDisabled?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly options: (FluxFormSelectOption | FluxFormSelectGroup)[];
        readonly placeholder?: string;
    };

    type GroupEntry = [FluxFormSelectGroup | FluxFormSelectOption | null, FluxFormSelectOption[]];

    const modelSearch = defineModel<string>('search');
    const modelValue = defineModel<string | number | (string | number | null)[] | null>({required: true});
    const props = defineProps<Props>();
    const {isMultiple, options} = toRefs(props);

    const {id} = useFormFieldInjection();
    const translate = useTranslate();

    const anchorRef = ref<ComponentPublicInstance>();
    const popupRef = ref<ComponentPublicInstance>();
    const inputElement = ref<HTMLInputElement>();

    const highlightIndex = ref(-1);
    const optionRefs = ref<ComponentPublicInstance[]>();
    const popupOpen = ref(false);

    const focusableElement = computed(() => ensureElement(unref(inputElement) ?? unref(anchorRef)));
    const values = computed(() => Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]);
    const selectedOptions = computed(() => unref(values)
        .map(v => unref(options).find(o => isFluxFormSelectOption(o) && o.id === v))
        .filter(o => !!o)) as ComputedRef<FluxFormSelectOption[]>;
    const optionsWithoutGroups = computed(() => unref(groupedOptions).map(group => group[1]).flat() as FluxFormSelectOption[]);
    const highlightId = computed(() => unref(optionsWithoutGroups)[unref(highlightIndex)]?.id);

    const groupedOptions = computed(() => {
        const groups: GroupEntry[] = [];
        let search = unref(modelSearch)?.trim().toLowerCase();
        const availableOptions = unref(options)
            .filter(o => isFluxFormSelectGroup(o) || (!search || o.label.toLowerCase().includes(search)))
            .filter(o => isFluxFormSelectGroup(o) || !unref(isMultiple) || !unref(selectedOptions).find(s => s.id === o.id));

        if (search?.length === 0) {
            search = undefined;
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

    useClickOutside([anchorRef, popupRef], popupOpen, () => {
        popupOpen.value = false;
    });

    useClickOutside(anchorRef, popupOpen, () => {
        unref(focusableElement)?.focus();
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (!unref(popupOpen)) {
            if (evt.key === 'Enter') {
                popupOpen.value = true;
            }

            return;
        }

        switch (evt.key) {
            case 'ArrowUp':
                highlightIndex.value = Math.max(0, unref(highlightIndex) - 1);
                break;

            case 'ArrowDown':
                highlightIndex.value = Math.min(unref(optionsWithoutGroups).length - 1, unref(highlightIndex) + 1);
                break;

            case 'Backspace':
                const selectedValues = unref(values);
                const search = unref(modelSearch);

                if ((search && search.length > 0) || selectedValues.length === 0) {
                    return;
                }

                const value = selectedValues[selectedValues.length - 1];

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

            case 'Tab':
                popupOpen.value = false;
                return;

            default:
                highlightIndex.value = -1;
                return;
        }

        evt.preventDefault();
    }

    function deselect(id: string | number | null): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            modelValue.value = val.filter(v => v !== id);
            unref(focusableElement)?.focus();
        }
    }

    function select(id: string | number | null): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            modelValue.value = [...val, id];
        } else {
            modelValue.value = id;

            popupOpen.value = false;
        }

        highlightIndex.value = -1;
        modelSearch.value = '';

        unref(focusableElement)?.focus();
    }

    watch(highlightIndex, index => {
        optionRefs.value![index]?.$el.scrollIntoView({
            block: 'nearest'
        });
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

        &.is-focused {
            @include flux.focus-outline-visible(-1px)
        }

        &-icon {
            position: absolute;
            top: 50%;
            right: 12px;
            translate: 0 -50%;
        }

        &-input {
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
            user-select: none;
        }

        &-popup {
            position: fixed;
            display: block;
            top: 0;
            left: 0;
            width: var(--width, auto);
            max-height: 330px;
            min-width: 120px;
            box-shadow: var(--shadow-md);
            overflow: auto;
            translate: var(--x) var(--y);
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
            @include flux.focus-ring-remove();
        }
    }
</style>
