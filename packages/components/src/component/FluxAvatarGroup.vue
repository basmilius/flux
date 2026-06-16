<template>
    <div
        :class="$style.avatarGroup"
        :style="{
            fontSize: `${size}px`,
            '--overlap': overlap
        }">
        <component :is="renderVisible"/>

        <span
            v-if="overflowCount > 0"
            :class="$style.avatarGroupItem">
            <FluxAvatar
                :alt="overflowLabel"
                fallback="neutral"
                :fallback-initials="`+${overflowCount}`"/>
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { computed, h, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxAvatar from './FluxAvatar.vue';
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
    const visibleNodes = computed(() => max !== undefined && children.value.length > max ? children.value.slice(0, max) : children.value);
    const overflowCount = computed(() => max !== undefined ? Math.max(0, children.value.length - max) : 0);
    const overflowLabel = computed(() => translate('flux.andNMore', {n: overflowCount.value}));

    const renderVisible = () => visibleNodes.value.map(vnode => h('span', {class: $style.avatarGroupItem}, [vnode]));
</script>
