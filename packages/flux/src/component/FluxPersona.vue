<template>
    <button
        :class="$style.persona"
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
            <div :class="$style.personaDetails">
                <strong>{{ name }}</strong>
                <span v-if="title">{{ title }}</span>
            </div>
        </template>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@/types';
    import FluxAvatar from './FluxAvatar.vue';
    import $style from '@/css/component/Avatar.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        avatarFallback = 'colorized',
        avatarFallbackIcon = 'user'
    } = defineProps<{
        readonly avatarAlt?: string;
        readonly avatarFallback?: 'colorized' | 'neutral';
        readonly avatarFallbackIcon?: FluxIconName;
        readonly avatarFallbackInitials?: string;
        readonly avatarSize?: number;
        readonly avatarUrl?: string;
        readonly isCompact?: boolean;
        readonly name: string;
        readonly title?: string;
    }>();
</script>
