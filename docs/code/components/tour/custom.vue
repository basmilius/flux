<template>
    <div style="display: flex; flex-flow: column; gap: 18px; align-items: flex-start">
        <div style="display: flex; gap: 9px">
            <span id="custom-create">
                <FluxPrimaryButton
                    icon-leading="plus"
                    label="New project"/>
            </span>

            <span id="custom-search">
                <FluxSecondaryButton
                    icon-leading="magnifying-glass"
                    label="Search"/>
            </span>

            <span id="custom-invite">
                <FluxSecondaryButton
                    icon-leading="user-plus"
                    label="Invite"/>
            </span>
        </div>

        <FluxSecondaryButton
            label="Start tour"
            @click="start"/>

        <FluxTour
            v-model:active="active"
            v-model:step="step">
            <FluxTourItem
                target="#custom-create"
                title="Create a project">
                <div style="display: flex; gap: 12px; align-items: flex-start">
                    <FluxBoxedIcon
                        color="primary"
                        name="rocket"/>

                    <div style="display: flex; flex-flow: column; gap: 9px; align-items: flex-start">
                        <span>Spin up a new project and start collaborating right away.</span>

                        <FluxChip
                            icon-leading="bolt"
                            label="Shortcut: C"/>
                    </div>
                </div>
            </FluxTourItem>

            <FluxTourItem
                target="#custom-search"
                title="Find anything">
                <div style="display: flex; flex-flow: column; gap: 9px; align-items: flex-start">
                    <span>Search across projects, files and people from a single place.</span>

                    <div style="display: flex; gap: 6px">
                        <FluxBadge
                            color="info"
                            icon="file"
                            label="Files"/>

                        <FluxBadge
                            color="success"
                            icon="users"
                            label="People"/>
                    </div>
                </div>
            </FluxTourItem>

            <FluxTourItem
                target="#custom-invite"
                title="Invite your team">
                <div style="display: flex; flex-flow: column; gap: 12px; align-items: flex-start">
                    <span>Bring your teammates on board to work together in real time.</span>

                    <FluxLink
                        href="#"
                        icon="circle-info"
                        label="Learn about roles"/>
                </div>
            </FluxTourItem>
        </FluxTour>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBoxedIcon, FluxChip, FluxLink, FluxPrimaryButton, FluxSecondaryButton, FluxTour, FluxTourItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const active = ref(false);
    const step = ref(0);

    function start(): void {
        step.value = 0;
        active.value = true;
    }
</script>
