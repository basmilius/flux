<template>
    <BaseButton
        :="{type, disabled, iconBefore: icon, iconAfter: 'arrow-right-long', label, href, rel, target, to}"
        :css-class="styles.linkButton"
        :css-class-icon="styles.linkButtonIcon"
        :css-class-label="styles.linkButtonLabel"
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
    import type { IconNames } from '@/data';
    import BaseButton, { Emits, Props as BaseProps } from './primitive/BaseButton.vue';
    import styles from '@/css/component/Button.module.scss';

    export type Props = Omit<BaseProps, 'cssClass' | 'cssClassIcon' | 'cssClassLabel' | 'iconBefore' | 'isLoading' | 'isSubmit'> & {
        readonly icon?: IconNames;
        readonly label?: string;
    };

    defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        type: 'button'
    });

    const slots = useSlots();
</script>
