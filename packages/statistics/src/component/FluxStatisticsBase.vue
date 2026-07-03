<template>
    <FluxPane :class="isSmall ? $style.statisticsBaseSmall : $style.statisticsBase">
        <div
            v-if="title || icon || slots.info"
            :class="$style.statisticsBaseHeader">
            <span
                v-if="title"
                :class="$style.statisticsBaseHeaderTitle">
                {{ title }}
            </span>

            <FluxTooltip
                v-if="slots.info"
                direction="vertical">
                <template #content>
                    <slot name="info"/>
                </template>

                <FluxIcon
                    :class="$style.statisticsBaseHeaderInfo"
                    name="circle-info"/>
            </FluxTooltip>

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
    import { FluxIcon, FluxPane, FluxTooltip } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import $style from '~flux/statistics/css/Base.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly isSmall?: boolean;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        content?(): any;
        default?(): any;
        info?(): any;
    }>();
</script>
