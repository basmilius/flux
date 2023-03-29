<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-pane>
                    <flux-action-bar>
                        <template #primary>
                            <flux-primary-button
                                icon-before="circle-plus"
                                label="Event"/>
                        </template>

                        <template #filter>
                            <flux-pane-body>
                                Filter contents.
                            </flux-pane-body>
                        </template>

                        <template #search>
                            <flux-form-input
                                type="search"
                                placeholder="Search anything..."/>
                        </template>
                    </flux-action-bar>

                    <flux-data-table
                        :data-set="dataSet.slice((page - 1) * perPage, (page * perPage))"
                        :page="page"
                        :per-page="perPage"
                        :total="dataSet.length"
                        is-hoverable>
                        <template #header>
                            <flux-table-header>Name</flux-table-header>
                            <flux-table-header>Email</flux-table-header>
                            <flux-table-header is-shrinking>Status</flux-table-header>
                            <flux-table-header is-shrinking/>
                        </template>

                        <template #name="{name}">
                            <flux-table-cell>{{ name }}</flux-table-cell>
                        </template>

                        <template #email="{email}">
                            <flux-table-cell>{{ email }}</flux-table-cell>
                        </template>

                        <template #isActive="{isActive}">
                            <flux-table-cell>
                                <flux-badge-stack>
                                    <flux-badge
                                        v-if="isActive"
                                        color="success"
                                        icon="circle-check"
                                        label="Active"/>


                                    <flux-badge
                                        v-else
                                        color="danger"
                                        icon="circle-xmark"
                                        label="Inactive"/>
                                </flux-badge-stack>
                            </flux-table-cell>
                        </template>

                        <template #actions="{}">
                            <flux-table-cell>
                                <flux-table-actions>
                                    <flux-table-action icon="pen"/>
                                    <flux-table-action icon="ellipsis-h"/>
                                </flux-table-actions>
                            </flux-table-cell>
                        </template>
                    </flux-data-table>
                    <flux-pane-footer>
                        <flux-pagination-bar
                            :page="page"
                            :per-page="perPage"
                            :total="dataSet.length"
                            @limit="setPerPage"
                            @navigate="setPage"/>
                    </flux-pane-footer>
                </flux-pane>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxBadge, FluxBadgeStack, FluxDataTable, FluxFormInput, FluxPaginationBar, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxStack, FluxTableAction, FluxTableActions, FluxTableCell, FluxTableHeader } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
    import { computed, ref } from 'vue';

    const dataSet = computed(() => Array(95).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));

    const page = ref(1);
    const perPage = ref(5);

    function setPage(p: number): void {
        page.value = p;
    }

    function setPerPage(limit: number): void {
        perPage.value = limit;
    }
</script>
