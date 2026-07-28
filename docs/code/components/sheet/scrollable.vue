<template>
    <FluxSecondaryButton
        icon-leading="list-ul"
        label="Order history"
        @click="isSheetOpened = true"/>

    <FluxBottomSheet
        is-closeable
        :snap-points="[.85]"
        @close="isSheetOpened = false">
        <FluxPane v-if="isSheetOpened">
            <FluxPaneHeader title="Order history"/>

            <FluxItemStack>
                <FluxItem
                    v-for="order of orders"
                    :key="order.id">
                    <FluxItemContent>
                        <strong>{{ order.id }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ order.date }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <span>{{ order.total }}</span>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxSecondaryButton
                    label="Close"
                    @click="isSheetOpened = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxBottomSheet>
</template>

<script
    setup
    lang="ts">
    import { FluxBottomSheet, FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxPane, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import { ref } from 'vue';

    const orders = Array.from({length: 24}, (_, index) => ({
        id: `#${4820 - index}`,
        date: `March ${((index * 3) % 28) + 1}, 2025`,
        total: `€ ${(19 + index * 7).toFixed(2)}`
    }));

    const isSheetOpened = ref(false);
</script>
