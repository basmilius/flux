<template>
    <div
        v-height-transition
        class="flux-pane flux-filter">
        <flux-window ref="window">
            <template #default="{navigate}">
                <filter-menu-renderer
                    :navigate="navigate"
                    :state="modelValue">
                    <slot/>
                </filter-menu-renderer>
            </template>

            <template
                v-for="(filter, name) of filters"
                #[name]="{back}">
                <flux-menu>
                    <flux-menu-group is-horizontal>
                        <flux-menu-item
                            class="flux-filter-back"
                            :label="translate('flux_back')"
                            icon-before="angle-left"
                            @click="back('default')"/>

                        <flux-menu-item
                            v-if="hasValue(name)"
                            class="flux-filter-reset"
                            icon-before="trash"
                            @click="reset(name)"/>
                    </flux-menu-group>

                    <flux-separator/>

                    <v-node-renderer :vnode="filter"/>
                </flux-menu>
            </template>
        </flux-window>
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
    import { computed, provide, ref, toRefs, unref, VNode } from 'vue-demi';
    import { useSlotVNodes, useTranslate } from '../composables';
    import { FluxFilterItem, FluxFilterOptionItem } from '../data';
    import { heightTransition } from '../directives';
    import { getNormalizedComponentName, getNormalizedComponentProps } from '../utils';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxWindow } from '.';

    export interface Emits {
        (e: 'update:modelValue', state: Record<string, unknown>): void;
    }

    export interface Props {
        readonly modelValue: Record<string, unknown>;
    }

    const vHeightTransition = heightTransition;

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {modelValue} = toRefs(props);

    const defaultSlotContent = useSlotVNodes('default');
    const translate = useTranslate();

    const window = ref<{ back: Function; }>();

    const entries = computed(() => {
        const groups: (FluxFilterItem | number)[][] = [[]];
        const items = unref(defaultSlotContent);

        for (let index = 0; index < items.length; ++index) {
            const item = items[index];
            const name = getNormalizedComponentName(item);

            if (name === 'flux-separator') {
                groups.push([]);
                continue;
            }

            if (name.startsWith('flux-filter-')) {
                groups[groups.length - 1].push(getNormalizedComponentProps<FluxFilterItem>(item));
                continue;
            }

            groups[groups.length - 1].push(index);
        }

        return groups;
    });

    const filters = computed(() => {
        const filters: { [key: string]: VNode; } = {};
        const items = unref(defaultSlotContent);

        for (let index = 0; index < items.length; ++index) {
            const item = items[index];
            const name = getNormalizedComponentName(item);

            if (!name.startsWith('flux-filter-')) {
                continue;
            }

            const props = getNormalizedComponentProps<{ name: string; }>(item);

            if (!props.name) {
                continue;
            }

            filters[props.name] = item;
        }

        return filters;
    });

    function back(): void {
        unref(window)?.back('default');
    }

    function reset(name: string): void {
        setValue(name, undefined);
        back();
    }

    function getValue(name: string): FluxFilterOptionItem['value'] | undefined {
        if (!hasValue(name)) {
            return undefined;
        }

        return unref(modelValue)[name] as FluxFilterOptionItem['value'];
    }

    function hasValue(name: string): boolean {
        return name in unref(modelValue);
    }

    function setValue(name: string, value?: FluxFilterOptionItem['value']): void {
        emit('update:modelValue', Object.assign(unref(modelValue), {
            [name]: value
        }));
    }

    provide('flux-filter', {
        state: modelValue,
        back,
        reset,
        getValue,
        hasValue,
        setValue
    });
</script>

<style lang="scss">
    .flux-filter {
        min-width: 300px;

        &-back {
            flex-grow: 1;
        }

        &-reset.flux-menu-item {
            width: 42px;
            justify-content: center;
        }
    }
</style>
