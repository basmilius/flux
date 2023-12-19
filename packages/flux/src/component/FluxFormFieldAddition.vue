<template>
    <div
        class="flux-form-field-addition"
        :class="{
            'flux-form-field-addition-error': mode === 'error',
            'flux-form-field-addition-hint': mode === 'hint'
        }">
        <FluxIcon
            v-if="icon"
            :size="16"
            class="flux-form-field-addition-icon"
            :variant="icon"/>

        <span v-if="message">
            {{ message }}
        </span>

        <slot/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';

    export interface Props {
        readonly icon?: IconNames;
        readonly message?: string;
        readonly mode?: 'error' | 'hint';
    }

    withDefaults(defineProps<Props>(), {
        mode: 'hint'
    });
</script>

<style
    lang="scss"
    scoped>
    .flux-form-field-addition {
        display: flex;
        gap: 9px;
        font-size: 14px;

        &-icon {
            margin-top: 2px;
            flex-shrink: 0;
        }

        &-error {
            color: rgb(var(--danger-7));
        }

        &-hint {
            color: var(--foreground-secondary);
        }
    }
</style>
