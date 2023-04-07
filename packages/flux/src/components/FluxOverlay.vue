<script lang="ts">
    import { defineComponent, useSlots } from 'vue-demi';
    import { createDialogRenderer } from '../helpers';
    import { FluxOverlayTransition } from '../transition';

    export default defineComponent({
        setup() {
            const slots = useSlots();
            return createDialogRenderer(slots, 'flux-overlay', FluxOverlayTransition);
        }
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-overlay {
        position: fixed;
        display: flex;
        inset: 0;
        height: 100dvh;
        width: 100svw;
        background: rgb(var(--gray-7) / .25);
        backdrop-filter: blur(5px) saturate(180%);
        overflow: auto;
        z-index: 10000;

        > .flux-pane {
            margin: auto;
            border-color: rgb(var(--gray-11) / .075);
            box-shadow: var(--shadow-2xl);
        }

        .flux-pane {
            display: flex;
            max-height: min(720px, calc(100dvh - 180px));
            flex-flow: column;

            &-footer {
                position: sticky;
                bottom: 0;
                margin-top: auto;
            }
        }
    }

    @include flux.dark-mode {
        .flux-overlay {
            background: rgb(0 0 0 / .5);

            > .flux-pane {
                border-color: rgb(var(--gray-11) / .3);
            }
        }
    }
</style>
