<template>
    <Preview>
        <FluxFlex
            :direction="md ? 'horizontal' : 'vertical'"
            :gap="9">
            <FluxPane
                v-for="card in cards"
                :key="card.title"
                :style="md ? 'flex: 1' : 'width: 100%'">
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="6">
                        <strong>{{ card.title }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ card.description }}</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxPaneBody, useBreakpoints } from '@flux-ui/components';

    const {md} = useBreakpoints();

    const cards = [
        {title: 'Starter', description: 'For individuals.'},
        {title: 'Pro', description: 'For growing teams.'},
        {title: 'Enterprise', description: 'For large organizations.'}
    ];
</script>
