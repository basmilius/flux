<template>
    <div :class="$style.flowCard">
        <FluxVerticalWindowTransition>
            <div
                v-if="effectiveLabel"
                :key="badgeKey"
                :class="$style.flowCardBadge">
                <FluxBadge
                    :color="effectiveColor"
                    :icon="effectiveIcon"
                    :label="effectiveLabel"/>
            </div>
        </FluxVerticalWindowTransition>

        <FluxPane :class="clsx($style.flowCardSurface, active && $style.isActive)">
            <FluxPaneHeader
                v-if="title || subtitle"
                :title="title"
                :subtitle="subtitle"/>

            <FluxPaneBody v-if="$slots.default">
                <div :class="$style.flowCardBody">
                    <slot/>
                </div>
            </FluxPaneBody>

            <FluxPaneFooter v-if="$slots.footer">
                <slot name="footer"/>
            </FluxPaneFooter>
        </FluxPane>
    </div>
</template>

<script lang="ts">
    export const SLOTS = ['default', 'footer'] as const;
</script>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBadge, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxVerticalWindowTransition } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import $style from '~flux/flow/css/component/FlowCard.module.scss';

    const props = defineProps<{
        readonly title?: string;
        readonly subtitle?: string;
        readonly label?: string;
        readonly icon?: FluxIconName;
        readonly color?: FluxColor;
        readonly active?: boolean;
        readonly variant?: 'default' | 'trigger' | 'condition' | 'action';
    }>();

    defineSlots<{
        default(): any;
        footer(): any;
    }>();

    const VARIANT_DEFAULTS = {
        default: {color: 'gray' as FluxColor, icon: undefined as FluxIconName | undefined, label: undefined as string | undefined},
        trigger: {color: 'info' as FluxColor, icon: 'bolt' as FluxIconName, label: 'Trigger' as string | undefined},
        condition: {color: 'warning' as FluxColor, icon: 'code-branch' as FluxIconName, label: 'Condition' as string | undefined},
        action: {color: 'primary' as FluxColor, icon: 'play' as FluxIconName, label: 'Action' as string | undefined}
    };

    const defaults = computed(() => VARIANT_DEFAULTS[props.variant ?? 'default']);
    const effectiveColor = computed<FluxColor>(() => props.color ?? defaults.value.color);
    const effectiveIcon = computed<FluxIconName | undefined>(() => props.icon ?? defaults.value.icon);
    const effectiveLabel = computed<string | undefined>(() => props.label ?? defaults.value.label);

    // Re-key the badge on icon or label change so it transitions; a color change
    // recolors in place without re-running the transition.
    const badgeKey = computed(() => `${effectiveIcon.value}-${effectiveLabel.value}`);
</script>
