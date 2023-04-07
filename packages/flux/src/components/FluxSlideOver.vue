<script lang="ts">
    import { defineComponent, useSlots } from 'vue-demi';
    import { createDialogRenderer } from '../helpers';
    import { FluxSlideOverTransition } from '../transition';

    export default defineComponent({
        setup() {
            const slots = useSlots();
            return createDialogRenderer(slots, 'flux-overlay flux-slide-over', FluxSlideOverTransition);
        }
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-slide-over {
        justify-content: flex-end;
        overflow: hidden;

        > .flux-pane {
            margin: unset;
            max-height: 100%;
            width: min(100dvw, 720px);
            border-radius: 0;
            overflow: auto;

            > .flux-pane-footer,
            > .flux-pane-header {
                position: sticky;
                z-index: 100;
            }

            > .flux-pane-header {
                top: 0;
                padding-bottom: 21px;
                background: inherit;
                border-bottom: 1px solid rgb(var(--gray-3));
                box-shadow: var(--shadow-sm);

                &:has(+ .flux-tabs) {
                    padding-bottom: 0;
                    border-bottom: 0;
                    box-shadow: none;
                }
            }

            > .flux-pane-footer {
                bottom: 0;
            }
        }
    }
</style>
