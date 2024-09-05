<template>
    <Component
        :is="component"
        :class="clsx(
            color === 'gray' && styles.badgeGray,
            color === 'primary' && styles.badgePrimary,
            color === 'danger' && styles.badgeDanger,
            color === 'info' && styles.badgeInfo,
            color === 'success' && styles.badgeSuccess,
            color === 'warning' && styles.badgeWarning
        )"
        @click="onClick">
        <FluxSpinner
            v-if="isLoading"
            :class="styles.badgeIcon"
            :size="16"/>

        <span
            v-else-if="dot"
            :class="styles.badgeDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="styles.badgeIcon"
            :size="16"
            :variant="icon"/>

        <span :class="styles.badgeLabel">
            {{ label }}
        </span>

        <button
            v-if="!isClickable && isDeletable"
            :class="styles.badgeClose"
            type="button"
            @click="onDeleteClick()">
            <FluxIcon variant="xmark"/>
        </button>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, toRefs, unref } from 'vue';
    import type { IconNames } from '@/data';
    import styles from '@/css/component/Badge.module.scss';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';

    export type Emits = {
        click: [MouseEvent];
        delete: [];
    };

    export type Props = {
        readonly color?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly dot?: boolean;
        readonly icon?: IconNames;
        readonly isClickable?: boolean;
        readonly isDeletable?: boolean;
        readonly isLoading?: boolean;
        readonly label: string;
    };

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        color: 'gray'
    });
    const {isClickable} = toRefs(props);

    const component = computed(() => unref(isClickable) ? 'button' : 'div');

    function onClick(evt: MouseEvent): void {
        if (!unref(isClickable)) {
            return;
        }

        emit('click', evt);
    }

    function onDeleteClick(): void {
        emit('delete');
    }
</script>
