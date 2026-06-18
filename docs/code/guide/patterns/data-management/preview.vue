<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <template #header>
                    <FluxTableRow>
                        <FluxTableHeader is-shrinking>
                            <FluxFormCheckbox
                                :model-value="allSelected"
                                @update:model-value="toggleAll"/>
                        </FluxTableHeader>

                        <FluxTableHeader>Product</FluxTableHeader>
                        <FluxTableHeader>Labels</FluxTableHeader>
                        <FluxTableHeader is-sortable>Stock</FluxTableHeader>
                        <FluxTableHeader>Status</FluxTableHeader>
                        <FluxTableHeader is-shrinking/>
                    </FluxTableRow>
                </template>

                <FluxTableBar v-if="selectedCount > 0">
                    <FluxFlex align="center">
                        <FluxIcon name="circle-check"/>

                        <FluxFlexItem :grow="1">
                            <span>{{ selectedCount }} selected</span>
                        </FluxFlexItem>

                        <FluxSplitButton>
                            <template #button>
                                <FluxSecondaryButton
                                    icon-leading="arrow-up-from-square"
                                    label="Export"/>
                            </template>

                            <template #flyout>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="copy"
                                            label="Duplicate"
                                            type="button"/>

                                        <FluxMenuItem
                                            icon-leading="box"
                                            label="Archive"
                                            type="button"/>
                                    </FluxMenuGroup>

                                    <FluxSeparator/>

                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="trash"
                                            is-destructive
                                            label="Delete"
                                            type="button"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </template>
                        </FluxSplitButton>

                        <FluxDestructiveButton
                            icon-leading="trash"
                            label="Delete"/>
                    </FluxFlex>
                </FluxTableBar>

                <FluxTableRow
                    v-for="product in products"
                    :key="product.id">
                    <FluxTableCell>
                        <FluxFormCheckbox v-model="product.selected"/>
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxFlex align="center">
                            <FluxBoxedIcon name="box"/>

                            <FluxFlex
                                direction="vertical"
                                :gap="0">
                                <FluxInlineEdit v-model="product.name"/>
                                <small style="opacity: .6">{{ product.sku }}</small>
                            </FluxFlex>
                        </FluxFlex>
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxTagStack>
                            <FluxTag :label="product.category"/>

                            <FluxChip
                                v-if="product.isNew"
                                icon-leading="sparkles"
                                label="New"/>
                        </FluxTagStack>
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxQuantitySelector
                            v-model="product.stock"
                            :max="999"
                            :min="0"/>
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxBadge
                            :color="STATUS[product.status].color"
                            :label="STATUS[product.status].label"/>
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxTableActions>
                            <FluxAction icon="pen"/>
                            <FluxAction icon="ellipsis-h"/>
                        </FluxTableActions>
                    </FluxTableCell>
                </FluxTableRow>
            </FluxTable>

            <FluxPaneFooter>
                <FluxPaginationBar
                    :page="1"
                    :per-page="10"
                    :total="48"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { FluxAction, FluxBadge, FluxBoxedIcon, FluxChip, FluxDestructiveButton, FluxFlex, FluxFlexItem, FluxFormCheckbox, FluxIcon, FluxInlineEdit, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneFooter, FluxPaginationBar, FluxQuantitySelector, FluxSecondaryButton, FluxSeparator, FluxSplitButton, FluxTable, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTag, FluxTagStack } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { computed, reactive } from 'vue';

    type Status = 'active' | 'draft' | 'archived';

    const STATUS: Record<Status, { color: FluxColor; label: string }> = {
        active: {color: 'success', label: 'Active'},
        draft: {color: 'warning', label: 'Draft'},
        archived: {color: 'gray', label: 'Archived'}
    };

    const products = reactive(Array.from({length: 5}, (_, index) => ({
        id: index,
        name: faker.commerce.productName(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        category: faker.commerce.department(),
        stock: faker.number.int({min: 0, max: 200}),
        status: faker.helpers.arrayElement(['active', 'draft', 'archived'] as Status[]),
        isNew: faker.datatype.boolean(),
        selected: false
    })));

    const selectedCount = computed(() => products.filter(product => product.selected).length);
    const allSelected = computed(() => products.every(product => product.selected));

    function toggleAll(value: boolean | null): void {
        products.forEach(product => product.selected = value === true);
    }
</script>
