<template>
    <div
        data-flow-anchor
        :class="$style.flowTerminal"
        :data-color="color">
        <FluxIcon
            v-if="icon"
            :name="icon"
            :size="15"/>

        <span>{{ label }}</span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxIcon } from '@flux-ui/components';
    import $style from '~flux/flow/css/component/FlowTerminal.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly label: string;
    }>();
</script>
