<template>
    <div :class="$style.flowCardSection">
        <span
            v-if="label"
            :class="$style.flowCardSectionLabel">{{ label }}</span>
        <div :class="$style.flowCardSectionBody">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/flow/css/component/FlowCard.module.scss';

    defineProps<{
        readonly label?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
