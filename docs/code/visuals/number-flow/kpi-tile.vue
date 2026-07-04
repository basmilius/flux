<template>
    <FluxPane style="width: 261px;">
        <FluxPaneBody>
            <FluxFlex
                align="start"
                direction="vertical"
                :gap="3">
                <span style="color: var(--gray-500); font-size: 13px; font-weight: 500;">Monthly revenue</span>

                <FluxVisualNumberFlow
                    :format="format"
                    :value="value"
                    style="font-size: 33px; font-weight: 700;"/>
            </FluxFlex>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { FluxVisualNumberFlow } from '@flux-ui/visuals';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const format: Intl.NumberFormatOptions = {style: 'currency', currency: 'USD', maximumFractionDigits: 0};
    const value = ref(84500);

    let timer: number;

    function tick(): void {
        value.value += Math.floor(Math.random() * 900);
    }

    onMounted(() => {
        timer = window.setInterval(tick, 2500);
    });

    onBeforeUnmount(() => window.clearInterval(timer));
</script>
