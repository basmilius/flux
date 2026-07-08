<template>
    <FluxFlex :gap="9">
        <FluxClickablePane
            v-for="item in items"
            :key="item.variant"
            type="button"
            :variant="item.variant"
            style="width: 180px">
            <FluxPaneBody>
                <FluxFlex
                    direction="vertical"
                    :gap="3">
                    <strong>{{ item.title }}</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        {{ item.variant }}
                    </FluxText>
                </FluxFlex>
            </FluxPaneBody>
        </FluxClickablePane>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePane, FluxFlex, FluxPaneBody, FluxText } from '@flux-ui/components';

    const items: {title: string; variant: 'default' | 'flat' | 'well'}[] = [
        {title: 'Default', variant: 'default'},
        {title: 'Flat', variant: 'flat'},
        {title: 'Well', variant: 'well'}
    ];
</script>
