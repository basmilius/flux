<template>
    <button
        :class="styles.persona"
        type="button"
        @click="$emit('click', $event)">
        <FluxAvatar
            :alt="avatarAlt"
            :fallback="avatarFallback"
            :fallback-icon="avatarFallbackIcon"
            :fallback-initials="avatarFallbackInitials"
            :size="avatarSize"
            :url="avatarUrl"/>

        <template v-if="!isCompact">
            <div :class="styles.personaDetails">
                <strong>{{ name }}</strong>
                <span v-if="title">{{ title }}</span>
            </div>
        </template>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import FluxAvatar from './FluxAvatar.vue';
    import styles from '@/css/component/Avatar.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly avatarAlt?: string;
        readonly avatarFallback?: 'colorized' | 'neutral';
        readonly avatarFallbackIcon?: IconNames;
        readonly avatarFallbackInitials?: string;
        readonly avatarSize?: number;
        readonly avatarUrl?: string;
        readonly isCompact?: boolean;
        readonly name: string;
        readonly title?: string;
    };

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        avatarFallback: 'colorized',
        avatarFallbackIcon: 'user'
    });
</script>
