<template>
    <Preview>
        <FluxKanban
            style="max-width: 100%"
            @move="onMove">
            <FluxKanbanColumn
                v-for="column in columns"
                :key="column.id"
                :column-id="column.id"
                :label="column.label">
                <FluxContextMenu
                    v-for="card in getCards(column.id)"
                    :key="card.id">
                    <FluxKanbanItem
                        :item-id="card.id"
                        :column-id="column.id">
                        <div class="card">
                            <FluxFlex
                                align="center"
                                :gap="6">
                                <FluxBadge
                                    :color="priorityColor(card.priority)"
                                    :label="card.priority"
                                    type="none"/>

                                <FluxSpacer/>

                                <FluxChip
                                    icon-leading="code-branch"
                                    :label="card.branch"/>
                            </FluxFlex>

                            <strong class="card-title">{{ card.title }}</strong>

                            <FluxTagStack>
                                <FluxTag
                                    v-for="label in card.labels"
                                    :key="label.text"
                                    dot
                                    :color="label.color"
                                    :label="label.text"
                                    type="none"/>
                            </FluxTagStack>

                            <FluxFlex
                                align="center"
                                :gap="9">
                                <FluxBadgeStack>
                                    <FluxBadge
                                        icon="message"
                                        :label="`${card.comments}`"
                                        type="none"/>

                                    <FluxBadge
                                        icon="paste"
                                        :label="`${card.checklist}`"
                                        type="none"/>
                                </FluxBadgeStack>

                                <FluxSpacer/>

                                <FluxAvatarGroup :max="3">
                                    <FluxAvatar
                                        v-for="member in card.members"
                                        :key="member"
                                        :alt="member"
                                        :fallback-initials="initials(member)"
                                        type="none"/>
                                </FluxAvatarGroup>
                            </FluxFlex>
                        </div>
                    </FluxKanbanItem>

                    <template #menu="{close}">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="eye"
                                    label="Open card"
                                    type="button"
                                    @click="close"/>

                                <FluxMenuItem
                                    icon-leading="user-plus"
                                    label="Assign"
                                    type="button"
                                    @click="close"/>

                                <FluxMenuItem
                                    icon-leading="clone"
                                    label="Duplicate"
                                    type="button"
                                    @click="close"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="trash"
                                    label="Delete"
                                    type="button"
                                    @click="close"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>
                </FluxContextMenu>
            </FluxKanbanColumn>
        </FluxKanban>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxKanbanMoveEvent } from '@flux-ui/types';
    import { FluxAvatar, FluxAvatarGroup, FluxBadge, FluxBadgeStack, FluxChip, FluxContextMenu, FluxFlex, FluxKanban, FluxKanbanColumn, FluxKanbanItem, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSeparator, FluxSpacer, FluxTag, FluxTagStack } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { ref } from 'vue';

    const columns = [
        {id: 'backlog', label: 'Backlog'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'review', label: 'Review'}
    ];

    const priorities = ['high', 'medium', 'low'];

    const labelPool: { text: string; color: FluxColor }[] = [
        {text: 'Bug', color: 'danger'},
        {text: 'Feature', color: 'primary'},
        {text: 'Docs', color: 'info'},
        {text: 'Chore', color: 'gray'},
        {text: 'Ready', color: 'success'}
    ];

    faker.seed(42);

    const cards = ref(columns.flatMap(column => Array.from({length: 3}, (_, index) => ({
        id: `${column.id}-${index}`,
        columnId: column.id,
        title: faker.git.commitMessage(),
        branch: faker.git.branch(),
        priority: faker.helpers.arrayElement(priorities),
        labels: faker.helpers.arrayElements(labelPool, {min: 1, max: 2}),
        comments: faker.number.int({min: 0, max: 12}),
        checklist: faker.number.int({min: 0, max: 8}),
        members: Array.from({length: faker.number.int({min: 1, max: 4})}, () => faker.person.fullName())
    }))));

    function getCards(columnId: string) {
        return cards.value.filter(card => card.columnId === columnId);
    }

    function priorityColor(priority: string): FluxColor {
        if (priority === 'high') {
            return 'danger';
        }

        if (priority === 'medium') {
            return 'warning';
        }

        return 'gray';
    }

    function initials(name: string): string {
        return name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase();
    }

    function onMove({itemId, toColumnId, beforeItemId}: FluxKanbanMoveEvent): void {
        const movedCard = cards.value.find(card => card.id === itemId);

        if (!movedCard) {
            return;
        }

        const updated = cards.value.filter(card => card.id !== itemId);
        movedCard.columnId = String(toColumnId);

        if (beforeItemId === undefined) {
            updated.push(movedCard);
        } else {
            const beforeIndex = updated.findIndex(card => card.id === beforeItemId);
            updated.splice(beforeIndex === -1 ? updated.length : beforeIndex, 0, movedCard);
        }

        cards.value = updated;
    }
</script>

<style scoped>
    .card {
        display: flex;
        flex-flow: column;
        gap: 9px;
        padding: 12px;
        background: var(--gray-25);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius);
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }

    .card-title {
        font-size: .875rem;
        font-weight: 500;
        color: var(--foreground);
        line-height: 1.4;
    }
</style>
