<template>
    <div class="flux-form-input flux-form-input-addition">
        <flux-icon :variant="icon"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Props {
        readonly icon: IconNames;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    @layer component {
        .flux-form-input-addition {
            display: flex;
            width: unset;
            align-items: center;
            flex-grow: 0;
            justify-content: center;
        }
    }
</style>
