<script lang="ts">
    import { clsx } from 'clsx';
    import { defineComponent, PropType } from 'vue';
    import { FluxOverlayTransition } from '@/transition';
    import { createDialogRenderer } from '@/util';
    import styles from '@/css/component/Overlay.module.scss';

    export default defineComponent({
        emits: ['close'],
        inheritAttrs: false,
        props: {
            isCloseable: {default: false, type: Boolean},
            size: {default: 'small', type: String as PropType<'small' | 'medium' | 'large'>}
        },
        setup(props, {attrs, emit, slots}) {
            return createDialogRenderer(
                attrs,
                props,
                emit,
                slots,
                clsx(
                    props.size === 'small' && styles.overlaySmall,
                    props.size === 'medium' && styles.overlayMedium,
                    props.size === 'large' && styles.overlayLarge
                ),
                FluxOverlayTransition
            );
        }
    });
</script>
