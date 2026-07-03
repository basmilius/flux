<template>
    <FluxPane style="width: min(100%, 480px)">
        <FluxItemStack>
            <FluxItem
                v-for="transaction in transactions"
                :key="transaction.merchant">
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        :color="transaction.isIncome ? 'success' : 'gray'"
                        :name="transaction.isIncome ? 'arrow-trend-up' : 'arrow-trend-down'"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>{{ transaction.merchant }}</strong>
                    <span style="font-size: .875rem; opacity: .6">{{ transaction.date }}</span>
                </FluxItemContent>

                <FluxItemContent
                    is-center
                    style="flex-grow: 0; text-align: right">
                    <strong :style="{color: transaction.isIncome ? 'var(--success-600)' : undefined}">{{ transaction.amount }}</strong>
                </FluxItemContent>
            </FluxItem>
        </FluxItemStack>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBoxedIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';

    const transactions = [
        {merchant: 'Acme Inc.', date: 'June 14, 2026', amount: '+€2,400.00', isIncome: true},
        {merchant: 'Coffee Roasters', date: 'June 13, 2026', amount: '-€4.80', isIncome: false},
        {merchant: 'Cloud Hosting', date: 'June 12, 2026', amount: '-€19.99', isIncome: false}
    ];
</script>
