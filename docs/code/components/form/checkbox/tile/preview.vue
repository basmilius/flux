<template>
    <Preview>
        <FluxFormCheckboxGroup
            v-model="addons"
            style="width: 420px">
            <FluxFormCheckboxTile
                value="seats"
                icon="user-plus"
                label="Extra seats"
                sub-label="Invite more teammates to your workspace."/>

            <FluxFormCheckboxTile
                value="support"
                icon="bolt"
                label="Priority support"
                sub-label="Get faster responses from our team."/>

            <FluxFormCheckboxTile
                value="analytics"
                icon="gauge-high"
                label="Advanced analytics"
                sub-label="Unlock detailed usage reports."/>
        </FluxFormCheckboxGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCheckboxGroup, FluxFormCheckboxTile } from '@flux-ui/components';
    import { ref } from 'vue';

    const addons = ref(['support']);
</script>
