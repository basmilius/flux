<template>
    <FluxButtonStack v-if="invoice">
        <FluxSecondaryButton
            icon-leading="download"
            label="Download"
            @click="onDownload()"/>

        <FluxSecondaryButton
            icon-leading="pen"
            label="Edit"
            type="route"
            :to="{name: 'invoice-edit', params: {id: invoice.id}}"/>

        <FluxSecondaryButton
            v-if="invoice.status === 'draft'"
            icon-leading="paper-plane"
            label="Send"
            @click="onSend()"/>

        <FluxPrimaryButton
            v-if="invoice.status !== 'paid'"
            icon-leading="circle-check"
            label="Mark as paid"
            @click="onMarkPaid()"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSecondaryButton, showConfirm, showSnackbar } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useInvoicesStore } from '@/store';

    const route = useRoute();
    const {getInvoice, markAsPaid, send} = useInvoicesStore();

    const invoice = computed(() => getInvoice(String(route.params.id)));

    async function onMarkPaid(): Promise<void> {
        if (!invoice.value) {
            return;
        }

        const confirmed = await showConfirm({
            icon: 'circle-check',
            title: 'Mark as paid',
            message: `Mark ${invoice.value.number} as paid?`
        });

        if (confirmed) {
            markAsPaid(invoice.value.id);
            await showSnackbar({color: 'success', icon: 'circle-check', message: `${invoice.value.number} marked as paid.`});
        }
    }

    async function onSend(): Promise<void> {
        if (!invoice.value) {
            return;
        }

        send(invoice.value.id);
        await showSnackbar({color: 'success', icon: 'paper-plane', message: `${invoice.value.number} sent to the client.`});
    }

    async function onDownload(): Promise<void> {
        await showSnackbar({icon: 'circle-info', message: 'PDF download is not available in this demo.'});
    }
</script>
