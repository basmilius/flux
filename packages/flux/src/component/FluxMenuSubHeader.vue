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
    import type { FluxIconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Menu.module.scss';

    defineProps<{
        readonly iconAfter?: FluxIconName;
        readonly iconBefore?: FluxIconName;
        readonly label: string;
    }>();
</script>
