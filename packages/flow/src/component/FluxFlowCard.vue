<template>
    <FluxPane :class="clsx($style.flowCardSurface, active && $style.isActive)">
        <FluxPaneHeader
            :class="$style.flowCardHeader"
            :title="effectiveTitle"
            :subtitle="subtitle">
            <template #before>
                <FluxFlowIcon
                    :color="effectiveColor"
                    :name="effectiveIcon"
                    :is-loading="isLoading"/>
            </template>

            <template
                v-if="$slots.header"
                #after>
                <slot name="header"/>
            </template>
        </FluxPaneHeader>

        <FluxPaneBody
            v-if="$slots.default"
            :class="$style.flowCardBody">
            <slot/>
        </FluxPaneBody>

        <FluxPaneFooter
            v-if="$slots.footer"
            :class="$style.flowCardFooter">
            <slot name="footer"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script lang="ts">
    export const SLOTS = ['default', 'footer', 'header'] as const;
</script>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import FluxFlowIcon from './FluxFlowIcon.vue';
    import $style from '~flux/flow/css/component/FlowCard.module.scss';

    const props = defineProps<{
        readonly title?: string;
        readonly subtitle?: string;
        readonly label?: string;
        readonly icon?: FluxIconName;
        readonly color?: FluxColor;
        readonly active?: boolean;
        readonly isLoading?: boolean;
        readonly variant?: 'default' | 'trigger' | 'condition' | 'action';
    }>();

    defineSlots<{
        default(): any;
        footer(): any;
        header(): any;
    }>();

    const VARIANT_DEFAULTS = {
        default: {color: 'gray' as FluxColor, icon: 'circle-dot' as FluxIconName, label: 'Step'},
        trigger: {color: 'info' as FluxColor, icon: 'bolt' as FluxIconName, label: 'Trigger'},
        condition: {color: 'warning' as FluxColor, icon: 'code-branch' as FluxIconName, label: 'Condition'},
        action: {color: 'primary' as FluxColor, icon: 'play' as FluxIconName, label: 'Action'}
    };

    const defaults = computed(() => VARIANT_DEFAULTS[props.variant ?? 'default']);
    const effectiveColor = computed<FluxColor>(() => props.color ?? defaults.value.color);
    const effectiveIcon = computed<FluxIconName>(() => props.icon ?? defaults.value.icon);

    // A bare <FluxFlowConditionCard/> still reads as "Condition".
    const effectiveTitle = computed<string>(() => props.title ?? props.label ?? defaults.value.label);
</script>
