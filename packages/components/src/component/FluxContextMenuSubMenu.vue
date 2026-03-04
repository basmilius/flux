<template>
    <div
        ref="trigger"
        :class="$style.contextMenuSubMenu"
        @mouseenter="onTriggerMouseEnter"
        @mouseleave="onTriggerMouseLeave"
        @mousemove="onTriggerMouseMove">
        <FluxMenuItem
            :="{disabled, iconLeading, isDestructive, label}"
            icon-trailing="angle-right"
            :tabindex="tabindex"/>

        <template v-if="isSubMenuOpen">
            <svg
                v-if="isDebug && debugConePoints"
                :class="$style.contextMenuSubMenuDebug">
                <polygon :points="debugConePoints"/>
            </svg>

            <div
                ref="subPane"
                :class="$style.contextMenuSubMenuPane"
                :style="{
                    left: `${subMenuX}px`,
                    top: `${subMenuY}px`
                }"
                @mouseenter="onSubMenuMouseEnter"
                @mouseleave="onSubMenuMouseLeave">
                <slot/>
            </div>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { inject, ref, unref, useTemplateRef, watch } from 'vue';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxMenuItem from './FluxMenuItem.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    defineProps<{
        readonly disabled?: boolean;
        readonly iconLeading?: FluxIconName;
        readonly isDestructive?: boolean;
        readonly label?: string;
        readonly tabindex?: number | string;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const contextMenu = inject(FluxContextMenuInjectionKey, null);
    const isDebug = contextMenu?.isDebug ?? ref(false);

    const triggerRef = useTemplateRef<HTMLElement>('trigger');
    const subPaneRef = useTemplateRef<HTMLElement>('subPane');

    const isSubMenuOpen = ref(false);
    const isMouseOverSubMenu = ref(false);

    const subMenuX = ref(0);
    const subMenuY = ref(0);

    const mouseX = ref(0);
    const mouseY = ref(0);

    const coneOriginX = ref(0);
    const coneOriginY = ref(0);
    const coneTopX = ref(0);
    const coneTopY = ref(0);
    const coneBottomX = ref(0);
    const coneBottomY = ref(0);

    const debugConePoints = ref<string | null>(null);

    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    function openSubMenu(): void {
        const trigger = unref(triggerRef);

        if (!trigger) {
            return;
        }

        const triggerRect = trigger.getBoundingClientRect();
        isSubMenuOpen.value = true;

        requestAnimationFrame(() => {
            const subPane = unref(subPaneRef);

            if (!subPane) {
                return;
            }

            const {width: paneWidth, height: paneHeight} = subPane.getBoundingClientRect();
            const {right, top, left, height: triggerHeight} = trigger.getBoundingClientRect();

            let sx = right;
            let sy = top;

            if (sx + paneWidth > innerWidth - 15) {
                sx = left - paneWidth;
            }

            if (sy + paneHeight > innerHeight - 15) {
                sy = top + triggerHeight - paneHeight;
            }

            subMenuX.value = sx;
            subMenuY.value = sy;

            coneOriginX.value = unref(mouseX);
            coneOriginY.value = unref(mouseY);
            coneTopX.value = sx;
            coneTopY.value = sy;
            coneBottomX.value = sx;
            coneBottomY.value = sy + paneHeight;

            updateDebugCone();
        });

        // Initialize origin to current mouse position so cone is correct when sub-menu opens
        coneOriginX.value = triggerRect.right;
        coneOriginY.value = unref(mouseY);
    }

    function closeSubMenu(): void {
        isSubMenuOpen.value = false;
        isMouseOverSubMenu.value = false;
        debugConePoints.value = null;
        cancelClose();
    }

    function scheduleClose(): void {
        cancelClose();
        closeTimer = setTimeout(() => {
            if (!unref(isMouseOverSubMenu)) {
                closeSubMenu();
            }
        }, 100);
    }

    function cancelClose(): void {
        if (closeTimer !== null) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
    }

    function updateDebugCone(): void {
        if (!unref(isDebug)) {
            debugConePoints.value = null;
            return;
        }

        const ox = unref(coneOriginX);
        const oy = unref(coneOriginY);
        const tx = unref(coneTopX);
        const ty = unref(coneTopY);
        const bx = unref(coneBottomX);
        const by = unref(coneBottomY);

        debugConePoints.value = `${ox},${oy} ${tx},${ty} ${bx},${by}`;
    }

    function isPointInTriangle(
        px: number, py: number,
        ax: number, ay: number,
        bx: number, by: number,
        cx: number, cy: number
    ): boolean {
        const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by);
        const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy);
        const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay);

        const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
        const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

        return !(hasNeg && hasPos);
    }

    function onTriggerMouseEnter(): void {
        cancelClose();

        if (!unref(isSubMenuOpen)) {
            openSubMenu();
        }
    }

    function onTriggerMouseLeave(): void {
        if (unref(isMouseOverSubMenu)) {
            return;
        }

        scheduleClose();
    }

    function onTriggerMouseMove(evt: MouseEvent): void {
        mouseX.value = evt.clientX;
        mouseY.value = evt.clientY;
    }

    function onSubMenuMouseEnter(): void {
        isMouseOverSubMenu.value = true;
        cancelClose();
    }

    function onSubMenuMouseLeave(): void {
        isMouseOverSubMenu.value = false;
        scheduleClose();
    }

    watch(isSubMenuOpen, (open, _, onCleanup) => {
        if (!open) {
            return;
        }

        const onMouseMove = (evt: MouseEvent) => {
            if (!unref(isSubMenuOpen) || unref(isMouseOverSubMenu)) {
                coneOriginX.value = evt.clientX;
                coneOriginY.value = evt.clientY;
                return;
            }

            // Check if the new position is within the prediction cone
            // (triangle from previous position to sub-menu near edge)
            const prevX = unref(coneOriginX);
            const prevY = unref(coneOriginY);

            // Update cone origin AFTER reading the previous value
            coneOriginX.value = evt.clientX;
            coneOriginY.value = evt.clientY;
            updateDebugCone();

            if (!isPointInTriangle(
                evt.clientX, evt.clientY,
                prevX, prevY,
                unref(coneTopX), unref(coneTopY),
                unref(coneBottomX), unref(coneBottomY)
            )) {
                const trigger = unref(triggerRef);

                if (trigger) {
                    const rect = trigger.getBoundingClientRect();
                    const overTrigger = evt.clientX >= rect.left && evt.clientX <= rect.right &&
                        evt.clientY >= rect.top && evt.clientY <= rect.bottom;

                    if (!overTrigger) {
                        closeSubMenu();
                    }
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove, {passive: true});
        onCleanup(() => window.removeEventListener('mousemove', onMouseMove));
    });
</script>
