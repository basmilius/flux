<template>
    <div class="flux-info">
        <flux-icon
            v-if="icon"
            class="flux-info-icon"
            :variant="icon"/>

        <div class="flux-info-body">
            <slot/>
        </div>
    </div>
</template>
<script
    setup
    lang="ts">
    import type { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Props {
        readonly icon?: IconNames;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-info {
        display: flex;
        gap: 15px;

        &-body {
            align-items: center;
            line-height: 1.5;
        }

        > .flux-icon {
            margin-top: 1px;
            flex-shrink: 0;
            color: rgb(var(--primary-7));
        }
    }
</style>
