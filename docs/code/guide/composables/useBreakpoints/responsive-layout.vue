<template>
    <Preview>
        <FluxStack
            :direction="md ? 'horizontal' : 'vertical'"
            :gap="9">
            <FluxPane
                v-for="card in cards"
                :key="card.title"
                :style="md ? 'flex: 1' : 'width: 100%'">
                <FluxPaneBody>
                    <FluxStack :gap="6">
                        <strong>{{ card.title }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ card.description }}</span>
                    </FluxStack>
                </FluxPaneBody>
            </FluxPane>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxStack, useBreakpoints } from '@flux-ui/components';

    const {md} = useBreakpoints();

    const cards = [
        {title: 'Starter', description: 'For individuals.'},
        {title: 'Pro', description: 'For growing teams.'},
        {title: 'Enterprise', description: 'For large organizations.'}
    ];
</script>
