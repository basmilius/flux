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
            :class="$style.menuFlyoutConeDebug">
            <polygon :points="conePoints"/>
            <circle
                :cx="coneApex.x"
                :cy="coneApex.y"
                r="4"/>
        </svg>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
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
    const conePoints = computed(() => cone.value ? `${cone.value.ax},${cone.value.ay} ${cone.value.bx},${cone.value.by} ${cone.value.cx},${cone.value.cy}` : '');
    const coneApex = computed(() => ({x: cone.value?.ax ?? 0, y: cone.value?.ay ?? 0}));
</script>
