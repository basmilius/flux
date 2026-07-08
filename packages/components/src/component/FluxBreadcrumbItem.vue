<template>
    <FluxMenuItem
        v-if="isCollapsed"
        :href="href"
        :icon-leading="icon"
        :label="label"
        :to="to"
        @click="emit('click', $event)">
        <template
            v-if="$slots.leading"
            #before>
            <slot name="leading"/>
        </template>
    </FluxMenuItem>

    <li
        v-else
        :class="$style.breadcrumbItem">
        <FluxPressable
            :class="clsx(
                $style.breadcrumbLink,
                isCurrent && $style.isCurrent
            )"
            :component-type="componentType"
            :href="href"
            :to="to"
            :aria-current="isCurrent ? 'page' : undefined"
            @click="emit('click', $event)">
            <slot name="leading"/>

            <FluxIcon
                v-if="icon"
                :class="$style.breadcrumbIcon"
                :name="icon"
                :size="16"/>

            <span
                v-if="label || $slots.default"
                :class="$style.breadcrumbLabel">
                <slot>{{ label }}</slot>
            </span>

            <slot name="trailing"/>
        </FluxPressable>

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
    import type { FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, ref, type VNode } from 'vue';
    import { FluxBreadcrumbCollapsedInjectionKey, FluxBreadcrumbSeparatorInjectionKey } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Breadcrumb.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {href, isCurrent: isCurrentProp, to} = defineProps<{
        readonly href?: string;
        readonly icon?: FluxIconName;
        readonly isCurrent?: boolean;
        readonly label?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): VNode[];
        leading(): VNode[];
        trailing(): VNode[];
    }>();

    const isCollapsed = inject(FluxBreadcrumbCollapsedInjectionKey, ref(false));
    const separator = inject(FluxBreadcrumbSeparatorInjectionKey, ref<FluxIconName>('angle-right'));

    const componentType = computed<FluxPressableType>(() => {
        if (to) {
            return 'route';
        }

        if (href) {
            return 'link';
        }

        return 'none';
    });

    // Defaults to "current" when the item has no link, but can be set explicitly
    // so a linked last item can still be the current page, and a non-linked
    // intermediate item is not wrongly marked as current.
    const isCurrent = computed(() => isCurrentProp ?? componentType.value === 'none');
</script>
