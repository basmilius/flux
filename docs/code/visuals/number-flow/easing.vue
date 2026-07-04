<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="18">
        <FluxFlex
            v-for="row in rows"
            :key="row.label"
            align="baseline"
            direction="horizontal"
            :gap="12">
            <span style="width: 168px; color: var(--gray-500); font-size: 13px; font-weight: 500;">{{ row.label }}</span>

            <FluxVisualNumberFlow
                :easing="row.easing"
                :value="value"
                style="font-size: 24px; font-weight: 700;"/>
        </FluxFlex>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Recount"
            @click="recount"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualNumberFlow } from '@flux-ui/visuals';
    import { ref } from 'vue';

    // Each row tweens to the same value with a different easing so the curves are
    // easy to compare: the default swift-out, a linear ramp, a cubic-bezier() that
    // overshoots before settling and a custom ease-out-cubic function.
    const rows = [
        {label: 'Swift-out (default)', easing: undefined},
        {label: 'Linear', easing: 'linear'},
        {label: 'Overshoot', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'},
        {label: 'Ease-out cubic', easing: (t: number) => 1 - (1 - t) ** 3}
    ] as const;

    const value = ref(75000);

    function recount(): void {
        value.value = 20000 + Math.floor(Math.random() * 80000);
    }
</script>
