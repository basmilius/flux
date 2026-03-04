<template>
    <div
        ref="itemWrapper"
        :class="$style.contextMenuItemWrapper"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <FluxMenuItem
            :="{type, disabled, iconLeading, iconTrailing, isLoading, isDestructive, label, href, rel, target, to}"
            :command-icon="hasSubMenu ? 'angle-right' : commandIcon"
            :command="hasSubMenu ? undefined : command"
            :command-loading="commandLoading"
            :image-alt="imageAlt"
            :image-src="imageSrc"
            :is-active="isActive"
            :is-highlighted="isHighlighted"
            :is-indented="isIndented"
            :is-selectable="isSelectable"
            :is-selected="isSelectable && isSelected"
            @click="onClick"/>

        <Teleport
            v-if="isSubMenuOpen"
            to="body">
            <div
                ref="subMenuContainer"
                :class="$style.contextMenuSubMenu"
                :style="{
                    '--sub-x': `${subMenuX}px`,
                    '--sub-y': `${subMenuY}px`,
                    '--sub-width': subMenuWidth ? `${subMenuWidth}px` : undefined
                }"
                @mouseenter="onSubMenuMouseEnter"
                @mouseleave="onSubMenuMouseLeave">
                <FluxPane
                    ref="subMenuPane"
                    :class="[
                        $style.contextMenuSubMenuPane,
                        isSubMenuClosing && $style.isClosing,
                        isSubMenuOpening && $style.isOpening
                    ]">
                    <FluxMenu>
                        <slot name="subMenu"/>
                    </FluxMenu>
                </FluxPane>
            </div>

            <svg
                v-if="isDebug && predictionCone"
                :class="$style.contextMenuPredictionCone"
                :width="viewportWidth"
                :height="viewportHeight">
                <polygon
                    :points="predictionConePoints"
                    fill="rgba(99, 102, 241, 0.2)"
                    stroke="rgba(99, 102, 241, 0.7)"
                    stroke-width="1.5"/>
            </svg>
        </Teleport>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxIconName } from '@flux-ui/types';
    import { unrefTemplateElement } from '@flux-ui/internals';
    import { computed, inject, onUnmounted, ref, unref, useSlots, useTemplateRef } from 'vue';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxPane from './FluxPane.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    // Extra vertical tolerance added beyond the sub-menu's actual top/bottom edges.
    // Without this buffer, a cursor that exits an item near the sub-menu's top or
    // bottom corner would immediately leave the triangular safe zone (because the
    // cone's slanted top edge tilts slightly downward toward the sub-menu corner),
    // causing the sub-menu to close before the user can reach it.
    const CONE_BUFFER = 50;

    defineEmits<FluxButtonEmits>();

    const slots = useSlots();

    const {
        type = 'button',
        subMenuWidth
    } = defineProps<Omit<FluxButtonProps, 'isFilled' | 'isSubmit' | 'size'> & {
        readonly command?: string;
        readonly commandIcon?: FluxIconName;
        readonly commandLoading?: boolean;
        readonly imageAlt?: string;
        readonly imageSrc?: string;
        readonly isActive?: boolean;
        readonly isDestructive?: boolean;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly subMenuWidth?: number;
    }>();

    defineSlots<{
        subMenu(): any;
    }>();

    const contextMenu = inject(FluxContextMenuInjectionKey, {
        close: () => void 0,
        isDebug: ref(false)
    });

    const isDebug = computed(() => contextMenu.isDebug.value);
    const hasSubMenu = computed(() => !!slots.subMenu);
    const viewportWidth = ref(0);
    const viewportHeight = ref(0);

    const itemWrapperRef = useTemplateRef('itemWrapper');
    const subMenuContainerRef = useTemplateRef('subMenuContainer');
    const subMenuPaneRef = useTemplateRef('subMenuPane');

    const isSubMenuClosing = ref(false);
    const isSubMenuOpen = ref(false);
    const isSubMenuOpening = ref(false);
    const subMenuX = ref(0);
    const subMenuY = ref(0);

    type Point = {x: number; y: number};
    const predictionCone = ref<[Point, Point, Point] | null>(null);
    let mouseX = 0;
    let mouseY = 0;
    let coneCheckFrame: number | null = null;
    let coneRetries = 0;

    onUnmounted(() => {
        stopConeCheck();
    });

    const predictionConePoints = computed(() => {
        const cone = unref(predictionCone);

        if (!cone) {
            return '';
        }

        return cone.map(p => `${p.x},${p.y}`).join(' ');
    });

    function openSubMenu(): void {
        const item = unrefTemplateElement(itemWrapperRef);

        if (!item) {
            return;
        }

        const {top, right, bottom, left} = item.getBoundingClientRect();

        let sx = right;
        let sy = top;

        isSubMenuClosing.value = false;
        isSubMenuOpen.value = true;
        isSubMenuOpening.value = true;
        subMenuX.value = sx;
        subMenuY.value = sy;

        requestAnimationFrame(() => {
            const pane = unrefTemplateElement(subMenuPaneRef);

            if (pane) {
                pane.addEventListener('animationend', () => {
                    isSubMenuOpening.value = false;
                }, {once: true});
            }

            const subMenuContainer = unrefTemplateElement(subMenuContainerRef);

            if (!subMenuContainer) {
                return;
            }

            const {width: subMenuW, height: subMenuH} = subMenuContainer.getBoundingClientRect();

            if (sx + subMenuW > innerWidth - 12) {
                sx = left - subMenuW;
            }

            if (sy + subMenuH > innerHeight - 12) {
                sy = bottom - subMenuH;
            }

            subMenuX.value = Math.max(12, sx);
            subMenuY.value = Math.max(12, sy);
        });
    }

    function closeSubMenu(): void {
        if (!unref(isSubMenuOpen) || unref(isSubMenuClosing)) {
            return;
        }

        const pane = unrefTemplateElement(subMenuPaneRef);

        if (!pane) {
            isSubMenuOpen.value = false;
            return;
        }

        pane.addEventListener('animationend', () => {
            isSubMenuClosing.value = false;
            isSubMenuOpen.value = false;
        }, {once: true});

        isSubMenuClosing.value = true;
        predictionCone.value = null;
    }

    function computePredictionCone(): void {
        const subMenuContainer = unrefTemplateElement(subMenuContainerRef);

        if (!subMenuContainer) {
            return;
        }

        const {top, bottom, left, right} = subMenuContainer.getBoundingClientRect();

        // Use the sub-menu's centre to determine which edge is closest to the cursor.
        // This is more reliable than comparing subMenuX (a reactive ref that may still
        // hold its initial pre-rAF value) with mouseX.
        const nearX = (left + right) / 2 > mouseX ? left : right;

        predictionCone.value = [
            {x: mouseX, y: mouseY},
            {x: nearX, y: top - CONE_BUFFER},
            {x: nearX, y: bottom + CONE_BUFFER}
        ];

        viewportWidth.value = innerWidth;
        viewportHeight.value = innerHeight;
    }

    function isPointInTriangle(p: Point, a: Point, b: Point, c: Point): boolean {
        function sign(p1: Point, p2: Point, p3: Point): number {
            return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        }

        const d1 = sign(p, a, b);
        const d2 = sign(p, b, c);
        const d3 = sign(p, c, a);

        const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
        const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

        return !(hasNeg && hasPos);
    }

    function isInPredictionCone(mx: number, my: number): boolean {
        const cone = unref(predictionCone);

        if (!cone) {
            return false;
        }

        return isPointInTriangle({x: mx, y: my}, cone[0], cone[1], cone[2]);
    }

    function startConeCheck(): void {
        coneRetries = 0;
        document.addEventListener('mousemove', onMouseMove, {passive: true});
        scheduleConeCheck();
    }

    function stopConeCheck(): void {
        document.removeEventListener('mousemove', onMouseMove);

        if (coneCheckFrame !== null) {
            cancelAnimationFrame(coneCheckFrame);
            coneCheckFrame = null;
        }
    }

    function scheduleConeCheck(): void {
        coneCheckFrame = requestAnimationFrame(() => {
            coneCheckFrame = null;

            if (!unref(isSubMenuOpen)) {
                return;
            }

            // If the cone hasn't been computed yet (sub-menu container wasn't in the
            // DOM when onMouseLeave fired), try again now that a frame has passed.
            // Limit retries so a permanently-missing container doesn't loop forever.
            if (!unref(predictionCone)) {
                computePredictionCone();

                if (!unref(predictionCone)) {
                    if (++coneRetries < 5) {
                        scheduleConeCheck();
                    } else {
                        closeSubMenu();
                        stopConeCheck();
                    }

                    return;
                }
            }

            if (!isInPredictionCone(mouseX, mouseY)) {
                closeSubMenu();
                stopConeCheck();
            } else {
                scheduleConeCheck();
            }
        });
    }

    function onMouseEnter(): void {
        stopConeCheck();
        predictionCone.value = null;

        if (hasSubMenu.value) {
            openSubMenu();
        }
    }

    function onMouseLeave(evt: MouseEvent): void {
        if (!hasSubMenu.value || !unref(isSubMenuOpen)) {
            return;
        }

        mouseX = evt.clientX;
        mouseY = evt.clientY;

        computePredictionCone();
        startConeCheck();
    }

    function onMouseMove(evt: MouseEvent): void {
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }

    function onSubMenuMouseEnter(): void {
        stopConeCheck();
        predictionCone.value = null;
    }

    function onSubMenuMouseLeave(): void {
        closeSubMenu();
    }

    function onClick(): void {
        if (hasSubMenu.value) {
            return;
        }

        contextMenu.close();
    }
</script>
