<template>
    <slot v-bind="{buttons, filters, menuItems, clear, reset}"/>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentName, getComponentProps } from '@flux-ui/internals';
    import type { FluxFilterDefinition, FluxFilterState, FluxFilterValue } from '@flux-ui/types';
    import { computed, provide, unref, watch, type VNode } from 'vue';
    import { FluxFilterInjectionKey } from '~flux/components/data';

    const emit = defineEmits<{
        back: [];
        clear: [string];
        reset: [string];
    }>();

    const modelValue = defineModel<FluxFilterState>({
        required: true
    });

    const slots = defineSlots<{
        default(props: {
            readonly buttons: Record<string, FluxFilterDefinition>;
            readonly filters: Record<string, VNode>;
            readonly menuItems: (FluxFilterDefinition | VNode)[][];
            clear(name: string): void;
            reset(name: string): void;
        }): VNode[];

        filters(): VNode[];
    }>();

    function resolveDefinition(vnode: VNode): FluxFilterDefinition | null {
        const factory = (vnode.type as { __filterDefinitionFactory?: (props: unknown) => FluxFilterDefinition })?.__filterDefinitionFactory;

        return typeof factory === 'function' ? factory(getComponentProps(vnode)) : null;
    }

    const flattenedFilters = computed(() => flattenVNodeTree(slots.filters?.() ?? []));

    const buttons = computed(() => {
        const result: Record<string, FluxFilterDefinition> = {};
        const items = unref(flattenedFilters);

        for (const item of items) {
            const definition = resolveDefinition(item);

            if (!definition) {
                continue;
            }

            result[definition.name] = definition;
        }

        return result;
    });

    const filters = computed<Record<string, VNode>>(() => {
        const result: { [key: string]: VNode; } = {};
        const items = unref(flattenedFilters);

        for (const item of items) {
            const definition = resolveDefinition(item);

            if (!definition) {
                continue;
            }

            result[definition.name] = item;
        }

        return result;
    });

    const menuItems = computed<(FluxFilterDefinition | VNode)[][]>(() => {
        const result: (FluxFilterDefinition | VNode)[][] = [[]];
        const items = unref(flattenedFilters);

        for (const item of items) {
            if (getComponentName(item) === 'FluxSeparator') {
                result.push([]);
                continue;
            }

            const definition = resolveDefinition(item);

            if (definition) {
                result[result.length - 1].push(definition);
                continue;
            }

            result[result.length - 1].push(item);
        }

        return result.filter(group => group.length > 0);
    });

    watch(buttons, definitions => {
        const state = unref(modelValue);

        for (const definition of Object.values(definitions)) {
            if (definition.defaultValue !== undefined && state[definition.name] === undefined) {
                modelValue.value[definition.name] = definition.defaultValue as FluxFilterValue;
            }
        }
    }, {immediate: true});

    function back(): void {
        emit('back');
    }

    function clear(name: string): void {
        const definition = unref(buttons)[name];

        back();
        delete modelValue.value[name];
        definition?.onClear?.();
        emit('clear', name);
    }

    function reset(name: string): void {
        const definition = unref(buttons)[name];

        back();

        if (definition?.defaultValue !== undefined) {
            const defaultValue = definition.defaultValue as FluxFilterValue;

            modelValue.value[name] = defaultValue;
            definition.onChange?.(defaultValue);
        } else {
            delete modelValue.value[name];
            definition?.onClear?.();
        }

        emit('reset', name);
    }

    function getDefinition(name: string): FluxFilterDefinition | undefined {
        return unref(buttons)[name];
    }

    function getValue(name: string): FluxFilterValue | undefined {
        if (!hasValue(name)) {
            return undefined;
        }

        return unref(modelValue)[name] as FluxFilterValue;
    }

    function hasValue(name: string): boolean {
        const value = unref(modelValue)[name];

        return value !== null && value !== undefined;
    }

    function setValue(name: string, value: FluxFilterValue): void {
        modelValue.value[name] = value;
        unref(buttons)[name]?.onChange?.(value);
    }

    provide(FluxFilterInjectionKey, {
        state: modelValue,
        back,
        clear,
        getDefinition,
        getValue,
        hasValue,
        reset,
        setValue
    });
</script>
