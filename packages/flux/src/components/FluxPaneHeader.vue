<template>
    <div :class="styles.paneHeader">
        <div
            v-if="icon"
            :class="title && subTitle ? styles.paneHeaderIconExtended : styles.paneHeaderIcon">
            <FluxIcon
                :size="20"
                :variant="icon"/>
        </div>

        <div
            v-if="title || subTitle"
            :class="styles.paneHeaderCaption">
            <strong v-if="title">{{ title }}</strong>
            <span v-if="subTitle">{{ subTitle }}</span>
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import styles from '@/css/components/Pane.module.scss';
    import FluxIcon from './FluxIcon.vue';

    export interface Props {
        readonly icon?: IconNames;
        readonly subTitle?: string;
        readonly title?: string;
    }

    defineProps<Props>();
</script>
