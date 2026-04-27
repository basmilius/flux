# Filterable data table

A `FluxDataTable` driven by a `FluxFilterBar`, with server-side pagination and persisted filter state. This is the recipe for any "list of entities with search and filters" view.

## Anatomy

Three building blocks:

1. **Filter state** — a `Record<string, FluxFilterValue>` that lives in your component (or a Pinia store).
2. **Filter bar** — renders the filter controls and writes back into the state.
3. **Data table** — receives the items for the current page; you fetch them whenever the state changes.

## Component

```vue [Projects.vue]
<template>
    <FluxFilterBar
        v-model:state="filterState"
        :filters="filters"/>

    <FluxDataTable
        unique-key="id"
        :items="items"
        :limits="[25, 50, 100]"
        :page="page"
        :per-page="perPage"
        :total="total"
        :is-loading="isLoading"
        @limit="onLimit"
        @navigate="onNavigate">
        <template #header>
            <FluxTableHeader label="Name"/>
            <FluxTableHeader label="Status"/>
            <FluxTableHeader label="Created on"/>
        </template>

        <template #default="{item}">
            <FluxTableCell>{{ item.name }}</FluxTableCell>
            <FluxTableCell>
                <FluxBadge :color="item.status === 'active' ? 'success' : 'gray'">
                    {{ item.status }}
                </FluxBadge>
            </FluxTableCell>
            <FluxTableCell>{{ item.createdOn.toFormat('dd LLL yyyy') }}</FluxTableCell>
        </template>
    </FluxDataTable>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxDataTable, FluxFilterBar, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import type { FluxFilterItem, FluxFilterState } from '@flux-ui/types';
    import { ref, watch } from 'vue';
    import { fetchProjects } from './api';

    const filterState = ref<FluxFilterState>({});
    const filters: FluxFilterItem[] = [
        {
            type: 'options',
            name: 'status',
            label: 'Status',
            icon: 'circle-dot',
            getValueLabel: async value => Array.isArray(value) ? value.join(', ') : null
        },
        {
            type: 'dateRange',
            name: 'createdOn',
            label: 'Created on',
            icon: 'calendar',
            getValueLabel: async () => null
        }
    ];

    const items = ref<Project[]>([]);
    const total = ref(0);
    const page = ref(1);
    const perPage = ref(25);
    const isLoading = ref(false);

    function onLimit(limit: number): void {
        perPage.value = limit;
        page.value = 1;
    }

    function onNavigate(next: number): void {
        page.value = next;
    }

    watch([filterState, page, perPage], async () => {
        isLoading.value = true;

        try {
            const result = await fetchProjects({
                filters: filterState.value,
                page: page.value,
                perPage: perPage.value
            });

            items.value = result.items;
            total.value = result.total;
        } finally {
            isLoading.value = false;
        }
    }, {immediate: true, deep: true});
</script>
```

## Server-side pagination

`FluxDataTable` is built around server-side pagination. Pass only the rows for the current page via `items`, and use the `page` / `per-page` / `total` props to drive the pagination bar. The component never slices the array itself.

The `limit` and `navigate` events fire when the user changes the page size or paginates. Update your local state in those handlers and re-fetch.

## Persisting filter state

To keep filters across navigations, lift `filterState` into a Pinia store or sync it with the URL:

```ts
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const filterState = ref<FluxFilterState>(JSON.parse(route.query.filters as string ?? '{}'));

watch(filterState, value => {
    router.replace({query: {...route.query, filters: JSON.stringify(value)}});
}, {deep: true});
```

## Combine with row actions

Each row can expose contextual actions through `FluxTableActions` — pass a `FluxFlyout` with a menu, or a single `FluxSecondaryButton` for primary actions. Use the `index` slot binding (`{ item, index }`) to identify the row that triggered the action.
