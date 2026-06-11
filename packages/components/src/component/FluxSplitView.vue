<template>
    <Component
        :is="tag ?? 'div'"
        ref="container"
        :class="clsx(
            direction === 'horizontal' && $style.splitViewHorizontal,
            direction === 'vertical' && $style.splitViewVertical,
            isDragging && $style.splitViewDragging
        )"
        :style="templateStyle">
        <template v-for="(pane, index) in panes" :key="pane.id">
            <component :is="pane.vnode"/>

            <button
                v-if="index < panes.length - 1"
                :class="direction === 'horizontal' ? $style.splitViewHandle : $style.splitViewHandleVertical"
                type="button"
                role="separator"
                :aria-orientation="direction === 'horizontal' ? 'vertical' : 'horizontal'"
                :aria-valuemin="0"
                :aria-valuenow="Math.round(sizes[index] ?? 0)"
                :tabindex="pane.isResizable && panes[index + 1].isResizable ? 0 : -1"
                @pointerdown="onHandlePointerDown($event, index)"
                @keydown="onHandleKeyDown($event, index)"/>
        </template>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree } from '@flux-ui/internals';
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, toRef, useTemplateRef, type VNode } from 'vue';
    import { type SplitViewPane, useSplitView } from '~flux/components/composable/private';
    import FluxSplitViewPane from './FluxSplitViewPane.vue';
    import $style from '~flux/components/css/component/SplitView.module.scss';

    type ParsedPane = SplitViewPane & {
        readonly vnode: VNode;
    };

    const {
        direction = 'horizontal',
        rememberKey
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly rememberKey?: string;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    const containerRef = useTemplateRef<HTMLElement>('container');

    const panes = computed<readonly ParsedPane[]>(() => {
        const vnodes = flattenVNodeTree(slots.default?.() ?? []);
        const out: ParsedPane[] = [];

        for (const vnode of vnodes) {
            if (vnode.type !== FluxSplitViewPane) {
                continue;
            }

            const props = vnode.props ?? {};
            const defaultSize = props.defaultSize ?? props['default-size'];
            const minSize = props.minSize ?? props['min-size'];
            const maxSize = props.maxSize ?? props['max-size'];
            const isResizable = props.isResizable ?? props['is-resizable'];

            out.push({
                id: out.length,
                vnode,
                defaultSize: defaultSize as number | string | undefined,
                minSize: typeof minSize === 'number' ? minSize : 64,
                maxSize: typeof maxSize === 'number' ? maxSize : undefined,
                isResizable: isResizable !== false && isResizable !== 'false'
            });
        }

        return out;
    });

    const paneSpecs = computed<readonly SplitViewPane[]>(() => panes.value);

    const {
        sizes,
        templateStyle,
        isDragging,
        onHandlePointerDown,
        onHandleKeyDown
    } = useSplitView({
        containerRef,
        direction: toRef(() => direction),
        panes: paneSpecs,
        rememberKey
    });
</script>
