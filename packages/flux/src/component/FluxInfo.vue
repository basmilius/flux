<template>
    <div :class="styles.info">
        <FluxIcon
            v-if="icon"
            :class="styles.infoIcon"
            :variant="icon"/>

        <div :class="styles.infoBody">
            <slot/>
        </div>
    </div>
</template>

<script
    setup
    lang="ts">
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Info.module.scss';

    export type Props = {
        readonly icon?: IconNames;
    };

    defineProps<Props>();
</script>
