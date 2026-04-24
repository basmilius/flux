<template>
    <div
        ref="element"
        :class="$style.adaptiveGroup"
        :style="{'--gap': `${gap}px`}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, unrefTemplateElement } from '@flux-ui/internals';
    import { provide, shallowReactive, useTemplateRef, watch, watchEffect } from 'vue';
    import { type FluxAdaptiveGroupChild, FluxAdaptiveGroupInjectionKey } from '$flux/data';
    import $style from '$flux/css/component/AdaptiveSlot.module.scss';

    const {
        gap = 9
    } = defineProps<{
        readonly gap?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const elementRef = useTemplateRef('element');
    const children = shallowReactive(new Map<number, FluxAdaptiveGroupChild>());

    const reflow = animationFrameDebounce(() => {
        const element = unrefTemplateElement(elementRef);

        if (!element) {
            return;
        }

        const available = element.clientWidth;
        const entries = Array.from(children.entries());
        const states = new Map<number, boolean>(entries.map(([uid]) => [uid, true]));

        const sorted = [...entries].sort(([, a], [, b]) => a.priority.value - b.priority.value);

        const currentTotal = () => {
            let total = 0;
            let visible = 0;

            for (const [uid, child] of entries) {
                const width = states.get(uid)
                    ? child.desiredDefaultWidth.value
                    : child.desiredFallbackWidth.value;

                if (width === 0) {
                    continue;
                }

                total += width;
                visible++;
            }

            return total + Math.max(0, visible - 1) * gap;
        };

        while (currentTotal() > available) {
            const victim = sorted.find(([uid]) => states.get(uid));

            if (!victim) {
                break;
            }

            states.set(victim[0], false);
        }

        for (const [uid, child] of entries) {
            child.isDefaultVisible.value = !!states.get(uid);
        }
    });

    watchEffect(() => {
        for (const child of children.values()) {
            // Touch reactive refs so this effect tracks them.
            void child.priority.value;
            void child.desiredDefaultWidth.value;
            void child.desiredFallbackWidth.value;
        }

        reflow();
    });

    provide(FluxAdaptiveGroupInjectionKey, {
        register(uid, child) {
            children.set(uid, child);
        },
        unregister(uid) {
            children.delete(uid);
        }
    });

    watch(elementRef, (element, _, onCleanup) => {
        if (!element) {
            return;
        }

        const observer = new ResizeObserver(reflow);
        observer.observe(element);
        observer.observe(document.documentElement);

        onCleanup(() => {
            observer.disconnect();
        });
    }, {immediate: true});
</script>
