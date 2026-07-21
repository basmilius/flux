<template>
    <div
        data-flow-anchor
        :class="$style.flowNote"
        :data-color="color">
        <strong v-if="title">{{ title }}</strong>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import $style from '~flux/flow/css/component/FlowNote.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly title?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
