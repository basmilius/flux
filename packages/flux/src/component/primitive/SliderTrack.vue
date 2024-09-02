<template>
    <div :class="styles.sliderTrack">
        <div
            :class="styles.sliderTrackValue"
            :style="{
                left: `${percentageLower * 100}%`,
                width: `${(percentageUpper - percentageLower) * 100}%`
            }"/>
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly percentageLower: number;
        readonly percentageUpper: number;
    };

    defineProps<Props>();
</script>
