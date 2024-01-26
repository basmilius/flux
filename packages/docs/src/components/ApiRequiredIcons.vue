<template>
    <div class="api-required-icons">
        <div
            v-for="icon of icons"
            class="flux-surface flux-pane api-required-icon">
            <FluxIcon
                :size="24"
                :variant="icon"/>

            <span>
                {{ icon }}
            </span>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@fancee/flux';
    import { FluxIcon } from '@fancee/flux';

    export interface Props {
        readonly icons: IconNames[];
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .api-required-icon {
        display: flex;
        max-width: 180px;
        padding: 18px;
        aspect-ratio: 3 / 2;
        flex-flow: column;
        justify-content: space-between;
        background: rgb(var(--gray-1));

        .flux-icon {
            color: rgb(var(--primary-7));
        }

        span {
            color: var(--foreground-prominent);
            font-family: jetbrains-mono, monospace;
            font-size: 12px;
            font-weight: 700;
        }

        &s {
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
    }
</style>
