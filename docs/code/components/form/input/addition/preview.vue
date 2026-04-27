<template>
    <Preview>
        <FluxStack style="width: min(100%, 320px)">
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
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxStack } from '@flux-ui/components';
</script>
