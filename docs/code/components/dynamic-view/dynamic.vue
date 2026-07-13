<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxToggle v-model="showPrimary">
            Emphasise the action
        </FluxToggle>

        <FluxDynamicView :vnode="action"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxDynamicView, FluxFlex, FluxPrimaryButton, FluxSecondaryButton, FluxToggle } from '@flux-ui/components';
    import { computed, h, ref } from 'vue';

    const showPrimary = ref(true);

    const action = computed(() => showPrimary.value
        ? h(FluxPrimaryButton, {label: 'Save changes'})
        : h(FluxSecondaryButton, {label: 'Save changes'}));
</script>
