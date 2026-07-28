<template>
    <FluxFlex
        direction="vertical"
        :gap="12"
        style="width: 100%">
        <FluxAiToolCall
            :arguments="{filters: {status: 'paid', year: 2026}, sort: 'total'}"
            :duration="0.6"
            is-expanded
            name="search_invoices"
            result="18 invoices"/>

        <FluxAiToolCall
            arguments='{"filters": {"status": "paid"'
            :duration="0.1"
            is-expanded
            name="search_invoices"
            result="the model stopped mid argument"
            status="error"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';
    import { FluxFlex } from '@flux-ui/components';
</script>
