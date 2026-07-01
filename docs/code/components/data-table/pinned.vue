<template>
    <FluxPane>
        <FluxDataTable
            v-model:selected="selected"
            :items="dataSet"
            :limits="[]"
            :page="1"
            :per-page="dataSet.length"
            selection-mode="multiple"
            :total="dataSet.length"
            unique-key="id"
            is-hoverable>
            <template #header>
                <FluxTableHeader
                    pinned
                    :width="200">
                    Person
                </FluxTableHeader>

                <FluxTableHeader :width="160">Role</FluxTableHeader>
                <FluxTableHeader :width="170">Department</FluxTableHeader>
                <FluxTableHeader :width="170">Location</FluxTableHeader>
                <FluxTableHeader :width="150">Start date</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    pinned="end"
                    :width="150">
                    Salary
                </FluxTableHeader>
            </template>

            <template #name="{item: {name, email}}">
                <FluxTableCell
                    pinned
                    content-direction="column">
                    <strong>{{ name }}</strong>
                    <small>{{ email }}</small>
                </FluxTableCell>
            </template>

            <template #role="{item: {role}}">
                <FluxTableCell>{{ role }}</FluxTableCell>
            </template>

            <template #department="{item: {department}}">
                <FluxTableCell>{{ department }}</FluxTableCell>
            </template>

            <template #location="{item: {location}}">
                <FluxTableCell>{{ location }}</FluxTableCell>
            </template>

            <template #startDate="{item: {startDate}}">
                <FluxTableCell>{{ startDate }}</FluxTableCell>
            </template>

            <template #salary="{item: {salary}}">
                <FluxTableCell
                    align="end"
                    pinned="end"
                    is-numeric>
                    {{ salary }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { computed, ref } from 'vue';

    const selected = ref<number[]>([]);

    const dataSet = computed(() => Array(6)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.person.jobTitle(),
            department: faker.commerce.department(),
            location: `${faker.location.city()}, ${faker.location.countryCode()}`,
            startDate: faker.date.past().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}),
            salary: `€ ${faker.number.int({min: 42, max: 128}) * 1000}`
        })));
</script>
