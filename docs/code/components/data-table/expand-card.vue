<template>
    <FluxPane>
        <FluxDataTable
            v-model:expanded="expanded"
            :group-by="item => item.isPinned ? 'pinned' : 'rest'"
            :is-expand-loading="item => loading.has(item.id)"
            :items="dataSet"
            expand-style="card"
            expand-trigger="row"
            unique-key="id"
            is-hoverable
            @row-intent="item => load(item.id)">
            <template #header>
                <FluxTableHeader>Person</FluxTableHeader>
                <FluxTableHeader :min-width="120">Route</FluxTableHeader>
                <FluxTableHeader is-shrinking>Distance</FluxTableHeader>
            </template>

            <template #group="{id}">
                <FluxTableSeparator v-if="id === 'rest'"/>
            </template>

            <template #person="{item}">
                <FluxTableCell content-direction="column">
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.status }}</small>
                </FluxTableCell>
            </template>

            <template #route="{item}">
                <FluxTableCell>{{ item.route }}</FluxTableCell>
            </template>

            <template #distance="{item}">
                <FluxTableCell
                    is-numeric
                    no-wrap>
                    {{ item.distance }}
                </FluxTableCell>
            </template>

            <template #expandable="{item}">
                <FluxDescriptionList>
                    <FluxDescriptionItem label="Name">
                        {{ item.name }}
                    </FluxDescriptionItem>

                    <FluxDescriptionItem label="Availability">
                        {{ item.availability }}
                    </FluxDescriptionItem>

                    <FluxDescriptionItem label="Last planned">
                        {{ item.lastPlanned }}
                    </FluxDescriptionItem>
                </FluxDescriptionList>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxDescriptionItem, FluxDescriptionList, FluxPane, FluxTableCell, FluxTableHeader, FluxTableSeparator } from '@flux-ui/components';
    import { ref, watch } from 'vue';

    const dataSet = [
        {id: 1, name: 'Jos Verhoeven', status: 'Planned', route: 'Own pool', distance: '4.2 km', isPinned: true, availability: 'Mon to Fri', lastPlanned: '12 Sep'},
        {id: 2, name: 'Marieke de Bruin', status: 'Match', route: 'North board', distance: '7.8 km', isPinned: false, availability: 'Mon, Tue, Thu', lastPlanned: '3 Oct'},
        {id: 3, name: 'Tim Koster', status: 'Match', route: 'Own pool', distance: '11 km', isPinned: false, availability: 'Wed to Fri', lastPlanned: '28 Sep'},
        {id: 4, name: 'Sanne Aarts', status: 'Limited', route: 'Own pool', distance: '13 km', isPinned: false, availability: 'Tue, Wed', lastPlanned: '19 Sep'}
    ];

    const expanded = ref<number[]>([2]);
    const loaded = new Set<number>([2]);
    const loading = ref(new Set<number>());

    watch(expanded, ids => ids.forEach(load));

    // Stands in for a request: hovering a row starts it, so the click often finds it done.
    function load(id: number): void {
        if (loaded.has(id) || loading.value.has(id)) {
            return;
        }

        loading.value.add(id);

        setTimeout(() => {
            loaded.add(id);
            loading.value.delete(id);
        }, 800);
    }
</script>
