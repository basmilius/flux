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
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Info.module.scss';

    defineProps<{
        readonly icon?: IconName;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
