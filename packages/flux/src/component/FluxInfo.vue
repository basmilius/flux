<template>
    <div :class="$style.info">
        <FluxIcon
            v-if="icon"
            :class="$style.infoIcon"
            :variant="icon"/>

        <div :class="$style.infoBody">
            <slot/>
        </div>
    </div>
</template>

<script
    setup
    lang="ts">
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Info.module.scss';

    defineProps<{
        readonly icon?: IconName;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
