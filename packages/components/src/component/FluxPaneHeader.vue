<template>
    <div :class="$style.paneHeader">
        <slot name="before"/>

        <FluxIcon
            v-if="icon"
            :class="$style.paneHeaderIcon"
            :size="20"
            :name="icon"/>

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
    import type { FluxIconName } from '@flux-ui/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Pane.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly subTitle?: string;
        readonly title?: string;
    }>();

    defineSlots<{
        after(): any;
        before(): any;
    }>();
</script>
