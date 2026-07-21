<template>
    <FluxPane :class="$style.trackerCard">
        <div :class="$style.trackerCardHeader">
            <slot name="start"/>

            <div :class="$style.trackerCardHeaderText">
                <span :class="$style.trackerCardTitle">
                    {{ title }}
                </span>

                <span
                    v-if="subtitle"
                    :class="$style.trackerCardSubtitle">
                    {{ subtitle }}
                </span>
            </div>

            <slot name="end">
                <FluxBoxedIcon
                    v-if="icon"
                    :color="color"
                    :name="icon"/>
            </slot>
        </div>

        <div
            :class="labels === 'top' ? $style.trackerCardLabelsTop : $style.trackerCardSegments"
            role="list">
            <slot/>
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxPane } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import type { VNode } from 'vue';
    import $style from '~flux/statistics/css/TrackerCard.module.scss';

    const {
        color = 'primary',
        labels = 'bottom'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly labels?: 'bottom' | 'top';
        readonly subtitle?: string;
        readonly title: string;
    }>();

    defineSlots<{
        default?(): VNode[];
        end?(): VNode[];
        start?(): VNode[];
    }>();
</script>
