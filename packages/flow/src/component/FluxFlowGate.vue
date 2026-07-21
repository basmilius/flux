<template>
    <div
        data-flow-anchor
        :class="$style.flowGate"
        :data-color="color">
        <span>{{ label }}</span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { computed } from 'vue';
    import $style from '~flux/flow/css/component/FlowGate.module.scss';

    const props = defineProps<{
        readonly color?: FluxColor;
        readonly type: 'and' | 'or' | 'xor';
    }>();

    const label = computed(() => props.type.toUpperCase());
</script>
