<template>
    <FluxPane>
        <FluxCardList columns="minmax(0, 1fr) 90px">
            <FluxCardListGroup :is-separated="false">
                <FluxCardListItem
                    v-for="name of PINNED"
                    :key="name">
                    <FluxText :weight="500">{{ name }}</FluxText>
                    <FluxText color="muted">Planned</FluxText>
                </FluxCardListItem>
            </FluxCardListGroup>

            <FluxCardListGroup>
                <FluxCardListItem
                    v-for="name of MATCHES"
                    :key="name"
                    :color="name === 'Daan Visser' ? 'success' : undefined">
                    <FluxText :weight="500">{{ name }}</FluxText>
                    <FluxText color="muted">Match</FluxText>
                </FluxCardListItem>
            </FluxCardListGroup>

            <FluxCardListGroup
                v-model:expanded="isRejectedOpen"
                icon="circle-exclamation"
                label="Does not match"
                is-collapsible>
                <FluxCardListItem
                    v-for="name of REJECTED"
                    :key="name">
                    <FluxText :weight="500">{{ name }}</FluxText>
                    <FluxText color="muted">Rejected</FluxText>
                </FluxCardListItem>
            </FluxCardListGroup>
        </FluxCardList>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxCardList, FluxCardListGroup, FluxCardListItem, FluxPane, FluxText } from '@flux-ui/components';
    import { ref } from 'vue';

    const PINNED = ['Anna de Vries', 'Jan Jansen'];
    const MATCHES = ['Sanne Bakker', 'Daan Visser', 'Lotte Smit'];
    const REJECTED = ['Pim Mulder', 'Eva Bos'];

    const isRejectedOpen = ref(false);
</script>
