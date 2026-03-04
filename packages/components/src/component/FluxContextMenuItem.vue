<template>
    <FluxMenuItem
        ref="menuItem"
        v-bind="props"
        :style="subMenuOpenStyle"
        :command-icon="hasSubMenu ? 'angle-right' : props.commandIcon"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <template
            v-if="slots.after"
            #after>
            <slot name="after"/>
        </template>
    </FluxMenuItem>

    <Teleport
        v-if="hasSubMenu"
        :to="teleportTarget">
        <div
            v-if="isSubMenuOpen"
            ref="subMenuPane"
            data-flux-submenu="true"
            :class="clsx(
                $style.contextMenuSubMenuPane,
                isSubMenuClosing && $style.isClosing,
                isSubMenuOpening && $style.isOpening
            )"
            :style="{
                '--sub-pane-x': `${subMenuX}px`,
                '--sub-pane-y': `${subMenuY}px`
            }"
            @mouseenter="onSubMenuMouseEnter"
            @mouseleave="onSubMenuMouseLeave">
            <slot name="sub-menu"/>
        </div>

        <svg
            v-if="isSubMenuOpen && isDebug && conePoints"
            :class="$style.contextMenuPredictionCone"
            :viewBox="`0 0 ${viewportWidth} ${viewportHeight}`"
            xmlns="http://www.w3.org/2000/svg">
            <polygon
                :points="conePoints"
                fill="rgba(255, 100, 0, 0.25)"
                stroke="rgba(255, 100, 0, 0.6)"
                stroke-width="1"/>
        </svg>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxIconName } from '@flux-ui/types';
    import { unrefTemplateElement } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, inject, onUnmounted, ref, unref, useTemplateRef, watch, watchEffect } from 'vue';
    import type { FluxContextMenuActiveCone } from '$flux/data';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxMenuItem from './FluxMenuItem.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    defineEmits<FluxButtonEmits>();

    const slots = defineSlots<{
        after(): any;
        'sub-menu'(): any;
    }>();

    const props = defineProps<Omit<FluxButtonProps, 'isFilled' | 'isSubmit' | 'size'> & {
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
    }>();

    const injection = inject(FluxContextMenuInjectionKey);
    const isDebug = computed(() => unref(injection?.isDebug) ?? false);
    const teleportTarget = computed<string | HTMLElement>(() => unref(injection?.dialog) ?? 'body');
    const menuItemRef = useTemplateRef('menuItem');
    const subMenuPaneRef = useTemplateRef('subMenuPane');

    const hasSubMenu = computed(() => !!slots['sub-menu']);
    const isSubMenuClosing = ref(false);
    const isSubMenuOpening = ref(false);
    const isSubMenuOpen = ref(false);
    const subMenuX = ref(0);
    const subMenuY = ref(0);
    const conePoints = ref<string | null>(null);
    const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920);
    const viewportHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1080);

    const subMenuOpenStyle = computed(() =>
        isSubMenuOpen.value && !isSubMenuClosing.value && !props.isActive && !props.isHighlighted
            ? {background: 'var(--gray-100)'}
            : undefined
    );

    const SUB_MENU_OVERLAP = 20;
    const MENU_FIRST_ITEM_MARGIN_TOP = 9;

    let lastMouseX = 0;
    let lastMouseY = 0;
    let subMenuAnchorX = 0;
    let subMenuAnchorY = 0;
    let subMenuAnchorSet = false;
    let itemRect: DOMRect | null = null;
    let closeGeneration = 0;
    let myActiveCone: FluxContextMenuActiveCone | null = null;

    function openSubMenu(triggerEl: HTMLElement): void {
        // Cancel any pending close animation from a previous closeSubMenu() call.
        ++closeGeneration;
        isSubMenuClosing.value = false;
        isSubMenuOpen.value = true;
        itemRect = triggerEl.getBoundingClientRect();
        subMenuAnchorSet = false;

        if (isDebug.value) {
            window.addEventListener('mousemove', onMouseMoveCone, {passive: true});
        }

        requestAnimationFrame(() => {
            const pane = unref(subMenuPaneRef);

            if (!pane || !itemRect) {
                return;
            }

            pane.addEventListener('animationend', () => {
                isSubMenuOpening.value = false;
            }, {once: true});

            isSubMenuOpening.value = true;
            positionSubMenu(pane, itemRect);
        });
    }

    function closeSubMenu(): void {
        const pane = unref(subMenuPaneRef);
        const gen = ++closeGeneration;
        clearActiveCone();
        subMenuAnchorSet = false;

        if (!pane) {
            isSubMenuOpen.value = false;
            conePoints.value = null;
            return;
        }

        pane.addEventListener('animationend', () => {
            if (closeGeneration !== gen) {
                return;
            }

            isSubMenuClosing.value = false;
            isSubMenuOpen.value = false;
            conePoints.value = null;
        }, {once: true});

        isSubMenuClosing.value = true;
        conePoints.value = null;
    }

    function positionSubMenu(pane: HTMLElement, rect: DOMRect): void {
        const {width: paneWidth, height: paneHeight} = pane.getBoundingClientRect();
        const safeZone = 12;

        let x = rect.right;
        let y = rect.top - MENU_FIRST_ITEM_MARGIN_TOP;

        if (x + paneWidth > innerWidth - safeZone) {
            x = rect.left - paneWidth;
        }

        if (y + paneHeight > innerHeight - safeZone) {
            y = innerHeight - paneHeight - safeZone;
        }

        const finalX = Math.max(safeZone, x);
        const finalY = Math.max(safeZone, y);

        subMenuX.value = finalX;
        subMenuY.value = finalY;

        if (isDebug.value) {
            const subMenuIsRight = finalX >= rect.right - SUB_MENU_OVERLAP;
            const edgeX = subMenuIsRight ? finalX : finalX + paneWidth;
            const apexX = lastMouseX || (rect.left + rect.right) / 2;
            const apexY = lastMouseY || (rect.top + rect.bottom) / 2;
            viewportWidth.value = window.innerWidth;
            viewportHeight.value = window.innerHeight;
            conePoints.value = `${apexX},${apexY} ${edgeX},${finalY} ${edgeX},${finalY + paneHeight}`;
        }
    }

    function clearActiveCone(): void {
        if (injection?.activeCone && injection.activeCone.value === myActiveCone) {
            injection.activeCone.value = null;
        }

        myActiveCone = null;
    }

    function cancelConeTracking(): void {
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
        closeSubMenu();
    }

    function isMovingTowardsSubMenu(mouseX: number, mouseY: number): boolean {
        const pane = unref(subMenuPaneRef);

        if (!pane || !itemRect) {
            return false;
        }

        const paneRect = pane.getBoundingClientRect();
        const subMenuIsRight = paneRect.left >= itemRect.right - SUB_MENU_OVERLAP;
        const dx = mouseX - subMenuAnchorX;

        if (subMenuIsRight) {
            // Cursor must move right to reach the sub-menu; dx ≤ 0 means it hasn't.
            if (dx <= 0) {
                return false;
            }

            if (mouseX >= paneRect.left) {
                return true;
            }

            const dxToPane = paneRect.left - subMenuAnchorX;
            const slopeToTop = (paneRect.top - subMenuAnchorY) / dxToPane;
            const slopeToBottom = (paneRect.bottom - subMenuAnchorY) / dxToPane;
            const slopeToMouse = (mouseY - subMenuAnchorY) / dx;

            return slopeToMouse >= Math.min(slopeToTop, slopeToBottom) &&
                slopeToMouse <= Math.max(slopeToTop, slopeToBottom);
        } else {
            // Cursor must move left to reach the sub-menu; dx ≥ 0 means it hasn't.
            if (dx >= 0) {
                return false;
            }

            if (mouseX <= paneRect.right) {
                return true;
            }

            const dxToPane = paneRect.right - subMenuAnchorX;
            const slopeToTop = (paneRect.top - subMenuAnchorY) / dxToPane;
            const slopeToBottom = (paneRect.bottom - subMenuAnchorY) / dxToPane;
            const slopeToMouse = (mouseY - subMenuAnchorY) / dx;

            return slopeToMouse >= Math.min(slopeToTop, slopeToBottom) &&
                slopeToMouse <= Math.max(slopeToTop, slopeToBottom);
        }
    }

    function onMouseMoveCone(evt: MouseEvent): void {
        if (isSubMenuClosing.value) {
            return;
        }

        const pane = unref(subMenuPaneRef);

        if (!pane || !itemRect) {
            return;
        }

        const paneRect = pane.getBoundingClientRect();
        const subMenuIsRight = paneRect.left >= itemRect.right - SUB_MENU_OVERLAP;
        const edgeX = subMenuIsRight ? paneRect.left : paneRect.right;
        const apexX = subMenuAnchorSet ? subMenuAnchorX : evt.clientX;
        const apexY = subMenuAnchorSet ? subMenuAnchorY : evt.clientY;

        viewportWidth.value = window.innerWidth;
        viewportHeight.value = window.innerHeight;
        conePoints.value = `${apexX},${apexY} ${edgeX},${paneRect.top} ${edgeX},${paneRect.bottom}`;
    }

    function onMouseMoveWhileLeaving(evt: MouseEvent): void {
        if (isMovingTowardsSubMenu(evt.clientX, evt.clientY)) {
            return;
        }

        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
        closeSubMenu();
    }

    function onMouseEnter(evt: MouseEvent): void {
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;

        // Cancel our own pending cone tracking (re-entering our trigger).
        clearActiveCone();
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);

        // Check whether we're passing through another item's active cone.
        const otherCone = injection?.activeCone?.value;

        if (otherCone) {
            if (otherCone.isInside(evt.clientX, evt.clientY)) {
                // Inside another item's cone — don't steal focus.
                return;
            }

            // Outside the cone — cancel the other item so we can open ours.
            otherCone.cancel();
            injection!.activeCone.value = null;
        }

        subMenuAnchorSet = false;

        if (unref(hasSubMenu)) {
            const el = unrefTemplateElement(menuItemRef);

            if (el) {
                openSubMenu(el);
            }
        }
    }

    function onMouseLeave(evt: MouseEvent): void {
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;

        if (!unref(isSubMenuOpen)) {
            return;
        }

        subMenuAnchorX = evt.clientX;
        subMenuAnchorY = evt.clientY;
        subMenuAnchorSet = true;

        if (injection?.activeCone) {
            myActiveCone = { isInside: isMovingTowardsSubMenu, cancel: cancelConeTracking };
            injection.activeCone.value = myActiveCone;
        }

        window.addEventListener('mousemove', onMouseMoveWhileLeaving, {passive: true});
    }

    function onSubMenuMouseEnter(): void {
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
        window.removeEventListener('mousemove', onMouseMoveCone);
        clearActiveCone();
        conePoints.value = null;
    }

    function onSubMenuMouseLeave(evt: MouseEvent): void {
        const relatedTarget = evt.relatedTarget as HTMLElement | null;
        const triggerEl = unrefTemplateElement(menuItemRef);

        // Mouse moved back to our trigger — onMouseEnter will keep the sub-menu open.
        if (triggerEl && (triggerEl === relatedTarget || triggerEl.contains(relatedTarget))) {
            return;
        }

        const destinationPane = relatedTarget?.closest<HTMLElement>('[data-flux-submenu]') ?? null;

        if (destinationPane) {
            // If our trigger is NOT inside the destination pane, the mouse moved into
            // a child sub-menu pane — keep this level open.
            // If our trigger IS inside the destination pane, the mouse moved back to a
            // parent pane — fall through and close this level.
            if (!triggerEl || !destinationPane.contains(triggerEl)) {
                return;
            }
        }

        closeSubMenu();
    }

    watchEffect(() => {
        if (injection?.isOpen?.value === false) {
            isSubMenuOpen.value = false;
            isSubMenuClosing.value = false;
            conePoints.value = null;
            subMenuAnchorSet = false;
            clearActiveCone();
        }
    });

    watch(isSubMenuOpen, isOpen => {
        if (!isOpen) {
            window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
            window.removeEventListener('mousemove', onMouseMoveCone);
        } else if (isDebug.value) {
            window.addEventListener('mousemove', onMouseMoveCone, {passive: true});
        }
    });

    if (isDebug.value) {
        const onResize = () => {
            viewportWidth.value = window.innerWidth;
            viewportHeight.value = window.innerHeight;
        };

        window.addEventListener('resize', onResize, {passive: true});

        onUnmounted(() => {
            window.removeEventListener('resize', onResize);
        });
    }

    onUnmounted(() => {
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
        window.removeEventListener('mousemove', onMouseMoveCone);
        clearActiveCone();
    });
</script>
