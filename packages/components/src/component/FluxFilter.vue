<template>
    <div
        v-height-transition
        :class="$style.filter">
        <FluxWindow ref="window">
            <template #default="{navigate}">
                <FilterMenuRenderer
                    :navigate="navigate"
                    :state="modelValue">
                    <slot/>
                </FilterMenuRenderer>
            </template>

            <template
                v-for="(filter, name) of filters"
                #[name]>
                <FluxMenu>
                    <FluxMenuGroup
                        :class="$style.filterHeader"
                        is-horizontal>
                        <FluxMenuItem
                            :class="$style.filterBack"
                            :label="translate('flux.back')"
                            icon-leading="angle-left"
                            @click="back()"/>

                        <FluxMenuItem
                            v-if="resettable?.includes(name)"
                            :class="$style.filterReset"
                            icon-leading="trash"
                            is-destructive
                            @click="reset(name)"/>
                    </FluxMenuGroup>

                    <VNodeRenderer :vnode="filter"/>
                </FluxMenu>
            </template>
        </FluxWindow>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentName, getComponentProps, vHeightTransition } from '@flux-ui/internals';
    import type { FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import { computed, provide, unref, useTemplateRef, VNode } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import { FluxFilterInjectionKey } from '$flux/data';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxWindow from './FluxWindow.vue';
    import $style from '$flux/css/component/Filter.module.scss';

    const emit = defineEmits<{
        reset: [string]
    }>();

    const modelValue = defineModel<FluxFilterState>({
        required: true
    });

    defineProps<{
        readonly resettable?: string[];
    }>();

    const slots = defineSlots<{
        default(): any;
    }>();

    const translate = useTranslate();

    const windowRef = useTemplateRef<{ back(to: string): void; }>('window');

    const filters = computed<Record<string, VNode>>(() => {
        const filters: { [key: string]: VNode; } = {};
        const items = flattenVNodeTree(slots.default?.() ?? []);

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

    function back(): void {
        unref(windowRef)?.back('default');
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
