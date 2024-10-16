<template>
    <div :class="$style.paneHeader">
        <slot name="before"/>

        <FluxIcon
            v-if="icon"
            :class="$style.paneHeaderIcon"
            :size="20"
            :variant="icon"/>

        <div
            v-if="title || subTitle"
            :class="$style.paneHeaderCaption">
            <strong v-if="title">
                {{ title }}
            </strong>

            <span v-if="subTitle">
                {{ subTitle }}
            </span>
        </div>

        <slot name="after"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Pane.module.scss';

    defineProps<{
        readonly icon?: IconName;
        readonly subTitle?: string;
        readonly title?: string;
    }>();

    defineSlots<{
        after(): any;
        before(): any;
    }>();
</script>
