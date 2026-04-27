<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="9">
            <FluxClickablePane
                v-for="item in items"
                :key="item.title"
                type="button"
                style="width: 200px">
                <FluxPaneBody>
                    <FluxStack :gap="3">
                        <strong>{{ item.title }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ item.description }}</span>
                    </FluxStack>
                </FluxPaneBody>
            </FluxClickablePane>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePane, FluxPaneBody, FluxStack } from '@flux-ui/components';

    const items = [
        {title: 'Starter', description: 'For individuals and small teams.'},
        {title: 'Pro', description: 'For growing teams with more needs.'},
        {title: 'Enterprise', description: 'For large organizations.'}
    ];
</script>
