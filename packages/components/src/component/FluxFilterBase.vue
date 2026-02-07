<template>
    <slot v-bind="{buttons, filters, menuItems}"/>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentName, getComponentProps } from '@flux-ui/internals';
    import type { FluxFilterItem, FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import { computed, provide, unref, type VNode } from 'vue';
    import { filterParsers, FluxFilterInjectionKey } from '$flux/data';
    import { camelCase } from 'lodash-es';

    const emit = defineEmits<{
        back: [];
        reset: [string]
    }>();

    const modelValue = defineModel<FluxFilterState>({
        required: true
    });

    defineProps<{
        readonly resettable?: string[];
    }>();

    const slots = defineSlots<{
        default(props: {
            readonly buttons: Record<string, FluxFilterItem>;
            readonly filters: Record<string, VNode>;
            readonly menuItems: (FluxFilterItem | VNode)[][];
        }): any;

        filters(): any;
    }>();

    const buttons = computed(() => {
        const buttons: Record<string, FluxFilterItem> = {};
        const items = unref(flattenedFilters);

        for (const item of items) {
            const name = getComponentName(item);

            if (!name.startsWith('FluxFilter')) {
                continue;
            }

            const props = getComponentProps<Omit<FluxFilterItem, 'type'>>(item);
            const type = camelCase(name.substring(10)) as FluxFilterItem['type'];

            buttons[props.name] = filterParsers[type](props);
        }

        return buttons;
    });

    const flattenedFilters = computed(() => flattenVNodeTree(slots.filters?.() ?? []));

    const filters = computed<Record<string, VNode>>(() => {
        const filters: { [key: string]: VNode; } = {};
        const items = unref(flattenedFilters);

        for (const item of items) {
            const name = getComponentName(item);

            if (!name.startsWith('FluxFilter')) {
                continue;
            }

            const props = getComponentProps<{ name: string; }>(item);

            if (!props.name) {
                continue;
            }

            filters[props.name] = item;
        }

        return filters;
    });

    const menuItems = computed<(FluxFilterItem | VNode)[][]>(() => {
        const menuItems: (FluxFilterItem | VNode)[][] = [[]];
        const items = unref(flattenedFilters);

        for (const item of items) {
            const name = getComponentName(item);

            if (name === 'FluxSeparator') {
                menuItems.push([]);
                continue;
            }

            if (name.startsWith('FluxFilter')) {
                const props = getComponentProps<Omit<FluxFilterItem, 'type'>>(item);
                const type = camelCase(name.substring(10)) as FluxFilterItem['type'];

                menuItems[menuItems.length - 1].push(filterParsers[type](props));
                continue;
            }

            menuItems[menuItems.length - 1].push(item);
        }

        return menuItems;
    });

    function back(): void {
        emit('back');
    }

    function reset(name: string): void {
        back();
        emit('reset', name);
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

    function setValue(name: string, value: FluxFilterOptionItem['value']): void {
        modelValue.value[name] = value;
    }

    provide(FluxFilterInjectionKey, {
        state: modelValue,
        back,
        reset,
        getValue,
        hasValue,
        setValue
    });
</script>
