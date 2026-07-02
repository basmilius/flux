import { defineComponent } from 'vue';

// Renders only its default slot. Used as the dynamic tag of an optional
// wrapper, so the wrapper element can be omitted without duplicating the
// markup inside it.
export const PassThrough = defineComponent({
    setup(_, {slots}) {
        return () => slots.default?.() ?? null;
    }
});
