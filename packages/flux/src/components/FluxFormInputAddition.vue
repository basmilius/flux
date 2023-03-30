<template>
    <div class="flux-form-input flux-form-input-addition">
        <flux-icon
            v-if="icon"
            :variant="icon"/>

        <span v-if="text">{{ text }}</span>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Props {
        readonly icon?: IconNames;
        readonly text?: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-form-input-addition {
        display: flex;
        width: unset;
        align-items: center;
        flex-grow: 0;
        justify-content: center;
        color: var(--foreground-secondary);
        pointer-events: none;
    }
</style>
