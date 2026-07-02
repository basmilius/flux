import { defineComponent } from 'vue';

// Renders only its default slot. Used as the dynamic tag of an optional
// wrapper, so the wrapper element can be omitted without duplicating the
// markup inside it. Attrs bound to the wrapper are intentionally dropped;
// without inheritAttrs: false Vue warns about them on the fragment root.
export const PassThrough = defineComponent({
    inheritAttrs: false,

    setup(_, {slots}) {
        return () => slots.default?.() ?? null;
    }
});
