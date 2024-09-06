<template>
    <BaseButton
        :="{type, disabled, iconAfter, iconBefore, isLoading, isSubmit, label, size, href, rel, target, to}"
        :css-class="styles.destructiveButton"
        :css-class-icon="styles.destructiveButtonIcon"
        :css-class-label="styles.destructiveButtonLabel"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <template
            v-for="slot of SLOTS"
            #[slot]>
            <slot :name="slot"/>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import type { ButtonEmits, ButtonProps, ButtonSlots } from '@/types';
    import BaseButton, { SLOTS } from './primitive/BaseButton.vue';
    import styles from '@/css/component/Button.module.scss';

    defineEmits<ButtonEmits>();
    defineProps<ButtonProps>();
    defineSlots<ButtonSlots>();
</script>
