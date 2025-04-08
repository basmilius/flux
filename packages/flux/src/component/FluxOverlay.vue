<script lang="ts">
    import type { FluxSize } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { defineComponent, PropType } from 'vue';
    import { FluxOverlayTransition } from '$flux/transition';
    import { createDialogRenderer } from '$flux/util';
    import $style from '$flux/css/component/Overlay.module.scss';

    export default defineComponent({
        emits: ['close'],
        inheritAttrs: false,
        props: {
            isCloseable: {default: false, type: Boolean},
            size: {default: 'small', type: String as PropType<FluxSize>}
        },
        setup(props, {attrs, emit, slots}) {
            return createDialogRenderer(
                attrs,
                props,
                emit,
                slots,
                clsx(
                    props.size === 'small' && $style.overlaySmall,
                    props.size === 'medium' && $style.overlayMedium,
                    props.size === 'large' && $style.overlayLarge
                ),
                FluxOverlayTransition
            );
        }
    });
</script>
