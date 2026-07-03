<template>
    <FluxPressable
        :class="clsx(
            color === 'gray' && $style.badgeGroupGray,
            color === 'primary' && $style.badgeGroupPrimary,
            color === 'danger' && $style.badgeGroupDanger,
            color === 'info' && $style.badgeGroupInfo,
            color === 'success' && $style.badgeGroupSuccess,
            color === 'warning' && $style.badgeGroupWarning,
            size === 'small' && $style.badgeGroupSmall,
            size === 'large' && $style.badgeGroupLarge,
            !!slots.start && $style.badgeGroupHasStart,
            !!slots.end && $style.badgeGroupHasEnd
        )"
        :component-type="type"
        :tabindex="tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <component :is="renderStart"/>

        <FluxIcon
            v-if="iconLeading"
            :class="$style.badgeGroupIcon"
            :name="iconLeading"
            :size="iconSize"/>

        <span :class="$style.badgeGroupLabel">
            {{ label }}
        </span>

        <FluxIcon
            v-if="iconTrailing"
            :class="$style.badgeGroupIcon"
            :name="iconTrailing"
            :size="iconSize"/>

        <component :is="renderEnd"/>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentProps } from '@flux-ui/internals';
    import type { FluxButtonEmits, FluxColor, FluxIconName, FluxPressableType, FluxSize, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { cloneVNode, computed, type VNode } from 'vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Badge.module.scss';

    defineEmits<FluxButtonEmits>();

    const {
        color = 'gray',
        size = 'medium',
        type = 'none'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly label: string;
        readonly size?: FluxSize;
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    const slots = defineSlots<{
        start?(): VNode[];
        end?(): VNode[];
    }>();

    const iconSizes = {
        small: 12,
        medium: 16,
        large: 18
    } as const;

    const iconSize = computed(() => iconSizes[size]);

    function renderBadges(nodes: VNode[] | undefined): VNode[] {
        return flattenVNodeTree(nodes ?? [])
            .filter(vnode => typeof vnode.type !== 'symbol')
            .map(vnode => {
                const props = getComponentProps<{ color?: FluxColor; size?: FluxSize; }>(vnode);

                return cloneVNode(vnode, {
                    color: props.color ?? color,
                    size: props.size ?? size
                });
            });
    }

    const renderStart = () => renderBadges(slots.start?.());
    const renderEnd = () => renderBadges(slots.end?.());
</script>
