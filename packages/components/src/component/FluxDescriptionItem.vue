<template>
    <div
        :class="clsx(
            $style.descriptionItem,
            isStacked && $style.isStacked
        )">
        <dt :class="$style.descriptionItemTerm">
            <FluxIcon
                v-if="icon"
                :class="$style.descriptionItemIcon"
                :name="icon"/>

            <span :class="$style.descriptionItemLabel">
                <slot name="label">{{ label }}</slot>
            </span>
        </dt>

        <dd :class="$style.descriptionItemValue">
            <slot/>
        </dd>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/DescriptionList.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly isStacked?: boolean;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): VNode[];
        label(): VNode[];
    }>();
</script>
