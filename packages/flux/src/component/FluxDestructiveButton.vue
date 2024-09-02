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
            v-for="(_, slot) of slots"
            #[slot]="scope">
            <slot
                :name="slot"
                v-bind="scope"/>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import BaseButton, { Emits, Props } from './primitive/BaseButton.vue';
    import styles from '@/css/component/Button.module.scss';

    defineEmits<Emits>();

    withDefaults(defineProps<Omit<Props, 'cssClass' | 'cssClassIcon' | 'cssClassLabel'>>(), {
        type: 'button'
    });

    const slots = useSlots();
</script>
