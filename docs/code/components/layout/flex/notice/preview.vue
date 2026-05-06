<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxNoticeStack>
                    <FluxNotice
                        icon="truck"
                        color="success"
                        title="Order is being shipped!"
                        message="Your order has been shipped and should arrive soon."/>

                    <FluxNotice
                        icon="circle-exclamation"
                        color="warning"
                        title="It's very busy!"
                        message="We're currently experiencing the holiday rush, that means it's very busy right now. Your order might be delayed by 1-3 days."/>
                </FluxNoticeStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxNotice, FluxNoticeStack, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
