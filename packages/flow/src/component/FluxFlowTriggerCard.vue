<template>
    <FluxFlowCard
        :="{title, subtitle, label, icon, color, active, isLoading}"
        variant="trigger">
        <template
            v-for="slot of forwardedSlots"
            #[slot]>
            <slot :name="slot"/>
        </template>
    </FluxFlowCard>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, useSlots } from 'vue';
    import FluxFlowCard, { SLOTS } from './FluxFlowCard.vue';

    defineProps<{
        readonly title?: string;
        readonly subtitle?: string;
        readonly label?: string;
        readonly icon?: FluxIconName;
        readonly color?: FluxColor;
        readonly active?: boolean;
        readonly isLoading?: boolean;
    }>();

    defineSlots<{
        default(): any;
        footer(): any;
        header(): any;
    }>();

    const slots = useSlots();
    const forwardedSlots = computed(() => SLOTS.filter(name => name in slots));
</script>
