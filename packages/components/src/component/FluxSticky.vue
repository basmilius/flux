<template>
    <div
        v-if="position === 'top'"
        ref="sentinel"
        :class="$style.stickySentinel"
        aria-hidden="true"/>

    <Component
        :is="tag ?? 'div'"
        :class="clsx(
            position === 'top' ? $style.stickyTop : $style.stickyBottom,
            hasShadowOnStick && $style.hasShadow
        )"
        :data-stuck="isStuck"
        :style="{'--offset': `${offset}px`}">
        <slot v-bind="{isStuck}"/>
    </Component>

    <div
        v-if="position === 'bottom'"
        ref="sentinel"
        :class="$style.stickySentinel"
        aria-hidden="true"/>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { ref, useTemplateRef, type VNode, watch } from 'vue';
    import $style from '~flux/components/css/component/Sticky.module.scss';

    const {
        offset = 0,
        position = 'top'
    } = defineProps<{
        readonly hasShadowOnStick?: boolean;
        readonly offset?: number;
        readonly position?: 'top' | 'bottom';
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(props: { isStuck: boolean }): VNode[];
    }>();

    const sentinelRef = useTemplateRef<HTMLElement>('sentinel');
    const isStuck = ref(false);

    watch(sentinelRef, (sentinel, _, onCleanup) => {
        if (!sentinel) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            isStuck.value = !entry.isIntersecting;
        }, {
            threshold: 0
        });

        observer.observe(sentinel);

        onCleanup(() => {
            observer.disconnect();
        });
    }, {immediate: true});
</script>
