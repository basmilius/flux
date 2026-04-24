<template>
    <div
        ref="element"
        :class="$style.adaptiveSlot"
        :style="group ? 'flex-shrink: 0' : undefined">
        <slot v-if="isDefaultVisible"/>
        <slot
            v-else
            name="fallback"/>
    </div>

    <div
        ref="defaultMeasurer"
        :class="$style.adaptiveSlotMeasurer"
        aria-hidden="true">
        <slot/>
    </div>

    <div
        ref="fallbackMeasurer"
        :class="$style.adaptiveSlotMeasurer"
        aria-hidden="true">
        <slot name="fallback"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, unrefTemplateElement } from '@flux-ui/internals';
    import { getCurrentInstance, onMounted, onUnmounted, ref, toRef, useTemplateRef, watch } from 'vue';
    import { useAdaptiveGroupInjection } from '$flux/composable';
    import $style from '$flux/css/component/AdaptiveSlot.module.scss';

    const props = withDefaults(defineProps<{
        readonly priority?: number;
    }>(), {
        priority: 1
    });

    defineSlots<{
        default(): any;
        fallback?(): any;
    }>();

    const group = useAdaptiveGroupInjection();
    const instance = getCurrentInstance()!;

    const elementRef = useTemplateRef('element');
    const defaultMeasurerRef = useTemplateRef('defaultMeasurer');
    const fallbackMeasurerRef = useTemplateRef('fallbackMeasurer');

    const isDefaultVisible = ref(true);
    const desiredDefaultWidth = ref(0);
    const desiredFallbackWidth = ref(0);

    const priorityRef = toRef(props, 'priority');

    // Keep both desired widths in sync with the hidden measurers.
    watch([defaultMeasurerRef, fallbackMeasurerRef], ([def, fb], _, onCleanup) => {
        if (!def) {
            return;
        }

        const update = () => {
            desiredDefaultWidth.value = def.offsetWidth;
            desiredFallbackWidth.value = fb?.offsetWidth ?? 0;
        };

        const observer = new ResizeObserver(update);
        observer.observe(def);

        if (fb) {
            observer.observe(fb);
        }

        observer.observe(document.documentElement);

        update();

        onCleanup(() => {
            observer.disconnect();
        });
    }, {immediate: true});

    if (group) {
        onMounted(() => {
            group.register(instance.uid, {
                priority: priorityRef,
                desiredDefaultWidth,
                desiredFallbackWidth,
                isDefaultVisible
            });
        });

        onUnmounted(() => {
            group.unregister(instance.uid);
        });
    } else {
        // Standalone: self-measurement with parent-observer hysteresis.
        let lastFailedParentWidth = -1;

        const reflow = animationFrameDebounce(() => {
            const element = unrefTemplateElement(elementRef);

            if (!element || !isDefaultVisible.value) {
                return;
            }

            const desired = desiredDefaultWidth.value;
            const available = element.clientWidth;

            if (desired > available) {
                lastFailedParentWidth = element.parentElement?.clientWidth ?? -1;
                isDefaultVisible.value = false;
            } else {
                lastFailedParentWidth = -1;
            }
        });

        watch(elementRef, (element, _, onCleanup) => {
            if (!element) {
                return;
            }

            const parent = element.parentElement;

            const observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    if (entry.target === parent && !isDefaultVisible.value) {
                        if (parent.clientWidth > lastFailedParentWidth) {
                            isDefaultVisible.value = true;
                        }
                    }
                }

                reflow();
            });

            observer.observe(element);

            if (parent) {
                observer.observe(parent);
            }

            observer.observe(document.documentElement);

            onCleanup(() => {
                observer.disconnect();
            });
        }, {immediate: true});

        // Default content size changed: forget failure history and retry.
        watch(desiredDefaultWidth, () => {
            lastFailedParentWidth = -1;
            isDefaultVisible.value = true;
        });
    }
</script>
