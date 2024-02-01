<template>
    <div
        v-height-transition
        class="flux-pane flux-filter">
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
                #[name]="{back}">
                <FluxMenu>
                    <FluxMenuGroup is-horizontal>
                        <FluxMenuItem
                            class="flux-filter-back"
                            :label="translate('flux.back')"
                            icon-before="angle-left"
                            @click="back('default')"/>

                        <FluxMenuItem
                            v-if="resettable?.includes(name)"
                            class="flux-filter-reset"
                            icon-before="trash"
                            is-destructive
                            @click="reset(name)"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <VNodeRenderer :vnode="filter"/>
                </FluxMenu>
            </template>
        </FluxWindow>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, provide, ref, unref, useSlots, VNode } from 'vue';
    import { useTranslate } from '@/composable/private';
    import { FluxFilterInjectionKey, FluxFilterOptionItem, FluxFilterState } from '@/data';
    import { heightTransition } from '@/directive';
    import { flattenVNodeTree, getComponentName, getComponentProps } from '@/util';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxSeparator from './FluxSeparator.vue';
    import FluxWindow from './FluxWindow.vue';

    const vHeightTransition = heightTransition;

    export type Emits = {
        reset: [name: string]
    };

    export type Props = {
        readonly resettable?: string[];
    };

    const modelValue = defineModel<FluxFilterState>({required: true});
    const emit = defineEmits<Emits>();
    defineProps<Props>();

    const slots = useSlots();
    const translate = useTranslate();

    const window = ref<{ back: Function; }>();

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
        unref(window)?.back('default');
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

<style lang="scss">
    .flux-filter {
        min-width: 300px;
        max-width: 330px;
        max-height: 50dvh;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
            height: 0;
            width: 0;
        }

        &-back {
            flex-grow: 1;
        }

        &-reset {
            width: 42px;
            justify-content: center;
        }
    }
</style>
