<template>
    <div
        :class="$style.menuSubHeader"
        role="presentation">
        <FluxIcon
            v-if="iconLeading"
            :class="$style.menuSubHeaderIcon"
            :variant="iconLeading"/>

        <span :class="$style.menuSubHeaderLabel">
            {{ label }}
        </span>

        <FluxIcon
            v-if="iconTrailing"
            :class="$style.menuSubHeaderIcon"
            :variant="iconTrailing"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Menu.module.scss';

    defineProps<{
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly label: string;
    }>();
</script>
