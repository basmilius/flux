<template>
    <FluxPane style="width: 261px;">
        <FluxPaneBody>
            <FluxFlex
                align="start"
                direction="vertical"
                :gap="3">
                <span style="color: var(--gray-500); font-size: 13px; font-weight: 500;">Active users</span>

                <FluxSlotText
                    direction="up"
                    :text="value"
                    style="font-size: 33px; font-weight: 700; font-variant-numeric: tabular-nums;"/>
            </FluxFlex>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { FluxSlotText } from '@flux-ui/visuals';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const count = ref(12483);
    const value = ref(count.value.toLocaleString('en-US'));

    let timer: number;

    function tick(): void {
        count.value += Math.floor(Math.random() * 25) - 8;
        value.value = count.value.toLocaleString('en-US');
    }

    onMounted(() => {
        timer = window.setInterval(tick, 2000);
    });

    onBeforeUnmount(() => window.clearInterval(timer));
</script>
