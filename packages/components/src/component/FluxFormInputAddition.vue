<template>
    <div :class="$style.formInputAddition">
        <FluxIcon
            v-if="icon"
            :name="icon"
            :size="18"/>

        <span v-if="label">
            {{ label }}
        </span>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Form.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
