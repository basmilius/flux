<template>
    <FluxFlowCard
        :="{title, subtitle, label, icon, color, active}"
        variant="action">
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
    }>();

    defineSlots<{
        default(): any;
        footer(): any;
    }>();

    const slots = useSlots();
    const forwardedSlots = computed(() => SLOTS.filter(name => name in slots));
</script>
