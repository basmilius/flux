<template>
    <Preview>
        <FluxFlex :gap="9">
            <FluxClickablePane
                v-for="item in items"
                :key="item.title"
                type="button"
                :disabled="item.disabled"
                style="width: 200px">
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="3">
                        <strong>{{ item.title }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ item.description }}</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxClickablePane>
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePane, FluxFlex, FluxPaneBody } from '@flux-ui/components';

    const items = [
        {title: 'Starter', description: 'For individuals and small teams.', disabled: false},
        {title: 'Pro', description: 'Currently unavailable.', disabled: true},
        {title: 'Enterprise', description: 'For large organizations.', disabled: false}
    ];
</script>
