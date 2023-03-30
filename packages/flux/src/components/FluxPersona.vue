<template>
    <button
        class="flux-persona"
        @click="$emit('click', $event)">
        <flux-avatar
            :alt="avatarAlt"
            :fallback="avatarFallback"
            :fallback-icon="avatarFallbackIcon"
            :fallback-initials="avatarFallbackInitials"
            :size="avatarSize"
            :url="avatarUrl"/>

        <template v-if="!isCompact">
            <div class="flux-persona-details">
                <strong>{{ name }}</strong>
                <span>{{ title }}</span>
            </div>
        </template>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { FluxAvatar } from '.';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly avatarAlt?: string;
        readonly avatarFallback: 'colorized' | 'neutral';
        readonly avatarFallbackIcon: IconNames;
        readonly avatarFallbackInitials?: string;
        readonly avatarSize?: number;
        readonly avatarUrl?: string;
        readonly isCompact?: boolean;
        readonly name: string;
        readonly title: string;
    }

    defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        avatarFallback: 'colorized',
        avatarFallbackIcon: 'user'
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-persona {
        display: flex;
        padding: 6px;
        align-items: center;
        gap: 12px;
        background: unset;
        border: 0;
        border-radius: var(--radius);
        cursor: pointer;
        text-align: left;
        transition: 180ms var(--swift-out);
        transition-property: background, flux.focus-ring-transition-properties();

        @include flux.focus-ring(2px);

        &:hover {
            background: rgb(var(--gray-3));
        }

        &-details {
            display: flex;
            margin-right: 9px;
            flex-flow: column;
            gap: 3px;
            line-height: 1.2;

            strong {
                color: var(--foreground-prominent);
            }

            span {
                color: var(--foreground);
                font-size: 14px;
            }
        }
    }
</style>
