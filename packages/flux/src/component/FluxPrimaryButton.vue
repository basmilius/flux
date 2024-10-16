<template>
    <FluxButton
        :="{type, disabled, iconAfter, iconBefore, isLoading, isSubmit, label, size, href, rel, target, to}"
        :css-class="styles.primaryButton"
        :css-class-icon="styles.primaryButtonIcon"
        :css-class-label="styles.primaryButtonLabel"
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
    import type { ButtonEmits, ButtonProps, ButtonSlots } from '@/types';
    import FluxButton, { SLOTS } from './FluxButton.vue';
    import styles from '@/css/component/Button.module.scss';

    defineEmits<ButtonEmits>();
    defineProps<ButtonProps>();
    defineSlots<ButtonSlots>();
</script>
