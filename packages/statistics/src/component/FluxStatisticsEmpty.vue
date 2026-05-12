<template>
    <div :class="$style.statisticsEmpty">
        <FluxIcon
            v-if="icon"
            :class="$style.statisticsEmptyIcon"
            :name="icon"/>

        <div
            v-if="title"
            :class="$style.statisticsEmptyTitle">
            {{ title }}
        </div>

        <div
            v-if="description"
            :class="$style.statisticsEmptyDescription">
            {{ description }}
        </div>

        <div
            v-if="slots.default"
            :class="$style.statisticsEmptyActions">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import $style from '~flux/statistics/css/Empty.module.scss';

    defineProps<{
        readonly description?: string;
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        default?(): any;
    }>();
</script>
