<script lang="ts">
    import { defineComponent, PropType } from 'vue-demi';
    import { createDialogRenderer } from '@/helpers';
    import { FluxOverlayTransition } from '@/transition';

    export default defineComponent({
        props: {
            isCloseable: {default: false, type: Boolean},
            size: {default: 'small', type: String as PropType<'small' | 'medium' | 'large'>}
        },
        setup(props, {emit, slots}) {
            return createDialogRenderer(
                props,
                emit,
                slots,
                () => `flux-overlay is-${props.size}`,
                FluxOverlayTransition
            );
        }
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-overlay {
        position: fixed;
        display: flex;
        inset: 0;
        height: 100dvh;
        width: 100svw;
        background: rgb(var(--gray-7) / .25);
        backdrop-filter: blur(5px) saturate(180%);
        z-index: 10000;

        > .flux-pane {
            display: flex;
            margin: auto;
            max-height: min(840px, calc(100dvh - 180px));
            width: calc(100dvw - 90px);
            flex-flow: column;
            border-color: rgb(var(--gray-11) / .075);
            box-shadow: var(--shadow-2xl);
            overflow: auto;
        }

        .flux-pane-footer {
            position: sticky;
            bottom: 0;
            margin-top: auto;
        }

        &.is-small .flux-pane {
            max-width: 420px;
        }

        &.is-medium .flux-pane {
            max-width: 540px;
        }

        &.is-large .flux-pane {
            max-width: 720px;
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
