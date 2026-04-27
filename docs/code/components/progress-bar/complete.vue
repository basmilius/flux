<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxProgressBar
                :status="status"
                :value="value"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxProgressBar } from '@flux-ui/components';
    import { ref, unref, onMounted, onUnmounted } from 'vue';

    const timer = ref<NodeJS.Timeout>();
    const status = ref('Preparing...');
    const value = ref(0);

    async function playbook(): Promise<void> {
        status.value = 'Preparing...';
        value.value = 0;

        await wait(600);
        await tween(0.2);

        status.value = 'Downloading...';
        await wait(300);
        await tween(0.7);

        status.value = 'Unzipping...';
        await wait(600);
        await tween(1);

        status.value = 'Done.';

        await wait(1500);
        requestAnimationFrame(playbook);
    }

    async function tween(percentage: number): Promise<void> {
        for (let p = unref(value); p <= percentage; p += 0.001) {
            value.value = p;
            await wait(Math.random() * 6 + 3);
        }

        value.value = percentage;
    }

    async function wait(ms: number): Promise<void> {
        await new Promise(resolve => timer.value = setTimeout(resolve, ms));
    }

    onMounted(async () => await playbook());
    onUnmounted(() => clearTimeout(unref(timer)));
</script>
