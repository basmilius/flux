<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="15"
            style="width: min(100%, 321px)">
            <FluxFormField label="Price">
                <FluxFormInputGroup>
                    <FluxFormInputAddition label="€"/>
                    <FluxFormInput
                        type="number"
                        placeholder="0.00"/>
                </FluxFormInputGroup>
            </FluxFormField>

            <FluxFormField label="Domain">
                <FluxFormInputGroup>
                    <FluxFormInput placeholder="example"/>
                    <FluxFormInputAddition label=".com"/>
                </FluxFormInputGroup>
            </FluxFormField>
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup } from '@flux-ui/components';
</script>
