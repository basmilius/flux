<template>
    <FluxMenuItem
        ref="trigger"
        :class="isOpen && $style.menuFlyoutTriggerOpen"
        command-icon="angle-right"
        :disabled="disabled"
        :icon-leading="icon"
        :is-active="isActive"
        :is-destructive="isDestructive"
        is-persistent
        :label="label"
        aria-haspopup="menu"
        :aria-expanded="isOpen ? 'true' : 'false'"
        @click="onTriggerClick"
        @keydown="onTriggerKeydown">
        <template
            v-if="$slots.trigger"
            #label>
            <slot name="trigger"/>
        </template>
    </FluxMenuItem>

    <Teleport to="body">
        <AnchorPopup
            v-if="isOpen"
            ref="popup"
            :anchor="popupAnchor"
            :class="$style.menuFlyoutPopup"
            clamp-to-viewport
            :margin="2"
            :position="position"
            role="menu"
            :aria-label="translate('flux.submenu')"
            @keydown="onPopupKeydown">
            <slot/>
        </AnchorPopup>

        <svg
            v-if="showDebugCone"
            :class="clsx($style.menuFlyoutConeDebug, cone?.back && $style.menuFlyoutConeDebugBack)">
            <polygon :points="conePoints"/>
            <template v-if="!cone?.back">
                <line
                    :x1="coneApex.x"
                    :y1="coneApex.y"
                    :x2="coneHead.x"
                    :y2="coneHead.y"/>
                <circle
                    :class="$style.menuFlyoutConeDebugApex"
                    :cx="coneApex.x"
                    :cy="coneApex.y"
                    r="4"/>
            </template>
            <circle
                :class="$style.menuFlyoutConeDebugHead"
                :cx="coneHead.x"
                :cy="coneHead.y"
                r="3"/>
        </svg>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type ComponentPublicInstance, toRef, useTemplateRef, type VNode } from 'vue';
    import { useMenuFlyout, useTranslate } from '~flux/components/composable/private';
    import { AnchorPopup } from '~flux/components/component/primitive';
    import FluxMenuItem from './FluxMenuItem.vue';
    import $style from '~flux/components/css/component/MenuFlyout.module.scss';

    const {
        disabled,
        position = 'right-top'
    } = defineProps<{
        readonly disabled?: boolean;
        readonly icon?: FluxIconName;
        readonly isActive?: boolean;
        readonly isDestructive?: boolean;
        readonly label?: string;
        readonly position?:
            | 'top' | 'top-left' | 'top-right'
            | 'left' | 'left-top' | 'left-bottom'
            | 'right' | 'right-top' | 'right-bottom'
            | 'bottom' | 'bottom-left' | 'bottom-right';
    }>();

    defineSlots<{
        default(): VNode[];
        trigger(): VNode[];
    }>();

    // The top chrome of a menu inside a pane: 1px pane border + 9px menu margin
    // (see `.basePane > .menu` in Menu.module.scss). Subtracting it aligns the first
    // submenu item with the opener item instead of dropping it lower.
    const MENU_CHROME_TOP = 10;

    const translate = useTranslate();

    const triggerRef = useTemplateRef<ComponentPublicInstance>('trigger');
    const popupRef = useTemplateRef<ComponentPublicInstance>('popup');

    const popupAnchor = {
        $el: {
            getBoundingClientRect(): DOMRect {
                const element = triggerRef.value?.$el as HTMLElement | undefined;

                if (!element) {
                    return new DOMRect();
                }

                const rect = element.getBoundingClientRect();

                return new DOMRect(rect.x, rect.y - MENU_CHROME_TOP, rect.width, rect.height);
            }
        }
    } as unknown as ComponentPublicInstance;

    const {
        context,
        cone,
        isOpen,
        onPopupKeydown,
        onTriggerClick,
        onTriggerKeydown
    } = useMenuFlyout({triggerRef, popupRef, disabled: toRef(() => disabled)});

    const showDebugCone = computed(() => !!context && context.debugCone.value && isOpen.value && !!cone.value);
    const conePoints = computed(() => {
        const value = cone.value;

        if (!value) {
            return '';
        }

        const points = `${value.ax},${value.ay} ${value.bx},${value.by} ${value.cx},${value.cy}`;

        return value.dx !== undefined && value.dy !== undefined ? `${points} ${value.dx},${value.dy}` : points;
    });
    const coneApex = computed(() => ({x: cone.value?.ax ?? 0, y: cone.value?.ay ?? 0}));
    const coneHead = computed(() => ({x: cone.value?.hx ?? 0, y: cone.value?.hy ?? 0}));
</script>
