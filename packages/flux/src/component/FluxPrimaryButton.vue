<template>
    <FluxButton
        :="{type, disabled, iconLeading, iconTrailing, isFilled, isLoading, isSubmit, label, size, href, rel, target, to}"
        :css-class="$style.primaryButton"
        :css-class-icon="$style.primaryButtonIcon"
        :css-class-label="$style.primaryButtonLabel"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <template
            v-for="slot of SLOTS"
            #[slot]>
            <slot :name="slot"/>
        </template>
    </FluxButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxButtonSlots } from '@flux-ui/types';
    import FluxButton, { SLOTS } from './FluxButton.vue';
    import $style from '$flux/css/component/Button.module.scss';

    defineEmits<FluxButtonEmits>();
    defineProps<FluxButtonProps>();
    defineSlots<FluxButtonSlots>();
</script>
