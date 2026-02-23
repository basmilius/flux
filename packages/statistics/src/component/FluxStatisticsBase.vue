<template>
    <FluxPane :class="isSmall ? $style.statisticsBaseSmall : $style.statisticsBase">
        <div
            v-if="title"
            :class="$style.statisticsBaseHeader">
            <span :class="$style.statisticsBaseHeaderTitle">
                {{ title }}
            </span>

            <FluxIcon
                v-if="icon"
                :class="$style.statisticsBaseHeaderIcon"
                :name="icon"/>
        </div>

        <div
            v-if="slots.default"
            :class="$style.statisticsBaseContent">
            <slot/>
        </div>

        <slot name="content"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxPane } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import $style from '$fluxStatistics/css/Base.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly isSmall?: boolean;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        content?(): any;
        default?(): any;
    }>();
</script>
