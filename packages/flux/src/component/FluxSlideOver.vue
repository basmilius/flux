<script lang="ts">
    import { defineComponent } from 'vue';
    import { FluxSlideOverTransition } from '@/transition';
    import { createDialogRenderer } from '@/util';
    import $style from '@/css/component/Overlay.module.scss';

    export default defineComponent({
        emits: ['close'],
        inheritAttrs: false,
        props: {
            isCloseable: {default: false, type: Boolean},
            viewKey: {default: null, type: String}
        },
        setup(props, {attrs, emit, slots}) {
            return createDialogRenderer(
                attrs,
                props,
                emit,
                slots,
                $style.slideOver,
                FluxSlideOverTransition
            );
        }
    });
</script>
