<template>
    <div :class="$style.descriptionList">
        <div
            v-if="title || slots.header"
            :class="$style.descriptionListHeader">
            <slot name="header">{{ title }}</slot>
        </div>

        <dl
            :class="clsx(
                $style.descriptionListItems,
                direction === 'horizontal' && $style.isHorizontal
            )">
            <slot/>
        </dl>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/DescriptionList.module.scss';

    const {
        direction = 'vertical'
    } = defineProps<{
        readonly direction?: 'horizontal' | 'vertical';
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        header(): VNode[];
    }>();
</script>
