<template>
    <Preview>
        <FluxApplicationPageHeader
            style="width: 100%"
            title="Billing"
            description="Manage your subscription, payment methods and invoices.">
            <template #actions>
                <FluxSecondaryButton
                    icon-leading="arrow-up-from-square"
                    label="Export"/>

                <FluxPrimaryButton
                    icon-leading="plus"
                    label="Add payment method"/>
            </template>

            <FluxTabBar>
                <FluxTabBarItem
                    label="Overview"
                    :is-active="index === 0"
                    @click="index = 0"/>

                <FluxTabBarItem
                    label="Invoices"
                    :is-active="index === 1"
                    @click="index = 1"/>

                <FluxTabBarItem
                    label="Payment methods"
                    :is-active="index === 2"
                    @click="index = 2"/>
            </FluxTabBar>
        </FluxApplicationPageHeader>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationPageHeader } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
