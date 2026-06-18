<template>
    <FluxFlex
        align="center"
        :gap="12"
        wrap="wrap">
        <FluxPrimaryButton
            icon-leading="rocket"
            label="Launch window"
            @click="isWindowOpen = true"/>

        <FluxSecondaryButton
            icon-leading="copy"
            label="Open overlay"
            @click="isOverlayOpen = true"/>

        <FluxSecondaryButton
            icon-leading="bell"
            label="Toggle snackbar"
            @click="isSnackbarVisible = !isSnackbarVisible"/>
    </FluxFlex>

    <FluxSnackbar
        v-if="isSnackbarVisible"
        :actions="{open: 'Open', dismiss: 'Dismiss'}"
        color="primary"
        icon="circle-check"
        message="The deployment finished without errors."
        title="Deployment ready"
        @action="onSnackbarAction"/>

    <FluxOverlay size="medium">
        <FluxPane v-if="isWindowOpen">
            <FluxPaneHeader
                icon="bolt"
                title="Command center"/>

            <FluxWindow>
                <template #default="{navigate}">
                    <FluxPaneBody>
                        <FluxFlex
                            align="center"
                            :gap="12"
                            style="margin-bottom: 12px; color: var(--foreground-secondary)">
                            <FluxIcon name="bolt"/>
                            <span>Pick an action to continue.</span>
                        </FluxFlex>

                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    v-for="action in actions"
                                    :key="action.id"
                                    :icon-leading="action.icon"
                                    command-icon="angle-right"
                                    :label="action.label"
                                    @click="select(action.id), navigate('detail')"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxPaneBody>
                </template>

                <template #detail="{ back }">
                    <FluxPaneBody>
                        <FluxFlex
                            direction="vertical"
                            :gap="12">
                            <FluxFlex
                                align="center"
                                :gap="12">
                                <FluxBadge
                                    color="primary"
                                    :icon="activeAction?.icon"
                                    :label="activeAction?.label ?? 'Action'"/>

                                <FluxSpacer/>

                                <FluxSecondaryButton
                                    icon-leading="angle-left"
                                    label="Back"
                                    @click="back()"/>
                            </FluxFlex>

                            <FluxDynamicView :vnode="detailView"/>
                        </FluxFlex>
                    </FluxPaneBody>
                </template>
            </FluxWindow>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Close"
                    @click="isWindowOpen = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>

    <FluxOverlay size="small">
        <FluxPane v-if="isOverlayOpen">
            <FluxPaneHeader
                icon="circle-info"
                title="Confirm deployment"/>

            <FluxPaneBody>
                <p>You are about to deploy <strong>main</strong> to production. This rolls out the latest build to all regions and cannot be undone automatically.</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"
                    @click="isOverlayOpen = false"/>

                <FluxPrimaryButton
                    icon-leading="rocket"
                    label="Deploy"
                    @click="onDeploy"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { FluxBadge, FluxDynamicView, FluxFlex, FluxIcon, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSnackbar, FluxSpacer, FluxWindow, showSnackbar } from '@flux-ui/components';
    import { computed, h, ref } from 'vue';

    const isWindowOpen = ref(false);
    const isOverlayOpen = ref(false);
    const isSnackbarVisible = ref(false);
    const activeActionId = ref<string>('deploy');

    const actions: { id: string; label: string; icon: FluxIconName; description: string; }[] = [
        {id: 'deploy', label: 'Deploy build', icon: 'rocket', description: 'Roll out the latest build to production.'},
        {id: 'invite', label: 'Invite teammate', icon: 'user-plus', description: 'Send an invitation to a new member.'},
        {id: 'export', label: 'Export data', icon: 'arrow-up-from-square', description: 'Generate a downloadable archive of your data.'}
    ];

    const activeAction = computed(() => actions.find(action => action.id === activeActionId.value));

    const detailView = computed(() => h('p', {style: 'margin: 0; color: var(--foreground-secondary)'}, activeAction.value?.description ?? ''));

    function select(id: string): void {
        activeActionId.value = id;
    }

    function onDeploy(): void {
        isOverlayOpen.value = false;

        showSnackbar({
            icon: 'circle-check',
            message: 'Deployment started.'
        });
    }

    function onSnackbarAction(actionKey: string): void {
        isSnackbarVisible.value = false;

        showSnackbar({
            icon: 'circle-info',
            message: `You chose to ${actionKey}.`
        });
    }
</script>
