<template>
    <div
        :class="$style.avatarGroup"
        :style="{
            fontSize: `${size}px`,
            '--overlap': overlap
        }"
        role="group">
        <component :is="renderVisible"/>

        <FluxTooltip
            v-if="overflowCount > 0"
            :content="overflowTooltip">
            <span :class="$style.avatarGroupItem">
                <FluxAvatar
                    :alt="overflowLabel"
                    fallback="neutral"
                    :fallback-initials="`+${overflowCount}`"/>
            </span>
        </FluxTooltip>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentProps } from '@flux-ui/internals';
    import { computed, h, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxAvatar from './FluxAvatar.vue';
    import FluxTooltip from './FluxTooltip.vue';
    import $style from '~flux/components/css/component/AvatarGroup.module.scss';

    const {
        max,
        overlap = 0.3,
        size = 32
    } = defineProps<{
        readonly max?: number;
        readonly overlap?: number;
        readonly size?: number;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    const translate = useTranslate();

    const children = computed(() => flattenVNodeTree(slots.default?.() ?? []).filter(vnode => typeof vnode.type !== 'symbol'));
    const visibleChildren = computed(() => max !== undefined && children.value.length > max ? children.value.slice(0, max) : children.value);
    const hiddenChildren = computed(() => max !== undefined && children.value.length > max ? children.value.slice(max) : []);

    const overflowCount = computed(() => hiddenChildren.value.length);
    const overflowLabel = computed(() => translate('flux.andNMore', {n: overflowCount.value}));

    const overflowTooltip = computed(() => {
        const names = hiddenChildren.value
            .map(vnode => {
                const props = getComponentProps<{ alt?: string; fallbackInitials?: string; }>(vnode);

                return props.alt ?? props.fallbackInitials;
            })
            .filter((name): name is string => !!name);

        return names.length > 0 ? names.join(', ') : overflowLabel.value;
    });

    const renderVisible = () => visibleChildren.value.map((vnode, index) => h('span', {
        class: $style.avatarGroupItem,
        key: vnode.key ?? index
    }, [vnode]));
</script>
