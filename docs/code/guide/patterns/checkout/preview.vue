<template>
    <Preview>
        <FluxPane style="max-width: 540px">
            <FluxPaneHeader title="Checkout"/>

            <FluxPaneBody>
                <FluxStepperSteps
                    :amount="3"
                    :current="2"/>
            </FluxPaneBody>

            <FluxItemStack>
                <FluxItem
                    v-for="line in lines"
                    :key="line.id">
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            :name="line.icon"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ line.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ money(line.price) }} each</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxQuantitySelector
                            v-model="line.quantity"
                            :max="9"
                            :min="1"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>

            <FluxPaneBody>
                <FluxDescriptionList>
                    <FluxDescriptionItem label="Subtotal">{{ money(subtotal) }}</FluxDescriptionItem>
                    <FluxDescriptionItem label="Shipping">{{ money(shipping) }}</FluxDescriptionItem>
                    <FluxDescriptionItem label="Total">
                        <strong>{{ money(subtotal + shipping) }}</strong>
                    </FluxDescriptionItem>
                </FluxDescriptionList>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    icon-leading="angle-left"
                    label="Back"/>

                <FluxSpacer/>

                <FluxPrimaryButton
                    icon-leading="lock"
                    label="Pay now"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { FluxBoxedIcon, FluxDescriptionItem, FluxDescriptionList, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxQuantitySelector, FluxSecondaryButton, FluxSpacer, FluxStepperSteps } from '@flux-ui/components';
    import { computed, reactive } from 'vue';

    const shipping = 5;

    const lines = reactive<{ id: number; name: string; price: number; quantity: number; icon: FluxIconName }[]>([
        {id: 1, name: 'Mechanical keyboard', price: 129, quantity: 1, icon: 'laptop'},
        {id: 2, name: 'Wireless mouse', price: 49, quantity: 2, icon: 'box'},
        {id: 3, name: 'USB-C cable', price: 12, quantity: 3, icon: 'bolt'}
    ]);

    const subtotal = computed(() => lines.reduce((total, line) => total + line.price * line.quantity, 0));

    function money(value: number): string {
        return new Intl.NumberFormat('en', {currency: 'EUR', style: 'currency'}).format(value);
    }
</script>
