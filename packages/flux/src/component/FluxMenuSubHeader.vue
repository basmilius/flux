<template>
    <div
        :class="styles.menuSubHeader"
        role="presentation">
        <FluxIcon
            v-if="iconBefore"
            :class="styles.menuSubHeaderIcon"
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
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Menu.module.scss';

    export type Props = {
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly label: string;
    };

    defineProps<Props>();
</script>
