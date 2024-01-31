<template>
    <Anchor
        ref="anchorRef"
        class="flux-form-input flux-form-select"
        :class="{
            'is-disabled': isDisabled,
            'is-focused': isPopupOpen,
            'is-searchable': isSearchable
        }"
        :id="id"
        tabindex="0"
        tag-name="div"
        @click="toggle()"
        @keydown="onKeyDown">
        <template v-if="!isMultiple && selected[0]">
            <FluxMenuItem
                class="flux-form-select-selected"
                :command="selected[0].command"
                :command-icon="selected[0].commandIcon"
                :icon-before="selected[0].icon"
                :label="selected[0].label"
                tabindex="-1"/>
        </template>

        <template v-else-if="isMultiple && selected[0]">
            <FluxBadge
                v-for="option of selected"
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

        <FluxSpinner
            v-if="isLoading"
            class="flux-form-select-icon"
            :size="16"/>

        <FluxIcon
            v-else
            class="flux-form-select-icon"
            variant="angle-down"/>
    </Anchor>

    <Teleport to="body">
        <FluxFadeTransition>
            <AnchorPopup
                v-if="isPopupOpen"
                ref="anchorPopupRef"
                class="flux-surface flux-pane flux-form-select-popup"
                :class="{
                    'is-searchable': isSearchable
                }"
                :anchor="anchorRef"
                axis="vertical"
                use-anchor-width>
                <FluxFormInput
                    v-if="isSearchable"
                    v-model="modelSearch"
                    ref="searchInputElement"
                    auto-complete="off"
                    class="flux-form-select-input"
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
                                    ref="optionElementRefs"
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
                            ref="optionElementRefs"
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
    import { type ComponentPublicInstance, computed, nextTick, ref, Teleport, toRefs, unref, watch } from 'vue';
    import { useClickOutside, useFormFieldInjection } from '@/composable';
    import { type FormSelectGroup, useTranslate } from '@/composable/private';
    import { type FluxFormSelectOption, isFluxFormSelectGroup, isFluxFormSelectOption } from '@/data';
    import { FluxFadeTransition } from '@/transition';
    import { ensureElement } from '@/util';
    import FluxBadge from '../FluxBadge.vue';
    import FluxFormInput from '../FluxFormInput.vue';
    import FluxIcon from '../FluxIcon.vue';
    import FluxMenu from '../FluxMenu.vue';
    import FluxMenuGroup from '../FluxMenuGroup.vue';
    import FluxMenuItem from '../FluxMenuItem.vue';
    import FluxMenuSubHeader from '../FluxMenuSubHeader.vue';
    import FluxPaneBody from '../FluxPaneBody.vue';
    import FluxSpinner from '../FluxSpinner.vue';
    import Anchor from './Anchor.vue';
    import AnchorPopup from './AnchorPopup.vue';

    const INITIAL_HIGHLIGHTED_INDEX = -1;

    export type Emits = {
        (e: 'key-down', evt: KeyboardEvent): void;
        (e: 'deselect', id: string | number | null): void;
        (e: 'select', id: string | number | null): void;
        (e: 'search', searchQuery: string): void;
        (e: 'close'): void;
        (e: 'open'): void;
    };

    export type Props = {
        readonly isDisabled?: boolean;
        readonly isLoading?: boolean;
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FormSelectGroup[];
        readonly placeholder?: string;
        readonly selected: FluxFormSelectOption[];
    };

    const emit = defineEmits<Emits>();
    const modelSearch = defineModel<string>('searchQuery', {default: ''});
    const props = defineProps<Props>();
    const {isMultiple, options} = toRefs(props);

    const {id} = useFormFieldInjection();
    const translate = useTranslate();

    const anchorRef = ref<ComponentPublicInstance>();
    const anchorPopupRef = ref<ComponentPublicInstance>();
    const optionElementRefs = ref<ComponentPublicInstance[]>([]);
    const searchInputElement = ref<HTMLInputElement>();

    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);
    const isPopupOpen = ref(false);

    const focusElement = computed(() => ensureElement(unref(searchInputElement) ?? unref(anchorRef)));
    const highlightedId = computed(() => unref(rawOptions)[unref(highlightedIndex)]?.id);
    const rawOptions = computed(() => unref(options).map(group => group[1]).flat());

    useClickOutside([anchorRef, anchorPopupRef], isPopupOpen, () => isPopupOpen.value = false);
    useClickOutside(anchorRef, isPopupOpen, () => unref(focusElement)?.focus());

    function deselect(id: string | number | null): void {
        emit('deselect', id);

        nextTick(() => unref(focusElement)?.focus());
    }

    function select(id: string | number | null): void {
        emit('select', id);

        !unref(isMultiple) && (isPopupOpen.value = false);

        highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX;
        modelSearch.value = '';

        nextTick(() => unref(focusElement)?.focus());
    }

    function toggle(): void {
        isPopupOpen.value = !unref(isPopupOpen);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        emit('key-down', evt);

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

                if (search.length > 0 || props.selected.length === 0) {
                    return;
                }

                deselect(props.selected[props.selected.length - 1].id);
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
        const options = unref(optionElementRefs);
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
            const searchInput = unref(searchInputElement);
            searchInput?.focus();
        });

        nextTick(() => {
            const options = unref(optionElementRefs);

            if (unref(isMultiple)) {
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

    watch(options, () => highlightedIndex.value = INITIAL_HIGHLIGHTED_INDEX);
</script>

<style lang="scss">
    @use '../../css/mixin' as flux;

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

        &-popup.flux-pane {
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

            &.is-searchable .flux-menu-sub-header {
                top: 48px;
            }

            .flux-menu-item {
                content-visibility: auto;
                contain-intrinsic-size: auto 42px;
            }
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
