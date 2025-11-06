<template>
    <div
        v-height-transition
        :class="$style.filter">
        <FluxWindow ref="window">
            <template #default="{navigate}">
                <FluxMenu>
                    <FilterMenuRenderer
                        :menu-items="menuItems"
                        :navigate="navigate"/>
                </FluxMenu>
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
    import { vHeightTransition } from '@flux-ui/internals';
    import type { FluxFilterItem } from '@flux-ui/types';
    import { unref, useTemplateRef, type VNode } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxWindow from './FluxWindow.vue';
    import $style from '$flux/css/component/Filter.module.scss';

    const emit = defineEmits<{
        reset: [string]
    }>();

    defineProps<{
        readonly filters: Record<string, VNode>;
        readonly menuItems: (FluxFilterItem | VNode)[][];
        readonly resettable?: string[];
    }>();

    defineSlots<{
        default(): any;
    }>();

    const translate = useTranslate();

    const windowRef = useTemplateRef<{ back(to: string): void; }>('window');

    function back(): void {
        unref(windowRef)?.back('default');
    }

    function reset(name: string): void {
        back();
        emit('reset', name);
    }
</script>
