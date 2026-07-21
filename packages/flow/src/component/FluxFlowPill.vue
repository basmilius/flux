<template>
    <div :class="$style.flowPill">
        <FluxBoxedIcon
            rounded
            :color="color"
            :name="icon"
            :size="30"/>

        <span>{{ label }}</span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBoxedIcon } from '@flux-ui/components';
    import $style from '~flux/flow/css/component/FlowPill.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly icon: FluxIconName;
        readonly label: string;
    }>();
</script>
