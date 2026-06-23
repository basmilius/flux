<template>
    <FluxApplicationContent layout="full">
        <FluxDataTable
            is-hoverable
            is-sticky
            :fill-columns="7"
            :items="visibleItems"
            :limits="[8, 16, 32]"
            :page="page"
            :per-page="perPage"
            :total="sortedItems.length"
            @limit="value => perPage = value"
            @navigate="value => page = value">
            <template #filter>
                <FluxTableBar>
                    <FluxFilterBar
                        v-model="filterState"
                        v-model:search="search"
                        is-searchable
                        search-placeholder="Search projects...">
                        <FluxFilterOptions
                            icon="circle-check"
                            label="Status"
                            name="status"
                            :options="statusOptions"/>
                        <FluxFilterDate
                            icon="calendar"
                            label="Due before"
                            name="due"/>
                    </FluxFilterBar>
                </FluxTableBar>
            </template>

            <template #header>
                <FluxTableHeader
                    is-sortable
                    :sort="sortKey === 'name' ? sortDir : undefined"
                    @sort="dir => setSort('name', dir)">
                    Project
                </FluxTableHeader>
                <FluxTableHeader>Client</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                <FluxTableHeader is-shrinking>Team</FluxTableHeader>
                <FluxTableHeader
                    is-shrinking
                    is-sortable
                    :sort="sortKey === 'progress' ? sortDir : undefined"
                    @sort="dir => setSort('progress', dir)">
                    Progress
                </FluxTableHeader>
                <FluxTableHeader
                    is-shrinking
                    is-sortable
                    :sort="sortKey === 'dueDate' ? sortDir : undefined"
                    @sort="dir => setSort('dueDate', dir)">
                    Due
                </FluxTableHeader>
                <FluxTableHeader is-shrinking/>
            </template>

            <template #name="{item}">
                <FluxTableCell>
                    <FluxContextMenu>
                        <RouterLink
                            class="project-name"
                            :to="{name: 'project', params: {id: item.id}}">
                            <FluxBoxedIcon
                                :color="item.color"
                                :name="item.icon"/>
                            <FluxFlex
                                direction="vertical"
                                :gap="2">
                                <strong>{{ item.name }}</strong>
                                <FluxText color="muted" size="small">{{ item.key }}</FluxText>
                            </FluxFlex>
                        </RouterLink>

                        <template #menu="{close}">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="arrow-right"
                                        label="Open"
                                        type="route"
                                        :to="{name: 'project', params: {id: item.id}}"
                                        @click="close()"/>
                                    <FluxMenuItem
                                        icon-leading="table-columns"
                                        label="Board"
                                        type="route"
                                        :to="{name: 'project-board', params: {id: item.id}}"
                                        @click="close()"/>
                                    <FluxMenuItem
                                        icon-leading="gear"
                                        label="Settings"
                                        type="route"
                                        :to="{name: 'project-settings', params: {id: item.id}}"
                                        @click="close()"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </template>
                    </FluxContextMenu>
                </FluxTableCell>
            </template>

            <template #client="{item}">
                <FluxTableCell>{{ clientName(item.clientId) }}</FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <StatusBadge :meta="PROJECT_STATUS[item.status]"/>
                </FluxTableCell>
            </template>

            <template #team="{item}">
                <FluxTableCell>
                    <MemberAvatarGroup
                        :ids="item.memberIds"
                        :max="4"
                        :size="27"/>
                </FluxTableCell>
            </template>

            <template #progress="{item}">
                <FluxTableCell>
                    <FluxFlex
                        align="center"
                        class="progress"
                        :gap="9">
                        <FluxProgressBar
                            :color="item.color"
                            :max="100"
                            :value="item.progress"/>
                        <FluxText
                            class="progress-value"
                            color="muted"
                            tabular>{{ item.progress }}%</FluxText>
                    </FluxFlex>
                </FluxTableCell>
            </template>

            <template #due="{item}">
                <FluxTableCell>{{ item.dueDate.toFormat('LLL d, yyyy') }}</FluxTableCell>
            </template>

            <template #actions="{item}">
                <FluxTableCell>
                    <FluxTableActions>
                        <FluxTooltip content="Open project">
                            <FluxAction
                                icon="arrow-right"
                                type="route"
                                :to="{name: 'project', params: {id: item.id}}"/>
                        </FluxTooltip>
                    </FluxTableActions>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxAction, FluxBoxedIcon, FluxContextMenu, FluxDataTable, FluxFilterBar, FluxFilterDate, FluxFilterOptions, FluxFlex, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxProgressBar, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxText, FluxTooltip } from '@flux-ui/components';
    import type { FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import type { DateTime } from 'luxon';
    import { computed, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import MemberAvatarGroup from '@/component/MemberAvatarGroup.vue';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { defineTitle } from '@/composable';
    import { useClientsStore, useProjectsStore } from '@/store';
    import type { Id } from '@/types';
    import { PROJECT_STATUS } from '@/util';

    type SortKey = 'name' | 'progress' | 'dueDate';

    defineTitle('diagram-project', 'Projects');

    const {projects} = useProjectsStore();
    const {getClient} = useClientsStore();

    const search = ref('');
    const filterState = ref<FluxFilterState>({status: [], due: null});
    const sortKey = ref<SortKey>('name');
    const sortDir = ref<'ascending' | 'descending'>('ascending');
    const page = ref(1);
    const perPage = ref(8);

    const statusOptions: FluxFilterOptionItem[] = [
        {label: 'Planning', value: 'planning'},
        {label: 'Active', value: 'active'},
        {label: 'On hold', value: 'on-hold'},
        {label: 'Completed', value: 'completed'}
    ];

    const filteredItems = computed(() => projects.value.filter(project => {
        const status = filterState.value.status;
        const matchesStatus = !Array.isArray(status) || status.length === 0 || status.includes(project.status);

        const due = filterState.value.due;
        const matchesDue = due === null || due === undefined || project.dueDate <= (due as DateTime);

        const matchesSearch = search.value === '' || project.name.toLowerCase().includes(search.value.toLowerCase());
        return matchesStatus && matchesDue && matchesSearch;
    }));

    const sortedItems = computed(() => [...filteredItems.value].sort((a, b) => {
        let result = 0;

        if (sortKey.value === 'name') {
            result = a.name.localeCompare(b.name);
        } else if (sortKey.value === 'progress') {
            result = a.progress - b.progress;
        } else {
            result = a.dueDate.toMillis() - b.dueDate.toMillis();
        }

        return sortDir.value === 'ascending' ? result : -result;
    }));

    const visibleItems = computed(() => sortedItems.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));

    function setSort(key: SortKey, dir: 'ascending' | 'descending'): void {
        sortKey.value = key;
        sortDir.value = dir;
    }

    function clientName(clientId: Id): string {
        return getClient(clientId)?.name ?? 'Unknown client';
    }
</script>

<style scoped>
    .project-name {
        display: flex;
        align-items: center;
        gap: 12px;
        color: inherit;
        text-decoration: none;
    }

    .progress {
        min-width: 144px;
    }

    .progress > :first-child {
        flex: 1;
    }

    .progress-value {
        width: 39px;
        text-align: right;
    }
</style>
