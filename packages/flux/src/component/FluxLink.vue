<template>
    <FluxButton
        :="{type, disabled, iconBefore: icon, iconAfter: 'arrow-right-long', label, href, rel, target, to}"
        :css-class="$style.linkButton"
        :css-class-icon="$style.linkButtonIcon"
        :css-class-label="$style.linkButtonLabel"
        @click="emit('click', $event)"
        @mouseenter="emit('mouseenter', $event)"
        @mouseleave="emit('mouseleave', $event)">
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
    import type { ButtonEmits, ButtonProps, ButtonSlots, IconName } from '@/types';
    import FluxButton, { SLOTS } from './FluxButton.vue';
    import $style from '@/css/component/Button.module.scss';

    const emit = defineEmits<ButtonEmits>();

    const {
        type = 'button'
    } = defineProps<ButtonProps & {
        readonly icon?: IconName;
        readonly label?: string;
    }>();

    defineSlots<ButtonSlots>();
</script>
