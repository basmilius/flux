<template>
    <div :class="$style.info">
        <FluxIcon
            v-if="icon"
            :class="$style.infoIcon"
            :name="icon"/>

        <div :class="$style.infoBody">
            <slot/>
        </div>
    </div>
</template>

<script
    setup
    lang="ts">
    import type { FluxIconName } from '@flux-ui/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Info.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
