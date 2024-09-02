<template>
    <div :class="styles.paneHeader">
        <slot name="before"/>

        <FluxIcon
            v-if="icon"
            :class="styles.paneHeaderIcon"
            :size="20"
            :variant="icon"/>

        <div
            v-if="title || subTitle"
            :class="styles.paneHeaderCaption">
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
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Pane.module.scss';

    export type Props = {
        readonly icon?: IconNames;
        readonly subTitle?: string;
        readonly title?: string;
    };

    defineProps<Props>();
</script>
