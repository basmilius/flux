<template>
    <FluxSpinner
        v-if="isLoading"
        data-flow-anchor
        :class="$style.flowIconSpinner"
        :data-color="color"/>

    <FluxBoxedIcon
        v-else
        data-flow-anchor
        rounded
        :color="color"
        :name="name"
        :size="30"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBoxedIcon, FluxSpinner } from '@flux-ui/components';
    import $style from '~flux/flow/css/component/FlowIcon.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly name: FluxIconName;
        readonly isLoading?: boolean;
    }>();
</script>
