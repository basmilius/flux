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
                            :label="translate('flux_back')"
                            icon-before="angle-left"
                            @click="back('default')"/>

                        <FluxMenuItem
                            v-if="hasValue(name)"
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

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue-demi';
    import { computed, provide, ref, toRefs, unref } from 'vue-demi';
    import { useSlotVNodes, useTranslate } from '@/composables';
    import { FluxFilterInjectionKey, FluxFilterOptionItem, FluxFilterValue } from '@/data';
    import { heightTransition } from '@/directives';
    import { getNormalizedComponentName, getNormalizedComponentProps } from '@/utils';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxSeparator from './FluxSeparator.vue';
    import FluxWindow from './FluxWindow.vue';

    export interface Emits {
        (e: 'update:model-value', state: Record<string, unknown>): void;
    }

    export interface Props {
        readonly modelValue: Record<string, FluxFilterValue>;
    }

    const vHeightTransition = heightTransition;

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {modelValue} = toRefs(props);

    const defaultSlotContent = useSlotVNodes('default');
    const translate = useTranslate();

    const window = ref<{ back: Function; }>();

    const filters = computed(() => {
        const filters: { [key: string]: VNode; } = {};
        const items = unref(defaultSlotContent);

        for (const item of items) {
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

    function reset(name: string | number): void {
        setValue(name);
        back();
    }

    function getValue(name: string | number): FluxFilterOptionItem['value'] | undefined {
        if (!hasValue(name)) {
            return undefined;
        }

        return unref(modelValue)[name] as FluxFilterOptionItem['value'];
    }

    function hasValue(name: string | number): boolean {
        return name in unref(modelValue);
    }

    function setValue(name: string | number, value?: FluxFilterOptionItem['value']): void {
        emit('update:model-value', Object.assign(unref(modelValue), {
            [name]: value
        }));
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
