<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            index: Number
        },
        setup(props, {slots}) {
            return () => {
                const items = slots.default!();
                return items[props.index!];
            };
        }
    });
</script>
