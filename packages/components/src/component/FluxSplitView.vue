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
        <template v-for="(pane, index) in panes" :key="pane.key">
            <component :is="pane.vnode"/>

            <button
                v-if="index < panes.length - 1"
                :class="direction === 'horizontal' ? $style.splitViewHandle : $style.splitViewHandleVertical"
                type="button"
                role="separator"
                :aria-label="`Resize ${direction === 'horizontal' ? 'columns' : 'rows'} ${index + 1} and ${index + 2}`"
                :aria-orientation="direction === 'horizontal' ? 'vertical' : 'horizontal'"
                :aria-valuemin="0"
                :aria-valuemax="100"
                :aria-valuenow="handleValueNow(index)"
                :aria-valuetext="`${handleValueNow(index)}%`"
                :tabindex="pane.isResizable && panes[index + 1].isResizable ? 0 : -1"
                @pointerdown="onHandlePointerDown($event, index)"
                @keydown="onHandleKeyDown($event, index)"/>
        </template>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentProps } from '@flux-ui/internals';
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

            const props = getComponentProps<{
                defaultSize?: number | string;
                minSize?: number;
                maxSize?: number;
                isResizable?: boolean | string;
            }>(vnode);
            const {defaultSize, minSize, maxSize, isResizable} = props;

            const vnodeKey = vnode.key;

            out.push({
                id: out.length,
                key: typeof vnodeKey === 'string' || typeof vnodeKey === 'number' ? vnodeKey : out.length,
                vnode,
                defaultSize,
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

    function handleValueNow(index: number): number {
        const left = sizes.value[index] ?? 0;
        const right = sizes.value[index + 1] ?? 0;
        const total = left + right;

        if (total <= 0) {
            return 0;
        }

        return Math.round((left / total) * 100);
    }
</script>
