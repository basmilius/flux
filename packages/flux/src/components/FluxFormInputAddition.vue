<template>
    <div class="flux-form-input flux-form-input-addition">
        <flux-icon :variant="icon"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxIcon } from '.';

    interface Props {
        readonly icon: IconNames;
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
    }
</style>
