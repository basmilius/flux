<template>
    <flux-base-button
        class="flux-menu-item"
        :class="{
            'is-highlighted': isHighlighted,
            'is-indented': isIndented
        }"
        tabindex="0"
        v-bind="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        @click="$emit('click', $event)">
        <template
            v-if="command"
            #after>
            <kbd class="flux-menu-item-command">{{ command }}</kbd>
        </template>
    </flux-base-button>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoutingLocation, IconNames } from '../data';
    import { FluxBaseButton } from '.';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly command?: string;
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isLoading?: boolean;
        readonly label: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        type: 'link'
    });
</script>

<style lang="scss">
    .flux-menu-item {
        --background: transparent;
        --background-hover: rgb(var(--gray-2));
        --background-active: rgb(var(--gray-3));
        --foreground: rgb(var(--gray-7));
        --icon: rgb(var(--primary-7));
        --stroke: transparent;

        gap: 15px;
        justify-content: start;
        border: 0;
        box-shadow: none;
        text-align: left;

        span {
            flex-grow: 1;
            font-weight: 400;
            text-align: left;
        }

        &.is-highlighted {
            --background: rgb(var(--primary-3));
            --foreground: rgb(var(--primary-7));
        }

        &.is-indented {
            margin-left: 35px;
        }

        &-command {
            margin-left: auto;
            padding-left: 21px;
            flex-grow: 0;
            color: rgb(var(--gray-5));
            font: inherit;
            font-size: 13px;
        }
    }
</style>
