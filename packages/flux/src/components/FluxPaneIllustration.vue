<template>
    <div class="flux-pane-illustration">
        <div class="flux-pane-illustration-grid"/>
        <div
            class="flux-pane-illustration-graphic"
            :class="{
                'is-controlled': isControlled,
                'is-default': !isControlled
            }">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly isControlled?: boolean;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-pane-illustration {
        position: relative;
        aspect-ratio: 16 / 9;
        background: linear-gradient(to bottom, rgb(var(--gray-2)), transparent);
        border-radius: inherit;
        mask: linear-gradient(to bottom, black, transparent);

        &-graphic {
            position: absolute;
            display: flex;
            inset: -1px;
            align-items: flex-end;
            justify-content: center;

            &.is-default svg {
                max-width: 48%;
                margin-bottom: -6%;
                filter: drop-shadow(0 3px 6px rgb(105 117 134 / .18));
                overflow: visible;

                path {
                    fill: white;
                    stroke: rgb(var(--gray-5));
                    stroke-width: 3px;
                }

                @at-root body.dark-layout & {
                    filter: drop-shadow(0 3px 6px rgb(0 0 0 / .18));

                    path {
                        fill: rgb(var(--gray-0));
                        stroke: rgb(var(--gray-7));
                    }
                }
            }
        }

        &-grid {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(to bottom, transparent calc(100% - 1px), rgb(var(--gray-3)) calc(100% - 1px)), linear-gradient(to right, transparent calc(100% - 1px), rgb(var(--gray-3)) calc(100% - 1px));
            background-position: top left;
            background-size: 30px 30px;
        }

        + .flux-pane-body,
        + .flux-pane-header {
            position: relative;
            margin-top: -60px;
        }
    }
</style>
