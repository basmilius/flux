<template>
    <FluxApplicationContent layout="medium">
        <FluxContainer :gutter="0">
            <FluxLayerPane>
                <FluxPaneHeader
                    icon="comments"
                    title="Activity log">
                    <template #after>
                        <FluxPagination
                            arrows
                            is-compact
                            :page="page"
                            :per-page="perPage"
                            :total="total"
                            @navigate="page = $event"/>
                    </template>
                </FluxPaneHeader>

                <FluxPane>
                    <FluxItemStack>
                        <FluxItem
                            v-for="entry of pageItems"
                            :key="entry.id">
                            <FluxItemMedia
                                is-center
                                :size="36">
                                <MemberAvatar
                                    :member="getMember(entry.authorId)"
                                    :size="36"/>
                            </FluxItemMedia>
                            <FluxItemContent is-center>
                                <strong>{{ memberName(entry.authorId) }}</strong>
                                <span>{{ entry.message }} · {{ projectName(entry.projectId) }}</span>
                            </FluxItemContent>
                            <FluxItemActions is-center>
                                <span class="time">{{ entry.postedAt.toRelative() }}</span>
                            </FluxItemActions>
                        </FluxItem>
                    </FluxItemStack>
                </FluxPane>

                <FluxPaneFooter>
                    <FluxPaginationBar
                        :limits="[10, 25, 50]"
                        :page="page"
                        :per-page="perPage"
                        :total="total"
                        @limit="onLimit"
                        @navigate="page = $event"/>
                </FluxPaneFooter>
            </FluxLayerPane>
        </FluxContainer>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxContainer, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxPagination, FluxPaginationBar, FluxPane, FluxPaneFooter, FluxPaneHeader } from '@flux-ui/components';
    import { computed, ref } from 'vue';
    import MemberAvatar from '@/component/MemberAvatar.vue';
    import { defineTitle } from '@/composable';
    import { useActivityStore, useProjectsStore, useTeamStore } from '@/store';
    import type { Id } from '@/types';

    defineTitle('comments', 'Activity');

    const {activity} = useActivityStore();
    const {getMember} = useTeamStore();
    const {getProject} = useProjectsStore();

    const page = ref(1);
    const perPage = ref(10);

    const sorted = computed(() => [...activity.value].sort((a, b) => b.postedAt.toMillis() - a.postedAt.toMillis()));
    const total = computed(() => sorted.value.length);
    const pageItems = computed(() => sorted.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));

    function memberName(id: Id): string {
        return getMember(id)?.name ?? 'Someone';
    }

    function projectName(id: Id): string {
        return getProject(id)?.name ?? 'a project';
    }

    function onLimit(value: number): void {
        perPage.value = value;
        page.value = 1;
    }
</script>

<style scoped>
    .time {
        font-size: 12px;
        color: var(--gray-500);
        white-space: nowrap;
    }
</style>
