<template>
    <Preview>
        <FluxPane>
            <FluxTable is-hoverable>
                <FluxTableRow
                    v-for="person in dataSet"
                    :key="person.id"
                    is-clickable
                    @row-click="columnIndex => onRowClick(person, columnIndex)">
                    <FluxTableCell content-direction="column">
                        <strong>{{ person.name }}</strong>
                        <small>{{ person.email }}</small>
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxTableActions>
                            <FluxSecondaryButton
                                label="Email"
                                @click="onEmail(person)"/>
                        </FluxTableActions>
                    </FluxTableCell>
                </FluxTableRow>
            </FluxTable>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxSecondaryButton, FluxTable, FluxTableActions, FluxTableCell, FluxTableRow, showSnackbar } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { computed } from 'vue';

    type Person = {
        readonly id: number;
        readonly name: string;
        readonly email: string;
    };

    const dataSet = computed<Person[]>(() => Array(3)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: faker.person.fullName(),
            email: faker.internet.email()
        })));

    function onRowClick(person: Person, columnIndex: number): void {
        showSnackbar({
            icon: 'user',
            message: `You clicked ${person.name} in column ${columnIndex}.`
        });
    }

    function onEmail(person: Person): void {
        showSnackbar({
            color: 'info',
            icon: 'paper-plane',
            message: `Composing an email to ${person.email}.`
        });
    }
</script>
