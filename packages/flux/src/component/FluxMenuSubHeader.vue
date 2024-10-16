<template>
    <div
        :class="$style.menuSubHeader"
        role="presentation">
        <FluxIcon
            v-if="iconBefore"
            :class="$style.menuSubHeaderIcon"
            :variant="iconBefore"/>

        <span :class="$style.menuSubHeaderLabel">
            {{ label }}
        </span>

        <FluxIcon
            v-if="iconAfter"
            :class="$style.menuSubHeaderIcon"
            :variant="iconAfter"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Menu.module.scss';

    defineProps<{
        readonly iconAfter?: IconName;
        readonly iconBefore?: IconName;
        readonly label: string;
    }>();
</script>
