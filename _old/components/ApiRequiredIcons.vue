<template>
    <div :class="$style.apiRequiredIcons">
        <FluxPane
            v-for="icon of icons"
            :class="$style.apiRequiredIcon">
            <FluxIcon
                :size="24"
                :variant="icon"/>

            <span>
                {{ icon }}
            </span>
        </FluxPane>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxPane, IconNames } from '@basmilius/flux';

    export interface Props {
        readonly icons: IconNames[];
    }

    defineProps<Props>();
</script>

<style
    lang="scss"
    module>
    .apiRequiredIcon {
        display: flex;
        max-width: 180px;
        padding: 18px;
        aspect-ratio: 3 / 2;
        flex-flow: column;
        justify-content: space-between;
        background: rgb(var(--gray-1));

        .icon {
            color: rgb(var(--primary-7));
        }

        :is(span) {
            color: var(--foreground-prominent);
            font-family: jetbrains-mono, monospace;
            font-size: 12px;
            font-weight: 700;
        }
    }

    .apiRequiredIcons {
        display: grid;
        gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
</style>
