<template>
    <div
        :class="clsx(
            styles.placeholder,
            isButton && styles.isButton,
            variant === 'extended' && styles.isExtended,
            variant === 'simple' && styles.isSimple,
            variant === 'small' && styles.isSmall
        )"
        role="presentation"
        @click="onClick">
        <FluxIcon
            v-if="icon"
            :class="styles.placeholderIcon"
            :variant="icon"/>

        <div :class="styles.placeholderCaption">
            <strong v-if="title">
                {{ title }}
            </strong>

            <p v-if="message">
                {{ message }}
            </p>
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Placeholder.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly icon?: IconNames;
        readonly isButton?: boolean;
        readonly message?: string;
        readonly title?: string;
        readonly variant?: 'extended' | 'simple' | 'small';
    };

    const emit = defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        variant: 'extended'
    });

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
