<template>
    <FluxButton
        :="{type, disabled, iconLeading: icon, iconTrailing: 'arrow-right-long', isFilled, label, href, rel, target, to}"
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
    import type { FluxButtonEmits, FluxButtonProps, FluxButtonSlots, FluxIconName } from '@/types';
    import FluxButton, { SLOTS } from './FluxButton.vue';
    import $style from '@/css/component/Button.module.scss';

    const emit = defineEmits<FluxButtonEmits>();

    const {
        type = 'button'
    } = defineProps<FluxButtonProps & {
        readonly icon?: FluxIconName;
        readonly label?: string;
    }>();

    defineSlots<FluxButtonSlots>();
</script>
