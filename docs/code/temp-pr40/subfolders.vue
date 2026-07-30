<template>
    <FluxFlex direction="column">
        <FluxInfo color="warning">
            <strong>What to look for.</strong>
            One component from each of the four moved directories, plus two that reach across them. Everything must render and stay interactive: a broken relative import after the move shows up as a missing component, not as a build error.
        </FluxInfo>

        <FluxGrid :columns="2">
            <FluxPane>
                <FluxPaneHeader title="form/ (35 components)"/>
                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <FluxFormField label="Input with a suffix">
                            <FluxFormInputGroup>
                                <FluxFormInput v-model="text"/>
                                <FluxFormInputAddition label=".com"/>
                            </FluxFormInputGroup>
                        </FluxFormField>

                        <FluxFormField label="Select">
                            <FluxFormSelect
                                v-model="selected"
                                :options="options"/>
                        </FluxFormField>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="menu/ (9 components)"/>
                <FluxPaneBody>
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon="pen"
                                label="Edit"/>
                            <FluxMenuItem
                                icon="trash"
                                label="Delete"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="table/ (8 components)"/>
                <FluxPaneBody>
                    <FluxTable>
                        <template #header>
                            <FluxTableRow>
                                <FluxTableHeader label="Name"/>
                                <FluxTableHeader label="Role"/>
                            </FluxTableRow>
                        </template>

                        <FluxTableRow>
                            <FluxTableCell>Bas</FluxTableCell>
                            <FluxTableCell>Author</FluxTableCell>
                        </FluxTableRow>
                    </FluxTable>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="Cross-directory: date picker in a flyout"/>
                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <FluxFormField label="Date (form/ reaching calendar/)">
                            <FluxFormDateInput v-model="date"/>
                        </FluxFormField>

                        <span>The picker lives in the top level and is reached from <code>form/</code>.</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxGrid>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxFormDateInput, FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxFormSelect, FluxGrid, FluxInfo, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxPaneHeader, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const date = ref(DateTime.now());
    const selected = ref('a');
    const text = ref('flux-ui');

    const options = [
        {label: 'First', value: 'a'},
        {label: 'Second', value: 'b'}
    ];
</script>
