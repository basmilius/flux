<script lang="ts">
    import { defineComponent, provide, toRefs } from 'vue-demi';
    import { FluxSkeletonsInjectionKey } from '@/data';

    export default defineComponent({
        props: {
            isEnabled: {required: true, type: Boolean}
        },
        setup(props, {slots}) {
            const {isEnabled} = toRefs(props);

            provide(FluxSkeletonsInjectionKey, {
                isEnabled
            });

            return () => (slots.default?.() ?? [])[0] ?? null;
        }
    });
</script>
