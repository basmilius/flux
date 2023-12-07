<template>
    <div :class="styles.menuSubHeader">
        <FluxIcon
            v-if="iconBefore"
            :class="styles.menuSubHeaderIcon"
            :size="16"
            :variant="iconBefore"/>

        <span :class="styles.menuSubHeaderLabel">
            {{ label }}
        </span>

        <FluxIcon
            v-if="iconAfter"
            :class="styles.menuSubHeaderIcon"
            :variant="iconAfter"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import styles from '@/css/components/Menu.module.scss';
    import FluxIcon from './FluxIcon.vue';

    export interface Props {
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly label: string;
    }

    defineProps<Props>();
</script>
