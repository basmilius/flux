<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxFormField label="Emphasise the action">
            <FluxToggle v-model="showPrimary"/>
        </FluxFormField>

        <FluxDynamicView :vnode="action"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxDynamicView, FluxFlex, FluxFormField, FluxPrimaryButton, FluxSecondaryButton, FluxToggle } from '@flux-ui/components';
    import { computed, h, ref } from 'vue';

    const showPrimary = ref(true);

    const action = computed(() => showPrimary.value
        ? h(FluxPrimaryButton, {label: 'Save changes'})
        : h(FluxSecondaryButton, {label: 'Save changes'}));
</script>
