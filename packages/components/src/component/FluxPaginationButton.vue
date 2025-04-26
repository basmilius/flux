<template>
    <FluxButton
        :="{type, disabled, iconLeading, iconTrailing, isFilled, isLoading, isSubmit, label, size, href, rel, target, to}"
        :class="[
            isArrow && $style.paginationButtonArrow,
            isCurrent && $style.paginationButtonCurrent,
            isSpacer && $style.paginationButtonSpacer
        ]"
        :css-class="$style.paginationButton"
        :css-class-icon="$style.paginationButtonIcon"
        :css-class-label="$style.paginationButtonLabel"
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
    import $style from '$flux/css/component/Pagination.module.scss';

    defineEmits<FluxButtonEmits>();

    defineProps<FluxButtonProps & {
        readonly isArrow?: boolean;
        readonly isCurrent?: boolean;
        readonly isSpacer?: boolean;
    }>();

    defineSlots<FluxButtonSlots>();
</script>
