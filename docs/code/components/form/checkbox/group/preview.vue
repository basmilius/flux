<template>
    <Preview>
        <FluxFormCheckboxGroup
            v-model="channels"
            aria-label="Notification channels">
            <FluxFormCheckbox
                value="email"
                label="Email"/>

            <FluxFormCheckbox
                value="sms"
                label="SMS"/>

            <FluxFormCheckbox
                value="push"
                label="Push"/>
        </FluxFormCheckboxGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCheckbox, FluxFormCheckboxGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const channels = ref(['email', 'push']);
</script>
