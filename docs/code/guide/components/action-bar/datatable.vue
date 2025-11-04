<template>
    <FluxPane>
        <FluxPaneHeader title="Iphone's"/>

        <FluxActionBar>
            <template #primary>
                <FluxFormInput
                    v-model="searchQuery"
                    type="search"
                    icon-leading="magnifying-glass"
                    placeholder="Search anything..."/>
            </template>

            <template #filter>
                <FluxPaneBody>
                    Filter contents.
                </FluxPaneBody>
            </template>

            <template #filterOpener="{open}">
                <FluxSecondaryButton
                    icon-leading="filter"
                    @click="open()"/>
            </template>
        </FluxActionBar>

        <FluxDataTable
            :items="filteredItems"
            :total="items.length"
            :page="1"
            :per-page="5"
            :limits="[5, 10, 25, 50]"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader>Price</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
            </template>

            <template #name="{item: {name}}">
                <FluxTableCell>{{ name }}</FluxTableCell>
            </template>

            <template #price="{item: {price}}">
                <FluxTableCell>€ {{ price }}</FluxTableCell>
            </template>

            <template #inStock="{item: {inStock}}">
                <FluxTableCell>
                    <FluxBadgeStack>
                        <FluxBadge
                            v-if="inStock"
                            color="success"
                            icon="circle-check"
                            label="In stock"/>

                        <FluxBadge
                            v-else
                            color="danger"
                            icon="circle-xmark"
                            label="Not in stock"/>
                    </FluxBadgeStack>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { ref, computed } from 'vue';
    import { FluxActionBar, FluxBadge, FluxBadgeStack, FluxDataTable, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    const searchQuery = ref('');
    const items = computed(() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Apple Iphone ${10 + index}`,
        price: (900 + index * 100),
        inStock: index % 2 === 0
    })));

    const filteredItems = computed(() => {
        if (!searchQuery.value) {
            return items.value;
        }

        return items.value.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
</script>
