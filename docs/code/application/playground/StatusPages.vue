<template>
    <div :class="$style.statusGrid">
        <div :class="$style.box">
            <FluxApplicationStatusPage
                code="404"
                variant="not-found">
                <template #actions>
                    <FluxSecondaryButton
                        icon-leading="magnifying-glass"
                        label="Search Harbor"
                        @click="onAction('Opening search...')"/>

                    <FluxPrimaryButton
                        icon-leading="house"
                        label="Back to the overview"
                        @click="onAction('Going back to the overview...')"/>
                </template>
            </FluxApplicationStatusPage>
        </div>

        <div :class="$style.box">
            <FluxApplicationStatusPage
                code="500"
                description="The rate engine did not answer in time. Nothing was charged and nothing was shipped."
                variant="error">
                <template #actions>
                    <FluxSecondaryButton
                        label="Copy the error id"
                        @click="onAction('Copied 7b90f6e2 to the clipboard')"/>

                    <FluxPrimaryButton
                        :icon-leading="isRetrying ? undefined : 'rotate'"
                        :is-loading="isRetrying"
                        label="Try again"
                        @click="onRetryClick()"/>
                </template>
            </FluxApplicationStatusPage>
        </div>

        <div :class="$style.box">
            <FluxApplicationStatusPage
                description="Harbor is back at 02:00 CET. Orders that came in through the API are queued and will be picked up automatically."
                title="Down for maintenance until 02:00"
                variant="maintenance">
                <template #actions>
                    <FluxSecondaryButton
                        icon-leading="arrow-up-right-from-square"
                        label="Status page"
                        @click="onAction('Opening the status page...')"/>
                </template>
            </FluxApplicationStatusPage>
        </div>

        <div :class="$style.box">
            <FluxApplicationStatusPage variant="offline">
                <p>Harbor keeps the last twenty scans it loaded, so the shipments you already opened stay readable while you are offline.</p>

                <template #actions>
                    <FluxPrimaryButton
                        icon-leading="rotate"
                        label="Reconnect"
                        @click="onAction('Reconnecting...')"/>
                </template>
            </FluxApplicationStatusPage>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationStatusPage } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const isRetrying = ref(false);

    function onAction(message: string): void {
        showSnackbar({message});
    }

    function onRetryClick(): void {
        isRetrying.value = true;

        setTimeout(() => {
            isRetrying.value = false;
            showSnackbar({message: 'The rate engine is still not answering.'});
        }, 1500);
    }
</script>

<style
    lang="scss"
    module>
    .statusGrid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        min-height: 100dvh;
        padding: 21px;
        gap: 21px;
    }

    @media (width < 1008px) {
        .statusGrid {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    // The status page centers itself in whatever it gets, so the box owns the height.
    .box {
        display: flex;
        min-height: 480px;
        flex-flow: column;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
        overflow: hidden;
    }
</style>
