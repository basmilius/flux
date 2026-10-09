<template>
    <Preview>
        <FluxPane>
            <FluxCardList :columns="COLUMNS">
                <FluxCardListItem
                    v-for="candidate of CANDIDATES"
                    :key="candidate.id"
                    v-model:expanded="expanded[candidate.id]">
                    <FluxFlex
                        align="center"
                        :gap="12">
                        <FluxProgressRing
                            :color="candidate.coverage >= .8 ? 'success' : 'warning'"
                            :size="44"
                            :thickness="3"
                            :value="candidate.coverage">
                            <FluxAvatar
                                :alt="candidate.name"
                                :fallback-initials="candidate.initials"
                                :size="30"/>
                        </FluxProgressRing>

                        <FluxFlex
                            direction="vertical"
                            :gap="0">
                            <FluxText :weight="500">{{ candidate.name }}</FluxText>

                            <FluxText
                                color="muted"
                                size="small">
                                {{ Math.round(candidate.coverage * 100) }}% of the dayparts
                            </FluxText>
                        </FluxFlex>
                    </FluxFlex>

                    <FluxText
                        :color="candidate.route ? undefined : 'muted'"
                        size="small">
                        {{ candidate.route ?? 'Own location' }}
                    </FluxText>

                    <FluxFlex
                        align="center"
                        :gap="6">
                        <FluxIcon
                            name="location-dot"
                            :size="12"/>

                        <span>{{ candidate.distance }} km</span>
                    </FluxFlex>

                    <template #expandable>
                        <FluxText>
                            {{ candidate.name }} is available for {{ candidate.days }} of the requested days.
                        </FluxText>
                    </template>
                </FluxCardListItem>
            </FluxCardList>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxCardList, FluxCardListItem, FluxFlex, FluxIcon, FluxPane, FluxProgressRing, FluxText } from '@flux-ui/components';
    import { reactive } from 'vue';

    const COLUMNS = 'minmax(0, 2.4fr) minmax(0, 1.3fr) 90px';

    const CANDIDATES = [
        {id: 1, name: 'Anna de Vries', initials: 'AV', coverage: .92, route: null, distance: 4, days: 5},
        {id: 2, name: 'Jan Jansen', initials: 'JJ', coverage: .75, route: 'Board North', distance: 12, days: 3},
        {id: 3, name: 'Sanne Bakker', initials: 'SB', coverage: .6, route: null, distance: 9, days: 2}
    ];

    const expanded = reactive<Record<number, boolean>>({2: true});
</script>
