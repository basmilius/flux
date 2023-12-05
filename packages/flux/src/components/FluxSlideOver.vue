<script lang="ts">
    import { defineComponent } from 'vue';
    import { createDialogRenderer } from '@/helpers';
    import { FluxSlideOverTransition } from '@/transition';

    export default defineComponent({
        emits: ['close'],
        props: {
            isCloseable: {default: false, type: Boolean}
        },
        setup(props, {emit, slots}) {
            return createDialogRenderer(props, emit, slots, 'flux-overlay flux-slide-over', FluxSlideOverTransition);
        }
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-slide-over {
        justify-content: flex-end;
        overflow: hidden;

        > .flux-pane {
            margin: unset;
            max-height: 100%;
            width: min(100dvw, 720px);
            border-top: 0;
            border-right: 0;
            border-bottom: 0;
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
