<template>
    <button
        class="flux-remove"
        :class="{'is-hidden': isHidden}"
        @click="$emit('click', $event)">
        <flux-icon
            :size="16"
            :variant="icon"/>
    </button>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly icon?: IconNames;
        readonly isHidden?: boolean;
    }

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        icon: 'xmark'
    });
</script>

<style lang="scss">
    .flux-remove {
        position: absolute;
        display: flex;
        top: -9px;
        right: -9px;
        height: 27px;
        width: 27px;
        align-items: center;
        justify-content: center;
        background: var(--gray-11);
        border: 3px solid var(--gray-0);
        border-radius: 99px;
        color: var(--gray-0);
        transition: 300ms var(--swift-out);
        transition-property: opacity, scale;

        &.is-hidden {
            opacity: 0;
            pointer-events: none;
            scale: .5;
        }
    }
</style>
