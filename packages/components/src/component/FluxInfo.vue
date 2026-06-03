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
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import type { VNode } from 'vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Info.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
