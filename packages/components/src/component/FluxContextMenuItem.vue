<template>
    <FluxMenuItem
        v-bind="$props"
        :command-icon="hasSubMenu ? 'angle-right' : $props.commandIcon"
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
        to="body">
        <div
            v-if="isSubMenuOpen"
            ref="subMenuPane"
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
    import { clsx } from 'clsx';
    import { computed, inject, onUnmounted, ref, unref, useTemplateRef, watch, watchEffect } from 'vue';
    import { FluxContextMenuInjectionKey } from '$flux/data';
    import FluxMenuItem from './FluxMenuItem.vue';
    import $style from '$flux/css/component/ContextMenu.module.scss';

    defineEmits<FluxButtonEmits>();

    const slots = defineSlots<{
        after(): any;
        'sub-menu'(): any;
    }>();

    defineProps<Omit<FluxButtonProps, 'isFilled' | 'isSubmit' | 'size'> & {
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
    const isDebug = injection?.isDebug ?? false;
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

    let lastMouseX = 0;
    let lastMouseY = 0;
    let itemRect: DOMRect | null = null;

    function openSubMenu(triggerEl: HTMLElement): void {
        isSubMenuOpen.value = true;
        itemRect = triggerEl.getBoundingClientRect();

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

        if (!pane) {
            isSubMenuOpen.value = false;
            conePoints.value = null;
            return;
        }

        pane.addEventListener('animationend', () => {
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
        let y = rect.top;

        if (x + paneWidth > innerWidth - safeZone) {
            x = rect.left - paneWidth;
        }

        if (y + paneHeight > innerHeight - safeZone) {
            y = innerHeight - paneHeight - safeZone;
        }

        subMenuX.value = Math.max(safeZone, x);
        subMenuY.value = Math.max(safeZone, y);
    }

    function isMovingTowardsSubMenu(mouseX: number, mouseY: number): boolean {
        const pane = unref(subMenuPaneRef);

        if (!pane || !itemRect) {
            return false;
        }

        const paneRect = pane.getBoundingClientRect();
        const subMenuIsRight = paneRect.left >= itemRect.right - 20;
        const dx = mouseX - lastMouseX;

        if (subMenuIsRight) {
            if (dx <= 0) {
                return false;
            }

            const dxToPane = paneRect.left - lastMouseX;

            if (dxToPane <= 0) {
                return true;
            }

            const slopeToTop = (paneRect.top - lastMouseY) / dxToPane;
            const slopeToBottom = (paneRect.bottom - lastMouseY) / dxToPane;
            const currentSlope = (mouseY - lastMouseY) / dx;

            if (isDebug) {
                viewportWidth.value = window.innerWidth;
                viewportHeight.value = window.innerHeight;
                conePoints.value = `${lastMouseX},${lastMouseY} ${paneRect.left},${paneRect.top} ${paneRect.left},${paneRect.bottom}`;
            }

            return currentSlope >= Math.min(slopeToTop, slopeToBottom) &&
                currentSlope <= Math.max(slopeToTop, slopeToBottom);
        } else {
            if (dx >= 0) {
                return false;
            }

            const dxToPane = paneRect.right - lastMouseX;

            if (dxToPane >= 0) {
                return true;
            }

            const slopeToTop = (paneRect.top - lastMouseY) / dxToPane;
            const slopeToBottom = (paneRect.bottom - lastMouseY) / dxToPane;
            const currentSlope = (mouseY - lastMouseY) / dx;

            if (isDebug) {
                viewportWidth.value = window.innerWidth;
                viewportHeight.value = window.innerHeight;
                conePoints.value = `${lastMouseX},${lastMouseY} ${paneRect.right},${paneRect.top} ${paneRect.right},${paneRect.bottom}`;
            }

            return currentSlope >= Math.min(slopeToTop, slopeToBottom) &&
                currentSlope <= Math.max(slopeToTop, slopeToBottom);
        }
    }

    function onMouseMoveWhileLeaving(evt: MouseEvent): void {
        if (isMovingTowardsSubMenu(evt.clientX, evt.clientY)) {
            lastMouseX = evt.clientX;
            lastMouseY = evt.clientY;
            return;
        }

        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
        closeSubMenu();
    }

    function onMouseEnter(evt: MouseEvent): void {
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);

        if (unref(hasSubMenu)) {
            openSubMenu(evt.currentTarget as HTMLElement);
        }
    }

    function onMouseLeave(evt: MouseEvent): void {
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;

        if (!unref(isSubMenuOpen)) {
            return;
        }

        window.addEventListener('mousemove', onMouseMoveWhileLeaving, {passive: true});
    }

    function onSubMenuMouseEnter(): void {
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
    }

    function onSubMenuMouseLeave(): void {
        closeSubMenu();
    }

    watchEffect(() => {
        if (injection?.isOpen?.value === false) {
            isSubMenuOpen.value = false;
            isSubMenuClosing.value = false;
            conePoints.value = null;
        }
    });

    watch(isSubMenuOpen, isOpen => {
        if (!isOpen) {
            window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
        }
    });

    onUnmounted(() => {
        window.removeEventListener('mousemove', onMouseMoveWhileLeaving);
    });
</script>
