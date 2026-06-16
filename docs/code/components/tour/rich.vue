<template>
    <div style="display: flex; flex-flow: column; gap: 18px; align-items: flex-start">
        <div style="display: flex; gap: 9px">
            <span id="rich-dashboard">
                <FluxSecondaryButton
                    icon-leading="gauge-high"
                    label="Dashboard"/>
            </span>

            <span id="rich-team">
                <FluxSecondaryButton
                    icon-leading="users"
                    label="Team"/>
            </span>

            <span id="rich-upgrade">
                <FluxPrimaryButton
                    icon-leading="sparkles"
                    label="Upgrade"/>
            </span>
        </div>

        <FluxSecondaryButton
            label="Start tour"
            @click="start"/>

        <FluxTour
            v-model:active="active"
            v-model:step="step">
            <FluxTourItem
                target="#rich-dashboard"
                title="Welcome aboard">
                <div style="display: flex; flex-flow: column; gap: 12px">
                    <span>Let's finish setting up your workspace. Here's how far you've come.</span>

                    <FluxProgressBar
                        :value="40"
                        status="2 of 5 steps complete"/>
                </div>
            </FluxTourItem>

            <FluxTourItem
                target="#rich-team"
                title="Your team">
                <div style="display: flex; flex-flow: column; gap: 12px; align-items: flex-start">
                    <span>You're already collaborating with a few people.</span>

                    <FluxAvatarGroup
                        :max="4"
                        :size="32">
                        <FluxAvatar
                            fallback="colorized"
                            fallback-initials="AB"/>

                        <FluxAvatar
                            fallback="colorized"
                            fallback-initials="CD"/>

                        <FluxAvatar
                            fallback="colorized"
                            fallback-initials="EF"/>
                    </FluxAvatarGroup>
                </div>
            </FluxTourItem>

            <FluxTourItem
                target="#rich-upgrade"
                title="Unlock more">
                <div style="display: flex; flex-flow: column; gap: 12px; align-items: flex-start">
                    <div style="display: flex; gap: 12px; align-items: flex-start">
                        <FluxBoxedIcon
                            color="warning"
                            name="star"/>

                        <span>Upgrade to Pro for unlimited projects and priority support.</span>
                    </div>

                    <FluxPrimaryButton
                        icon-leading="sparkles"
                        label="See plans"
                        @click="active = false"/>
                </div>
            </FluxTourItem>
        </FluxTour>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxAvatarGroup, FluxBoxedIcon, FluxPrimaryButton, FluxProgressBar, FluxSecondaryButton, FluxTour, FluxTourItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const active = ref(false);
    const step = ref(0);

    function start(): void {
        step.value = 0;
        active.value = true;
    }
</script>
