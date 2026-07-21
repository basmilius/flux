<template>
    <div :class="$style.flowPill">
        <FluxFlowIcon
            :color="color"
            :name="icon"
            :is-loading="isLoading"/>

        <span>{{ label }}</span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import FluxFlowIcon from './FluxFlowIcon.vue';
    import $style from '~flux/flow/css/component/FlowPill.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly icon: FluxIconName;
        readonly label: string;
        readonly isLoading?: boolean;
    }>();
</script>
