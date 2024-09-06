<template>
    <BaseButton
        :="{type, disabled, iconBefore: icon, iconAfter: 'arrow-right-long', label, href, rel, target, to}"
        :css-class="styles.linkButton"
        :css-class-icon="styles.linkButtonIcon"
        :css-class-label="styles.linkButtonLabel"
        @click="emit('click', $event)"
        @mouseenter="emit('mouseenter', $event)"
        @mouseleave="emit('mouseleave', $event)">
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
    import type { ButtonEmits, ButtonProps, ButtonSlots, IconName } from '@/types';
    import BaseButton, { SLOTS } from './primitive/BaseButton.vue';
    import styles from '@/css/component/Button.module.scss';

    const emit = defineEmits<ButtonEmits>();

    const {
        type = 'button'
    } = defineProps<ButtonProps & {
        readonly icon?: IconName;
        readonly label?: string;
    }>();

    defineSlots<ButtonSlots>();
</script>
