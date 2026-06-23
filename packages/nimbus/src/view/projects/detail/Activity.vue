<template>
    <FluxApplicationContent layout="medium">
        <FluxLayerPane>
            <FluxPaneHeader
                icon="comments"
                title="Discussion"/>

            <FluxPane>
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="15">
                        <FluxComment
                            v-for="entry of entries"
                            :key="entry.id"
                            :avatar-fallback-initials="memberInitials(entry.authorId)"
                            :is-received="entry.authorId !== currentUserId"
                            :posted-by="memberName(entry.authorId)"
                            :posted-on="entry.postedAt">
                            {{ entry.message }}
                        </FluxComment>
                    </FluxFlex>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxFlex
                        class="composer"
                        direction="vertical"
                        :gap="9">
                        <FluxToolbar>
                            <FluxToolbarGroup>
                                <FluxAction
                                    icon="bold"
                                    @click="onFormat()"/>
                                <FluxAction
                                    icon="italic"
                                    @click="onFormat()"/>
                                <FluxAction
                                    icon="link"
                                    @click="onFormat()"/>
                            </FluxToolbarGroup>
                            <FluxToolbarGroup>
                                <FluxAction
                                    icon="paperclip"
                                    @click="onFormat()"/>
                            </FluxToolbarGroup>
                        </FluxToolbar>

                        <FluxFlex
                            align="center"
                            :gap="9">
                            <FluxFormInput
                                v-model="draft"
                                placeholder="Write a comment..."
                                style="flex: 1"
                                @keydown.enter="submit()"/>
                            <FluxPrimaryButton
                                :disabled="draft.trim().length === 0"
                                icon-leading="paper-plane"
                                label="Send"
                                @click="submit()"/>
                        </FluxFlex>
                    </FluxFlex>
                </FluxPaneFooter>
            </FluxPane>
        </FluxLayerPane>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxAction, FluxComment, FluxFlex, FluxFormInput, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxToolbar, FluxToolbarGroup, showSnackbar } from '@flux-ui/components';
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useActivityStore, useTeamStore } from '@/store';
    import type { Id } from '@/types';

    const route = useRoute();
    const {activityForProject, addComment} = useActivityStore();
    const {members, getMember} = useTeamStore();

    const projectId = computed(() => String(route.params.id));
    const currentUserId = computed(() => members.value[0]?.id ?? '');
    const entries = computed(() => [...activityForProject(projectId.value)].reverse());

    const draft = ref('');

    function memberName(id: Id): string {
        return getMember(id)?.name ?? 'Someone';
    }

    function memberInitials(id: Id): string {
        return getMember(id)?.initials ?? '?';
    }

    function submit(): void {
        const message = draft.value.trim();

        if (message.length === 0) {
            return;
        }

        addComment(projectId.value, currentUserId.value, message);
        draft.value = '';
    }

    function onFormat(): void {
        showSnackbar({icon: 'circle-info', message: 'Rich text formatting is not available in this demo.'});
    }
</script>

<style scoped>
    .composer {
        width: 100%;
    }
</style>
