<template>
    <Preview>
        <FluxFlex
            align="start"
            direction="vertical"
            :gap="18">
            <FluxFlex :gap="9">
                <span id="onb-create">
                    <FluxPrimaryButton
                        icon-leading="plus"
                        label="New project"/>
                </span>

                <span id="onb-search">
                    <FluxSecondaryButton
                        icon-leading="magnifying-glass"
                        label="Search"/>
                </span>

                <span id="onb-invite">
                    <FluxSecondaryButton
                        icon-leading="user-plus"
                        label="Invite"/>
                </span>
            </FluxFlex>

            <FluxSecondaryButton
                label="Start tour"
                @click="start"/>

            <FluxTour
                v-model:active="active"
                v-model:step="step">
                <FluxTourItem
                    target="#onb-create"
                    title="Create a project">
                    <FluxFlex
                        align="start"
                        :gap="12">
                        <FluxBoxedIcon
                            color="primary"
                            name="rocket"/>

                        <FluxFlex
                            align="start"
                            direction="vertical"
                            :gap="9">
                            <span>Spin up a new project and start collaborating right away.</span>

                            <FluxChip
                                icon-leading="bolt"
                                label="Shortcut: C"/>
                        </FluxFlex>
                    </FluxFlex>
                </FluxTourItem>

                <FluxTourItem
                    target="#onb-search"
                    title="Find anything">
                    <FluxFlex
                        align="start"
                        direction="vertical"
                        :gap="9">
                        <span>Search across projects, files and people from one place.</span>

                        <FluxFlex :gap="6">
                            <FluxBadge
                                color="info"
                                icon="file"
                                label="Files"/>

                            <FluxBadge
                                color="success"
                                icon="users"
                                label="People"/>
                        </FluxFlex>
                    </FluxFlex>
                </FluxTourItem>

                <FluxTourItem
                    target="#onb-invite"
                    title="Invite your team">
                    Bring teammates on board to collaborate in real time.
                </FluxTourItem>
            </FluxTour>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBoxedIcon, FluxChip, FluxFlex, FluxPrimaryButton, FluxSecondaryButton, FluxTour, FluxTourItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const active = ref(false);
    const step = ref(0);

    function start(): void {
        step.value = 0;
        active.value = true;
    }
</script>
