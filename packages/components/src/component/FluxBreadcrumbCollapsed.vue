<template>
    <li :class="$style.breadcrumbItem">
        <FluxFlyout :label="label">
            <template #opener="{isOpen, toggle}">
                <FluxPressable
                    component-type="button"
                    :class="clsx(
                        $style.breadcrumbLink,
                        $style.breadcrumbCollapse,
                        isOpen && $style.isOpen
                    )"
                    :aria-label="label"
                    aria-haspopup="menu"
                    :aria-expanded="isOpen"
                    @click="toggle()">
                    <FluxIcon
                        name="ellipsis-h"
                        :size="16"/>
                </FluxPressable>
            </template>

            <FluxMenu>
                <FluxDynamicView
                    v-for="(vnode, index) in items"
                    :key="index"
                    :vnode="vnode"/>
            </FluxMenu>
        </FluxFlyout>

        <FluxIcon
            aria-hidden="true"
            :class="$style.breadcrumbSeparator"
            :name="separator"
            :size="12"/>
    </li>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { inject, provide, ref, type VNode } from 'vue';
    import { FluxBreadcrumbCollapsedInjectionKey, FluxBreadcrumbSeparatorInjectionKey } from '~flux/components/data';
    import FluxDynamicView from './FluxDynamicView.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Breadcrumb.module.scss';

    defineProps<{
        readonly items: VNode[];
        readonly label?: string;
    }>();

    const separator = inject(FluxBreadcrumbSeparatorInjectionKey, ref<FluxIconName>('angle-right'));

    // Only this subtree renders collapsed items, so the flag lives here — not on
    // FluxBreadcrumb, whose provide would also reach the visible trail items.
    provide(FluxBreadcrumbCollapsedInjectionKey, ref(true));
</script>
