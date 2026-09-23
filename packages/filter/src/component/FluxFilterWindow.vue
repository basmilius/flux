<template>
    <div
        ref="root"
        v-height-transition
        :class="$style.filter">
        <FluxWindow ref="window">
            <template #default="{navigate}">
                <FluxMenu is-persistent>
                    <FilterMenuRenderer
                        :menu-items="menuItems"
                        :navigate="to => onNavigate(navigate, to)"/>
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
                            @click="reset(name)"/>

                        <FluxMenuItem
                            :class="$style.filterAction"
                            icon-leading="trash"
                            is-destructive
                            @click="clear(name)"/>
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
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxWindow } from '@flux-ui/components';
    import { getFocusableElement, vHeightTransition, VNodeRenderer } from '@flux-ui/internals';
    import type { FluxFilterDefinition } from '@flux-ui/types';
    import { nextTick, unref, useTemplateRef, type VNode } from 'vue';
    import { useFilterInjection } from '~flux/filter/composable';
    import { useTranslate } from '~flux/filter/composable/private';
    import { isResettable } from '~flux/filter/util';
    import { FilterMenuRenderer } from './primitive';
    import $style from '~flux/filter/css/component/Filter.module.scss';

    defineProps<{
        readonly filters: Record<string, VNode>;
        readonly menuItems: (FluxFilterDefinition | VNode)[][];
    }>();

    const rootRef = useTemplateRef<HTMLDivElement>('root');
    const windowRef = useTemplateRef<{ back(to: string): void; }>('window');

    const {clear: clearFilter, getDefinition, getValue, reset: resetFilter} = useFilterInjection();

    const translate = useTranslate();

    async function focusPanel(): Promise<void> {
        await nextTick();

        const root = unref(rootRef);

        if (!root) {
            return;
        }

        getFocusableElement(root, 1, undefined)?.focus();
    }

    function onNavigate(navigate: (to: string) => void, to: string): void {
        navigate(to);
        focusPanel();
    }

    function back(): void {
        unref(windowRef)?.back('default');
        focusPanel();
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
