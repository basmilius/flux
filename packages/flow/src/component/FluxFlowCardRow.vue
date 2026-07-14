<template>
    <div :class="$style.flowCardRow">
        <span
            v-if="label"
            :class="$style.flowCardRowLabel">{{ label }}</span>
        <span :class="clsx($style.flowCardRowSpacer, leader && $style.flowCardRowLeader)"/>
        <span :class="$style.flowCardRowValue">
            <slot/>
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import $style from '~flux/flow/css/component/FlowCard.module.scss';

    defineProps<{
        readonly label?: string;
        readonly leader?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
