<template>
    <div class="flux-pane-deck">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-pane-deck {
        display: flex;
        flex-flow: column;

        .flux-pane {
            flex-basis: -1;
            flex-grow: 1;
            border-radius: 0;

            &:first-child {
                border-top-left-radius: var(--radius);
                border-top-right-radius: var(--radius);
            }

            &:last-child {
                border-bottom-left-radius: var(--radius);
                border-bottom-right-radius: var(--radius);
            }

            + .flux-pane {
                margin-top: -1px;
            }
        }

        [md] & {
            flex-flow: row;

            .flux-pane {
                border-radius: 0;

                &:first-child {
                    border-top-left-radius: var(--radius);
                    border-bottom-left-radius: var(--radius);
                }

                &:last-child {
                    border-top-right-radius: var(--radius);
                    border-bottom-right-radius: var(--radius);
                }

                + .flux-pane {
                    margin-top: 0;
                    margin-left: -1px;
                }
            }
        }
    }
</style>
