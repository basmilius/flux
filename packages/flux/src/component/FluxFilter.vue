<template>
    <div
        v-height-transition
        :class="styles.filter">
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
                        :class="styles.filterHeader"
                        is-horizontal>
                        <FluxMenuItem
                            :class="styles.filterBack"
                            :label="translate('flux.back')"
                            icon-before="angle-left"
                            @click="back()"/>

                        <FluxMenuItem
                            v-if="resettable?.includes(name)"
                            :class="styles.filterReset"
                            icon-before="trash"
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
    import { computed, provide, unref, useSlots, useTemplateRef, VNode } from 'vue';
    import { useTranslate } from '@/composable/private';
    import { FluxFilterInjectionKey, FluxFilterOptionItem, FluxFilterState } from '@/data';
    import { heightTransition } from '@/directive';
    import { flattenVNodeTree, getComponentName, getComponentProps } from '@/util';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxWindow from './FluxWindow.vue';
    import styles from '@/css/component/Filter.module.scss';

    const vHeightTransition = heightTransition;

    export type Emits = {
        reset: [string]
    };

    export type Props = {
        readonly resettable?: string[];
    };

    const modelValue = defineModel<FluxFilterState>({required: true});
    const emit = defineEmits<Emits>();
    defineProps<Props>();

    const slots = useSlots();
    const translate = useTranslate();

    const windowRef = useTemplateRef('window');

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
