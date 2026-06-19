<template>
    <FluxButtonStack>
        <FluxSecondaryButton
            icon-leading="circle-question"
            label="Take a tour"
            @click="startTour()"/>

        <FluxSplitButton :flyout-width="220">
            <template #button>
                <FluxSecondaryButton
                    icon-leading="circle-plus"
                    label="New project"
                    type="route"
                    :to="{name: 'project-new'}"/>
            </template>

            <template #flyout="{close}">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="file-invoice-dollar"
                            label="New invoice"
                            type="route"
                            :to="{name: 'invoice-new'}"
                            @click="close()"/>
                        <FluxMenuItem
                            icon-leading="sack-dollar"
                            label="New deal"
                            type="route"
                            :to="{name: 'deals'}"
                            @click="close()"/>
                        <FluxMenuItem
                            icon-leading="stopwatch"
                            label="Log time"
                            type="route"
                            :to="{name: 'timesheet-log'}"
                            @click="close()"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxSplitButton>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSplitButton } from '@flux-ui/components';
    import { useUiStore } from '@/store';

    const {startTour} = useUiStore();
</script>
