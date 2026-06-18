<template>
    <div
        v-height-transition
        :class="$style.filter">
        <FluxWindow ref="window">
            <template #default="{navigate}">
                <FluxMenu is-persistent>
                    <FilterMenuRenderer
                        :menu-items="menuItems"
                        :navigate="navigate"/>
                </FluxMenu>
            </template>

            <template
                v-for="(filter, name) of filters"
                #[name]>
                <FluxMenu is-persistent>
                    <FluxMenuGroup
                        :class="$style.filterHeader"
                        is-horizontal>
                        <FluxMenuItem
                            :class="$style.filterBack"
                            :label="translate('flux.back')"
                            icon-leading="angle-left"
                            @click="back()"/>

                        <FluxMenuItem
                            v-if="canReset(name)"
                            :class="$style.filterAction"
                            icon-leading="rotate-left"
                            @click="reset(name)"
                            style="flex-grow: 0"/>

                        <FluxMenuItem
                            :class="$style.filterAction"
                            icon-leading="trash"
                            is-destructive
                            @click="clear(name)"
                            style="flex-grow: 0"/>
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
    import { vHeightTransition } from '@flux-ui/internals';
    import type { FluxFilterDefinition } from '@flux-ui/types';
    import { unref, useTemplateRef, type VNode } from 'vue';
    import { useFilterInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import { isResettable } from '~flux/components/util';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxWindow from './FluxWindow.vue';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import $style from '~flux/components/css/component/Filter.module.scss';

    defineProps<{
        readonly filters: Record<string, VNode>;
        readonly menuItems: (FluxFilterDefinition | VNode)[][];
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const {clear: clearFilter, getDefinition, getValue, reset: resetFilter} = useFilterInjection();

    const translate = useTranslate();

    const windowRef = useTemplateRef<{ back(to: string): void; }>('window');

    function back(): void {
        unref(windowRef)?.back('default');
    }

    function clear(name: string): void {
        back();
        clearFilter(name);
    }

    function reset(name: string): void {
        back();
        resetFilter(name);
    }

    function canReset(name: string): boolean {
        return isResettable(getDefinition(name), getValue(name));
    }
</script>
