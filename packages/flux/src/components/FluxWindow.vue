<script lang="ts">
    import { computed, defineComponent, h, ref, Transition, unref } from 'vue-demi';

    export default defineComponent((props, {slots}) => {
        const isBack = ref(false);
        const view = ref<string>('default');

        const slot = computed(() => {
            const viewName = unref(view);

            if (!(viewName in slots)) {
                throw new Error(`[Flux] A slot with name ${viewName} could not be found.`);
            }

            return slots[viewName];
        });

        const content = computed(() => {
            const elements = unref(slot)?.({
                back,
                navigate
            });

            if (!elements || !elements[0]) {
                return null;
            }

            elements[0].key = unref(view);

            return elements[0];
        });

        function back(to: string = 'default'): void {
            isBack.value = true;
            view.value = to;
        }

        function navigate(to: string): void {
            isBack.value = false;
            view.value = to;
        }

        return () => h(
            Transition,
            {
                mode: 'out-in',
                name: unref(isBack) ? 'flux-window-back' : 'flux-window'
            },
            () => unref(content)
        );
    });
</script>

<style lang="scss">
    .flux-window {
        overflow: auto;
        transition: height 150ms var(--deceleration-curve);

        &-enter-active,
        &-back-enter-active {
            transition: 150ms var(--deceleration-curve);
            transition-property: opacity, transform;
        }

        &-leave-active,
        &-back-leave-active {
            transition: 150ms var(--acceleration-curve);
            transition-property: opacity, transform;
        }

        &-enter-from,
        &-back-leave-to {
            opacity: 0;
            transform: translate3d(15px, 0, 0);
        }

        &-leave-to,
        &-back-enter-from {
            opacity: 0;
            transform: translate3d(-15px, 0, 0);
        }
    }
</style>
