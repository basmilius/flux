<template>
    <slot v-bind="{buttons, filters, menuItems}"/>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentName, getComponentProps } from '@flux-ui/internals';
    import type { FluxFilterDefinition, FluxFilterState, FluxFilterValue } from '@flux-ui/types';
    import { computed, provide, unref, watchEffect, type VNode } from 'vue';
    import { FluxFilterInjectionKey } from '~flux/components/data';

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
            readonly buttons: Record<string, FluxFilterDefinition>;
            readonly filters: Record<string, VNode>;
            readonly menuItems: (FluxFilterDefinition | VNode)[][];
        }): VNode[];

        filters(): VNode[];
    }>();

    function resolveDefinition(vnode: VNode): FluxFilterDefinition | null {
        const factory = (vnode.type as { __filterDefinitionFactory?: (props: unknown) => FluxFilterDefinition })?.__filterDefinitionFactory;

        return typeof factory === 'function' ? factory(getComponentProps(vnode)) : null;
    }

    const flattenedFilters = computed(() => flattenVNodeTree(slots.filters?.() ?? []));

    const buttons = computed(() => {
        const buttons: Record<string, FluxFilterDefinition> = {};
        const items = unref(flattenedFilters);

        for (const item of items) {
            const definition = resolveDefinition(item);

            if (!definition) {
                continue;
            }

            buttons[definition.name] = definition;
        }

        return buttons;
    });

    const filters = computed<Record<string, VNode>>(() => {
        const filters: { [key: string]: VNode; } = {};
        const items = unref(flattenedFilters);

        for (const item of items) {
            const definition = resolveDefinition(item);

            if (!definition) {
                continue;
            }

            filters[definition.name] = item;
        }

        return filters;
    });

    const menuItems = computed<(FluxFilterDefinition | VNode)[][]>(() => {
        const menuItems: (FluxFilterDefinition | VNode)[][] = [[]];
        const items = unref(flattenedFilters);

        for (const item of items) {
            if (getComponentName(item) === 'FluxSeparator') {
                menuItems.push([]);
                continue;
            }

            const definition = resolveDefinition(item);

            if (definition) {
                menuItems[menuItems.length - 1].push(definition);
                continue;
            }

            menuItems[menuItems.length - 1].push(item);
        }

        return menuItems;
    });

    watchEffect(() => {
        const state = unref(modelValue);

        for (const definition of Object.values(unref(buttons))) {
            if (definition.defaultValue !== undefined && state[definition.name] === undefined) {
                modelValue.value[definition.name] = definition.defaultValue as FluxFilterValue;
            }
        }
    });

    function back(): void {
        emit('back');
    }

    function reset(name: string): void {
        const definition = unref(buttons)[name];

        back();
        modelValue.value[name] = (definition?.defaultValue ?? null) as FluxFilterValue;
        definition?.onClear?.();
        emit('reset', name);
    }

    function getValue(name: string): FluxFilterValue | undefined {
        if (!hasValue(name)) {
            return undefined;
        }

        return unref(modelValue)[name] as FluxFilterValue;
    }

    function hasValue(name: string): boolean {
        return name in unref(modelValue);
    }

    function setValue(name: string, value: FluxFilterValue): void {
        modelValue.value[name] = value;
        unref(buttons)[name]?.onChange?.(value);
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
