<template>
    <li :class="$style.breadcrumbItem">
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
        </FluxPressable>

        <FluxIcon
            aria-hidden="true"
            :class="$style.breadcrumbSeparator"
            name="slash-forward"
            :size="12"/>
    </li>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type VNode } from 'vue';
    import FluxIcon from './FluxIcon.vue';
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
    }>();

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
