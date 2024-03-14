<script lang="ts">
    import { defineComponent, getCurrentInstance, onMounted, onUnmounted, PropType, ref } from 'vue';
    import { addTooltip, removeTooltip } from '@/data';

    export default defineComponent({
        props: {
            axis: String as PropType<'horizontal' | 'vertical'>,
            content: String
        },
        setup(props, {slots}) {
            const instance = getCurrentInstance()!;

            const tooltipId = ref<number | null>(null);

            onMounted(() => {
                const elm = instance.proxy!.$el;
                elm.addEventListener('mouseenter', onHover, {passive: true});
                elm.addEventListener('mouseleave', onLeave, {passive: true});
            });

            onUnmounted(() => {
                const elm = instance.proxy!.$el;
                elm.removeEventListener('mouseenter', onHover);
                elm.removeEventListener('mouseleave', onLeave);
                onLeave();
            });

            function onHover(): void {
                if ((props.content?.trim().length ?? 0) === 0 && !slots.content) {
                    return;
                }

                tooltipId.value = addTooltip({
                    axis: props.axis || 'vertical',
                    content: props.content,
                    contentSlot: slots.content,
                    origin: instance.proxy?.$el
                });
            }

            function onLeave(): void {
                if (tooltipId.value) {
                    removeTooltip(tooltipId.value);
                }
            }

            return () => (slots.default?.() ?? [])[0] ?? null;
        }
    });
</script>
