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
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Menu.module.scss';

    defineProps<{
        readonly iconAfter?: IconName;
        readonly iconBefore?: IconName;
        readonly label: string;
    }>();
</script>
