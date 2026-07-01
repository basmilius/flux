<template>
    <Preview>
        <FluxPane>
            <FluxDataTable
                :items="dataSet"
                :limits="[]"
                :page="1"
                :per-page="5"
                :total="dataSet.length"
                is-hoverable
                @row-click="onRowClick">
                <template #header>
                    <FluxTableHeader>
                        Person
                    </FluxTableHeader>

                    <FluxTableHeader>
                        Role
                    </FluxTableHeader>

                    <FluxTableHeader is-shrinking/>
                </template>

                <template #name="{item: {name, email}}">
                    <FluxTableCell content-direction="column">
                        <strong>{{ name }}</strong>
                        <small>{{ email }}</small>
                    </FluxTableCell>
                </template>

                <template #role="{item: {role}}">
                    <FluxTableCell>
                        {{ role }}
                    </FluxTableCell>
                </template>

                <template #actions="{item}">
                    <FluxTableCell>
                        <FluxTableActions>
                            <FluxSecondaryButton
                                label="Email"
                                @click="onEmail(item)"/>
                        </FluxTableActions>
                    </FluxTableCell>
                </template>
            </FluxDataTable>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxDataTable, FluxPane, FluxSecondaryButton, FluxTableActions, FluxTableCell, FluxTableHeader, showSnackbar } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { computed } from 'vue';

    type Person = {
        readonly id: number;
        readonly name: string;
        readonly email: string;
        readonly role: string;
    };

    const dataSet = computed<Person[]>(() => Array(5)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.person.jobTitle()
        })));

    function onRowClick(item: Person, columnIndex: number): void {
        showSnackbar({
            icon: 'user',
            message: `You clicked ${item.name} in column ${columnIndex}.`
        });
    }

    function onEmail(item: Person): void {
        showSnackbar({
            color: 'info',
            icon: 'paper-plane',
            message: `Composing an email to ${item.email}.`
        });
    }
</script>
