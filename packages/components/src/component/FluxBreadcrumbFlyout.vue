<template>
    <FluxMenuFlyout
        v-if="isCollapsed"
        :icon="icon"
        :label="label">
        <FluxMenu>
            <slot/>
        </FluxMenu>
    </FluxMenuFlyout>

    <li
        v-else
        :class="$style.breadcrumbItem">
        <FluxFlyout :label="ariaLabel ?? label">
            <template #opener="{isOpen, toggle}">
                <FluxPressable
                    component-type="button"
                    :class="clsx(
                        $style.breadcrumbLink,
                        $style.breadcrumbFlyoutTrigger,
                        isOpen && $style.isOpen
                    )"
                    :aria-label="ariaLabel ?? label"
                    aria-haspopup="menu"
                    :aria-expanded="isOpen"
                    @click="toggle()">
                    <slot name="leading"/>

                    <FluxIcon
                        v-if="icon"
                        :class="$style.breadcrumbIcon"
                        :name="icon"
                        :size="16"/>

                    <span
                        v-if="label"
                        :class="$style.breadcrumbLabel">
                        {{ label }}
                    </span>

                    <FluxIcon
                        aria-hidden="true"
                        :class="$style.breadcrumbChevron"
                        name="angle-down"
                        :size="12"/>
                </FluxPressable>
            </template>

            <FluxMenu>
                <slot/>
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
    import { inject, ref, type VNode } from 'vue';
    import { FluxBreadcrumbCollapsedInjectionKey, FluxBreadcrumbSeparatorInjectionKey } from '~flux/components/data';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuFlyout from './FluxMenuFlyout.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Breadcrumb.module.scss';

    defineProps<{
        readonly ariaLabel?: string;
        readonly icon?: FluxIconName;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): VNode[];
        leading(): VNode[];
    }>();

    const isCollapsed = inject(FluxBreadcrumbCollapsedInjectionKey, ref(false));
    const separator = inject(FluxBreadcrumbSeparatorInjectionKey, ref<FluxIconName>('angle-right'));
</script>
