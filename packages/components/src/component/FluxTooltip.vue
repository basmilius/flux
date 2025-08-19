<script lang="ts">
    import { defineComponent, getCurrentInstance, onMounted, onUnmounted, PropType, ref, SlotsType, VNode } from 'vue';
    import { addTooltip, removeTooltip } from '$flux/data';

    export default defineComponent({
        props: {
            content: String as PropType<string | undefined>,
            direction: String as PropType<'horizontal' | 'vertical'>
        },
        slots: Object as SlotsType<{
            content: () => VNode[],
            default: () => VNode[],
        }>,
        setup(props, {slots}) {
            const instance = getCurrentInstance()!;

            const tooltipId = ref<number | null>(null);

            onMounted(() => {
                const elm = instance.proxy!.$el;
                elm.addEventListener('mouseenter', onHover, {passive: true});
                elm.addEventListener('mouseleave', onLeave, {passive: true});
                window.addEventListener('scroll', onLeave, {capture: true});
            });

            onUnmounted(() => {
                const elm = instance.proxy!.$el;
                elm.removeEventListener('mouseenter', onHover);
                elm.removeEventListener('mouseleave', onLeave);
                window.removeEventListener('scroll', onLeave);
                onLeave();
            });

            function onHover(): void {
                onLeave();

                if ((props.content?.trim().length ?? 0) === 0 && !slots.content) {
                    return;
                }

                tooltipId.value = addTooltip({
                    content: props.content,
                    contentSlot: slots.content,
                    direction: props.direction || 'vertical',
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
