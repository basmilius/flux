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
                            @click="reset(name)"
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
    import { useTranslate } from '~flux/components/composable/private';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxWindow from './FluxWindow.vue';
    import { FilterMenuRenderer, VNodeRenderer } from './primitive';
    import $style from '~flux/components/css/component/Filter.module.scss';

    const emit = defineEmits<{
        reset: [string]
    }>();

    defineProps<{
        readonly filters: Record<string, VNode>;
        readonly menuItems: (FluxFilterDefinition | VNode)[][];
        readonly resettable?: string[];
    }>();

    defineSlots<{
        default(): VNode[];
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
